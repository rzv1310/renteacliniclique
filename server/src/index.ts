import crypto from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { createServer } from "node:http";
import { inspect } from "node:util";
import { GoogleGenAI } from "@google/genai";
import geoip from "geoip-lite";
import { buildAnimationPromptText } from "./animation-prompt.js";

import {
  ALLOWED_IMAGE_MIME_TYPES,
  DISALLOWED_PROMPT_PATTERNS,
  MAX_CUSTOM_PROMPT_LENGTH,
  MAX_IMAGE_SIZE,
  MAX_IMPLANT_SIZE,
  MIN_IMPLANT_SIZE,
  SIMULATOR_ANIMATION_GLOBAL_RATE_LIMITS,
  SIMULATOR_ANIMATION_USER_RATE_LIMITS,
  SIMULATOR_RATE_LIMITS,
  VALID_IMPLANT_TYPES,
} from "./constants.js";
import { getServerConfig, loadEnvironment } from "./env.js";
import { buildPrompt } from "./prompt.js";
import {
  extractImageData,
  getErrorMessageFromUnknown,
  getStatusFromError,
  parseAnimateBody,
  parseGenerateBody,
  selectGeneratedImage,
} from "./request-helpers.js";
import { createRateLimiter } from "./rate-limiter.js";
import type { AnimateRequestBody, AnimationJobStatus, GeminiResponse, GenerateRequestBody, ImplantType } from "./types.js";

loadEnvironment();
const config = getServerConfig();
const genAI = config.apiKey ? new GoogleGenAI({ apiKey: config.apiKey }) : null;
const simulatorRateLimiter = createRateLimiter(SIMULATOR_RATE_LIMITS);
const simulatorAnimationUserRateLimiter = createRateLimiter(SIMULATOR_ANIMATION_USER_RATE_LIMITS);
const simulatorAnimationGlobalRateLimiter = createRateLimiter(SIMULATOR_ANIMATION_GLOBAL_RATE_LIMITS);

const formatLogPayload = (payload: unknown): string => {
  if (payload instanceof Error) {
    return payload.stack || `${payload.name}: ${payload.message}`;
  }

  return inspect(payload, {
    depth: null,
    colors: false,
    compact: false,
    breakLength: 120,
    maxArrayLength: null,
  });
};

const logInfo = (message: string, payload?: unknown) => {
  if (payload === undefined) {
    console.info(message);
    return;
  }
  console.info(`${message} ${formatLogPayload(payload)}`);
};

const logWarn = (message: string, payload?: unknown) => {
  if (payload === undefined) {
    console.warn(message);
    return;
  }
  console.warn(`${message} ${formatLogPayload(payload)}`);
};

const logError = (message: string, payload?: unknown) => {
  if (payload === undefined) {
    console.error(message);
    return;
  }
  console.error(`${message} ${formatLogPayload(payload)}`);
};

const resolveCorsOrigin = (requestOrigin: string | null): string => {
  if (config.corsOrigins.length === 0 || config.corsOrigins.includes("*")) {
    return "*";
  }

  if (requestOrigin && config.corsOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  return config.corsOrigins[0];
};

const applyCorsHeaders = (req: IncomingMessage, res: ServerResponse) => {
  const requestOrigin = typeof req.headers.origin === "string" ? req.headers.origin : null;
  const allowedOrigin = resolveCorsOrigin(requestOrigin);
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (allowedOrigin !== "*") {
    res.setHeader("Vary", "Origin");
  }
};

const jsonResponse = (req: IncomingMessage, res: ServerResponse, statusCode: number, payload: unknown) => {
  res.statusCode = statusCode;
  applyCorsHeaders(req, res);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

const getClientIp = (req: IncomingMessage): string => {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return req.socket.remoteAddress || "unknown";
};

const isLoopbackIp = (ip: string): boolean =>
  ip === "::1" ||
  ip === "127.0.0.1" ||
  ip === "::ffff:127.0.0.1" ||
  ip.startsWith("::ffff:127.");

const normalizeCountryCode = (value: string): string | null => {
  const normalized = value.trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(normalized)) {
    return normalized;
  }
  return null;
};

const normalizeIpForGeoLookup = (rawIp: string): string | null => {
  const trimmed = rawIp.trim();
  if (!trimmed || trimmed === "unknown") return null;

  if (trimmed.startsWith("::ffff:")) {
    return trimmed.slice("::ffff:".length);
  }

  return trimmed;
};

const getCountryCodeFromHeaders = (req: IncomingMessage): string | null => {
  for (const headerName of config.countryHeaderNames) {
    const rawHeader = req.headers[headerName];
    const headerValue = Array.isArray(rawHeader) ? rawHeader[0] : rawHeader;
    if (!headerValue) continue;
    const firstValue = headerValue.split(",")[0];
    if (!firstValue) continue;
    const normalized = normalizeCountryCode(firstValue);
    if (normalized) return normalized;
  }

  return null;
};

const getCountryCodeFromIp = (ip: string): string | null => {
  const ipForLookup = normalizeIpForGeoLookup(ip);
  if (!ipForLookup) return null;

  const result = geoip.lookup(ipForLookup);
  if (!result?.country) return null;

  return normalizeCountryCode(result.country);
};

const resolveCountryCode = (
  req: IncomingMessage,
  ip: string
): { countryCode: string | null; source: "header" | "geoip" | "unknown" } => {
  const fromHeader = getCountryCodeFromHeaders(req);
  if (fromHeader) {
    return { countryCode: fromHeader, source: "header" };
  }

  const fromGeoip = getCountryCodeFromIp(ip);
  if (fromGeoip) {
    return { countryCode: fromGeoip, source: "geoip" };
  }

  return { countryCode: null, source: "unknown" };
};

const hasDisallowedPromptTerms = (prompt: string): boolean =>
  DISALLOWED_PROMPT_PATTERNS.some((pattern) => pattern.test(prompt));

const readJsonBody = async (req: IncomingMessage, maxBytes = 10_000_000): Promise<Record<string, unknown>> => {
  const chunks: Buffer[] = [];
  let totalBytes = 0;

  for await (const chunk of req) {
    const asBuffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += asBuffer.length;
    if (totalBytes > maxBytes) {
      throw new Error("BODY_TOO_LARGE");
    }
    chunks.push(asBuffer);
  }

  if (totalBytes === 0) return {};

  const raw = Buffer.concat(chunks).toString("utf8");
  return JSON.parse(raw) as Record<string, unknown>;
};

interface AnimationJobRecord {
  id: string;
  ip: string;
  status: AnimationJobStatus;
  createdAt: number;
  updatedAt: number;
  operation: unknown | null;
  error: string | null;
  videoUri: string | null;
  videoMimeType: string | null;
  videoBytesBase64: string | null;
}

const animationJobs = new Map<string, AnimationJobRecord>();
const GLOBAL_ANIMATION_KEY = "__global__";
const ANIMATION_JOB_TTL_MS = 2 * 60 * 60 * 1000;

const pruneAnimationJobs = (now = Date.now()) => {
  for (const [jobId, job] of animationJobs.entries()) {
    if (now - job.updatedAt > ANIMATION_JOB_TTL_MS) {
      animationJobs.delete(jobId);
    }
  }
};

const handleCheckRateLimits = (req: IncomingMessage, res: ServerResponse, ip: string, logPrefix: string) => {
  const snapshot = simulatorRateLimiter.getRateSnapshot(ip);
  logInfo(`${logPrefix} check-rate-limits`, { ip, snapshot });
  jsonResponse(req, res, 200, snapshot);
};

const getAnimationRateSnapshot = (ip: string) => {
  const user = simulatorAnimationUserRateLimiter.getRateSnapshot(ip);
  const global = simulatorAnimationGlobalRateLimiter.getRateSnapshot(GLOBAL_ANIMATION_KEY);
  return {
    user,
    global,
    canAnimate: user.canGenerate && global.canGenerate,
  };
};

const getAnimationLimitMessage = (snapshot: ReturnType<typeof getAnimationRateSnapshot>): string => {
  if (!snapshot.user.canGenerate) {
    return "Ai atins limita de 1 animație pe oră pe acest dispozitiv.";
  }

  if (!snapshot.global.canGenerate) {
    if (snapshot.global.limitType === "hour") {
      return "Limita globală de 3 animații pe oră a fost atinsă. Încearcă din nou mai târziu.";
    }
    if (snapshot.global.limitType === "day") {
      return "Limita globală de 10 animații pe zi a fost atinsă. Revino mâine.";
    }
    return "Generarea animației este temporar indisponibilă.";
  }

  return "Generarea animației este temporar indisponibilă.";
};

const handleCheckAnimationRateLimits = (req: IncomingMessage, res: ServerResponse, ip: string, logPrefix: string) => {
  const snapshot = getAnimationRateSnapshot(ip);
  logInfo(`${logPrefix} check-animation-rate-limits`, { ip, snapshot });
  jsonResponse(req, res, 200, snapshot);
};

const refreshAnimationJobStatus = async (job: AnimationJobRecord, logPrefix: string) => {
  if (!genAI || !job.operation) {
    return;
  }

  const operation = await genAI.operations.getVideosOperation({
    operation: job.operation as never,
  });
  job.operation = operation;
  job.updatedAt = Date.now();
  const opAny = operation as unknown as Record<string, unknown>;

  const done = opAny.done === true;
  if (!done) {
    job.status = "processing";
    return;
  }

  const error = opAny.error as Record<string, unknown> | undefined;
  if (error) {
    job.status = "failed";
    job.error = JSON.stringify(error);
    return;
  }

  const response = opAny.response as Record<string, unknown> | undefined;
  const generatedVideos = response?.generatedVideos as Array<Record<string, unknown>> | undefined;
  const firstVideoPayload = generatedVideos?.[0];
  const video = firstVideoPayload?.video as Record<string, unknown> | undefined;
  const videoUri = typeof video?.uri === "string" ? video.uri : null;
  const videoMimeType = typeof video?.mimeType === "string" ? video.mimeType : "video/mp4";
  const videoBytes = typeof video?.videoBytes === "string" ? video.videoBytes : null;

  if (!videoUri && !videoBytes) {
    const filteredReasons = Array.isArray(response?.raiMediaFilteredReasons)
      ? (response?.raiMediaFilteredReasons as unknown[])
          .filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
      : [];
    const filteredReasonText =
      filteredReasons.length > 0
        ? filteredReasons.join(" | ")
        : "Video generation was blocked by safety filtering.";

    job.status = "failed";
    job.error = filteredReasonText;
    logWarn(`${logPrefix} animation:no-video`, { jobId: job.id, response });
    return;
  }

  job.videoUri = videoUri;
  job.videoMimeType = videoMimeType;
  job.videoBytesBase64 = videoBytes;
  job.status = "completed";
  job.error = null;
};

const handleStartAnimation = async (req: IncomingMessage, res: ServerResponse, ip: string, logPrefix: string) => {
  const body = (await readJsonBody(req)) as AnimateRequestBody;
  const { imageBase64, implantType, implantSize, customPrompt } = parseAnimateBody(body, {
    maxCustomPromptLength: MAX_CUSTOM_PROMPT_LENGTH,
  });
  const rateSnapshot = getAnimationRateSnapshot(ip);
  const { normalizedMimeType, base64Data } = extractImageData(imageBase64);

  logInfo(`${logPrefix} animation:request:received`, {
    ip,
    implantType,
    implantSize,
    customPromptLength: customPrompt.length,
    imageBase64Length: imageBase64?.length ?? 0,
    mimeType: normalizedMimeType,
    rateSnapshot,
  });

  if (!rateSnapshot.canAnimate) {
    jsonResponse(req, res, 429, {
      error: getAnimationLimitMessage(rateSnapshot),
      limits: rateSnapshot,
    });
    return;
  }

  if (!imageBase64) {
    jsonResponse(req, res, 400, { error: "Date imagine invalide pentru animație." });
    return;
  }

  if (!implantType || !VALID_IMPLANT_TYPES.has(implantType as ImplantType)) {
    jsonResponse(req, res, 400, { error: "Tip de implant invalid pentru animație." });
    return;
  }

  if (implantSize === null || implantSize < MIN_IMPLANT_SIZE || implantSize > MAX_IMPLANT_SIZE) {
    jsonResponse(req, res, 400, {
      error: `Mărime implant invalidă. Trebuie să fie între ${MIN_IMPLANT_SIZE} și ${MAX_IMPLANT_SIZE}cc.`,
    });
    return;
  }

  if (!ALLOWED_IMAGE_MIME_TYPES.has(normalizedMimeType)) {
    jsonResponse(req, res, 400, { error: "Format imagine neacceptat. Folosiți JPG, PNG sau WEBP." });
    return;
  }

  if (!genAI) {
    jsonResponse(req, res, 503, { error: "Serviciu animație indisponibil (configurare)." });
    return;
  }

  simulatorAnimationUserRateLimiter.recordRequest(ip);
  simulatorAnimationGlobalRateLimiter.recordRequest(GLOBAL_ANIMATION_KEY);

  const prompt = buildAnimationPromptText({
    implantType: implantType as ImplantType,
    implantSize,
    customPrompt,
  });
  const strictMedicalAnimationConfig = {
    durationSeconds: 4,
    aspectRatio: "16:9",
    resolution: "720p",
    personGeneration: "allow_adult" as const,
    numberOfVideos: 1,
    negativePrompt:
      "sexualized framing, explicit content, fetish styling, glamour aesthetics, provocative pose, dramatic scene change, cartoon look, low quality, distortion",
  };

  let operation: unknown;
  try {
    operation = await genAI.models.generateVideos({
      model: config.veoModel,
      prompt,
      image: {
        imageBytes: base64Data,
        mimeType: normalizedMimeType,
      },
      config: strictMedicalAnimationConfig,
    });
  } catch (errorFirst) {
    const statusFirst = getStatusFromError(errorFirst);
    const messageFirst = getErrorMessageFromUnknown(errorFirst);
    logWarn(`${logPrefix} animation:start:first-config-failed`, {
      status: statusFirst,
      message: messageFirst,
    });

    try {
      // Fallback with minimal config for compatibility differences.
      operation = await genAI.models.generateVideos({
        model: config.veoModel,
        prompt,
        image: {
          imageBytes: base64Data,
          mimeType: normalizedMimeType,
        },
        config: {
          // Keep strict medical defaults even in fallback.
          durationSeconds: strictMedicalAnimationConfig.durationSeconds,
          aspectRatio: strictMedicalAnimationConfig.aspectRatio,
          resolution: strictMedicalAnimationConfig.resolution,
          personGeneration: strictMedicalAnimationConfig.personGeneration,
          negativePrompt: strictMedicalAnimationConfig.negativePrompt,
        },
      });
      logInfo(`${logPrefix} animation:start:fallback-config-ok`);
    } catch (errorSecond) {
      const status = getStatusFromError(errorSecond) ?? statusFirst;
      const message = getErrorMessageFromUnknown(errorSecond);
      logError(`${logPrefix} animation:start:error`, { status, message, error: errorSecond });

      if (status === 429) {
        jsonResponse(req, res, 429, {
          error: "Serviciul video este ocupat. Încearcă din nou în câteva minute.",
        });
        return;
      }

      if (status && status >= 400 && status < 500) {
        jsonResponse(req, res, status, {
          error: `Veo request invalid: ${message}`,
        });
        return;
      }

      jsonResponse(req, res, 500, {
        error: "Nu s-a putut porni animația video. Încearcă din nou.",
      });
      return;
    }
  }

  const jobId = crypto.randomUUID();
  const job: AnimationJobRecord = {
    id: jobId,
    ip,
    status: "processing",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    operation,
    error: null,
    videoUri: null,
    videoMimeType: null,
    videoBytesBase64: null,
  };
  animationJobs.set(jobId, job);

  await refreshAnimationJobStatus(job, logPrefix);

  jsonResponse(req, res, 202, {
    jobId,
    status: job.status,
  });
};

const handleAnimationStatus = async (
  req: IncomingMessage,
  res: ServerResponse,
  ip: string,
  logPrefix: string,
  jobId: string
) => {
  const job = animationJobs.get(jobId);
  if (!job) {
    jsonResponse(req, res, 404, { error: "Animation job not found." });
    return;
  }

  if (job.ip !== ip) {
    jsonResponse(req, res, 403, { error: "Nu aveți acces la acest job." });
    return;
  }

  if (job.status === "processing" || job.status === "queued") {
    try {
      await refreshAnimationJobStatus(job, logPrefix);
    } catch (error) {
      job.status = "failed";
      job.error = error instanceof Error ? error.message : "Unexpected animation status error.";
      job.updatedAt = Date.now();
      logError(`${logPrefix} animation:status:error`, { jobId, error });
    }
  }

  jsonResponse(req, res, 200, {
    jobId: job.id,
    status: job.status,
    error: job.error,
    videoReady: job.status === "completed",
    videoUrl: job.status === "completed" ? `/api/animation-jobs/${job.id}/video` : null,
  });
};

const handleAnimationVideo = async (
  req: IncomingMessage,
  res: ServerResponse,
  ip: string,
  logPrefix: string,
  jobId: string
) => {
  const job = animationJobs.get(jobId);
  if (!job) {
    jsonResponse(req, res, 404, { error: "Animation job not found." });
    return;
  }

  if (job.ip !== ip) {
    jsonResponse(req, res, 403, { error: "Nu aveți acces la acest video." });
    return;
  }

  if (job.status !== "completed") {
    jsonResponse(req, res, 409, { error: "Video-ul nu este gata încă." });
    return;
  }

  if (job.videoBytesBase64) {
    const payload = Buffer.from(job.videoBytesBase64, "base64");
    res.statusCode = 200;
    res.setHeader("Content-Type", job.videoMimeType || "video/mp4");
    res.setHeader("Content-Length", String(payload.length));
    res.end(payload);
    return;
  }

  if (!job.videoUri || !config.apiKey) {
    jsonResponse(req, res, 500, { error: "Video-ul nu este disponibil pentru descărcare." });
    return;
  }

  const videoResponse = await fetch(job.videoUri, {
    headers: {
      "x-goog-api-key": config.apiKey,
    },
  });

  if (!videoResponse.ok) {
    logError(`${logPrefix} animation:video:fetch:error`, {
      jobId,
      status: videoResponse.status,
    });
    jsonResponse(req, res, 502, { error: "Nu s-a putut descărca video-ul generat." });
    return;
  }

  const videoBytes = Buffer.from(await videoResponse.arrayBuffer());
  const contentType = videoResponse.headers.get("content-type") || job.videoMimeType || "video/mp4";
  job.videoMimeType = contentType;
  job.videoBytesBase64 = videoBytes.toString("base64");
  job.updatedAt = Date.now();

  res.statusCode = 200;
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Length", String(videoBytes.length));
  res.end(videoBytes);
};

const handleGenerate = async (req: IncomingMessage, res: ServerResponse, ip: string, logPrefix: string) => {
  const body = (await readJsonBody(req)) as GenerateRequestBody;
  const { imageBase64, implantType, implantSize, customPrompt } = parseGenerateBody(body, {
    maxCustomPromptLength: MAX_CUSTOM_PROMPT_LENGTH,
  });
  const rateSnapshot = simulatorRateLimiter.getRateSnapshot(ip);
  const { normalizedMimeType, base64Data } = extractImageData(imageBase64);

  logInfo(`${logPrefix} request:received`, {
    ip,
    implantType,
    implantSize,
    customPromptLength: customPrompt.length,
    imageBase64Length: imageBase64?.length ?? 0,
    mimeType: normalizedMimeType,
    rateSnapshot,
  });

  if (!rateSnapshot.canGenerate) {
    const message =
      rateSnapshot.limitType === "minute"
        ? "Ați depășit limita de 3 încercări pe minut. Vă rugăm așteptați câteva secunde."
        : rateSnapshot.limitType === "hour"
        ? "Ați depășit limita de 10 încercări pe oră. Vă rugăm încercați mai târziu."
        : "Ați atins limita zilnică de 20 de încercări. Reveniți mâine.";
    jsonResponse(req, res, 429, { error: message });
    return;
  }

  if (!imageBase64) {
    jsonResponse(req, res, 400, { error: "Date imagine invalide." });
    return;
  }

  if (imageBase64.length > MAX_IMAGE_SIZE) {
    jsonResponse(req, res, 400, { error: "Imaginea este prea mare. Maximum 5MB." });
    return;
  }

  if (!implantType || !VALID_IMPLANT_TYPES.has(implantType as ImplantType)) {
    jsonResponse(req, res, 400, { error: "Tip de implant invalid." });
    return;
  }

  if (implantSize === null || implantSize < MIN_IMPLANT_SIZE || implantSize > MAX_IMPLANT_SIZE) {
    jsonResponse(req, res, 400, {
      error: `Mărime implant invalidă. Trebuie să fie între ${MIN_IMPLANT_SIZE} și ${MAX_IMPLANT_SIZE}cc.`,
    });
    return;
  }

  if (!ALLOWED_IMAGE_MIME_TYPES.has(normalizedMimeType)) {
    jsonResponse(req, res, 400, { error: "Format imagine neacceptat. Folosiți JPG, PNG sau WEBP." });
    return;
  }

  if (customPrompt && hasDisallowedPromptTerms(customPrompt)) {
    jsonResponse(req, res, 200, {
      error: "Instrucțiunile explicite, sexualizate sau pentru minori nu sunt permise. Folosiți doar detalii clinice.",
    });
    return;
  }

  simulatorRateLimiter.recordRequest(ip);

  if (!config.apiKey) {
    jsonResponse(req, res, 503, { error: "Serviciu temporar indisponibil (configurare)." });
    return;
  }

  const prompt = buildPrompt({
    implantType: implantType as ImplantType,
    implantSize,
    customPrompt,
    modelName: config.model,
  });
  const editPrompt = JSON.stringify(prompt, null, 2);

  logInfo(`${logPrefix} gemini:request`, {
    model: config.model,
    promptLength: editPrompt.length,
    imageDataLength: base64Data.length,
    mimeType: normalizedMimeType,
    userConfig: {
      implant_type: implantType,
      implant_size_cc: implantSize,
      clinical_instruction: customPrompt || null,
    },
  });

  if (!genAI) {
    jsonResponse(req, res, 503, { error: "Serviciu temporar indisponibil (configurare)." });
    return;
  }

  let data: GeminiResponse | null = null;

  try {
    const payload: Parameters<typeof genAI.models.generateContent>[0] = {
      model: config.model,
      contents: [
        { text: editPrompt },
        {
          inlineData: {
            mimeType: normalizedMimeType,
            data: base64Data,
          },
        },
      ],
      // NOTE: imageConfig.imageSize caused INVALID_ARGUMENT for this key/model.
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    };

    logInfo(`${logPrefix} gemini:attempt`, {
      variant: "parts+json_prompt_from_prompt_ts+config_text_image_no_imagesize",
    });

    const geminiResponse = await genAI.models.generateContent(payload);
    data = geminiResponse as unknown as GeminiResponse;

    logInfo(`${logPrefix} gemini:attempt:ok`, {
      variant: "parts+json_prompt_from_prompt_ts+config_text_image_no_imagesize",
    });
  } catch (error) {
    const status = getStatusFromError(error);
    logError(`${logPrefix} gemini:error`, {
      status,
      error,
    });

    if (status === 429) {
      jsonResponse(req, res, 429, { error: "Prea multe cereri. Încercați din nou în câteva secunde." });
      return;
    }

    jsonResponse(req, res, 500, { error: "Nu s-a putut genera vizualizarea. Încercați din nou." });
    return;
  }

  const generatedImage = selectGeneratedImage(data);

  if (!generatedImage) {
    const finishReason = data.candidates?.[0]?.finishReason || data.candidates?.[0]?.finish_reason;
    const safetyRatings = (data.candidates?.[0] as Record<string, unknown> | undefined)?.safetyRatings;
    logWarn(`${logPrefix} gemini:no-image`, { finishReason, safetyRatings });

    if (finishReason === "SAFETY" || finishReason === "IMAGE_SAFETY") {
      jsonResponse(req, res, 200, {
        error:
          "Generarea a fost blocată de filtrele de siguranță ale modelului (IMAGE_SAFETY). Folosiți o fotografie clinică non-explicită (ex: bustieră/sutien sport/top opac), lumină neutră și fără expunere areolară.",
        showTips: true,
      });
      return;
    }

    jsonResponse(req, res, 200, {
      error: "AI-ul nu a generat o imagine. Încercați cu o fotografie diferită.",
      showTips: true,
    });
    return;
  }

  jsonResponse(req, res, 200, {
    generatedImage,
    message: "Vizualizare generată cu succes",
  });
};

const server = createServer(async (req, res) => {
  const method = req.method || "GET";
  const requestUrl = new URL(req.url || "/", "http://localhost");
  const pathname = requestUrl.pathname;
  const requestId = crypto.randomUUID();
  const ip = getClientIp(req);
  const logPrefix = `[Simulator API ${requestId}]`;
  const animationStatusMatch = pathname.match(/^\/api\/animation-jobs\/([a-f0-9-]+)$/);
  const animationVideoMatch = pathname.match(/^\/api\/animation-jobs\/([a-f0-9-]+)\/video$/);

  // Apply CORS headers as early as possible for all code paths.
  applyCorsHeaders(req, res);

  res.on("finish", () => {
    logInfo(`${logPrefix} response:sent`, {
      method,
      pathname,
      statusCode: res.statusCode,
    });
  });

  try {
    pruneAnimationJobs();

    if (method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (method === "GET" && pathname === "/health") {
      jsonResponse(req, res, 200, {
        ok: true,
        service: "simulator-api",
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (pathname.startsWith("/api/") && config.allowedCountryCodes.length > 0 && !isLoopbackIp(ip)) {
      const { countryCode, source } = resolveCountryCode(req, ip);
      const isAllowedCountry = countryCode ? config.allowedCountryCodes.includes(countryCode) : false;
      const canProceed = isAllowedCountry || (!countryCode && config.allowUnknownCountry);

      logInfo(`${logPrefix} geo:check`, {
        ip,
        countryCode,
        source,
        allowedCountryCodes: config.allowedCountryCodes,
        allowUnknownCountry: config.allowUnknownCountry,
        canProceed,
      });

      if (!canProceed) {
        logWarn(`${logPrefix} geo:blocked`, {
          ip,
          countryCode,
          source,
          reason: countryCode ? "country_not_allowed" : "country_not_detected",
        });
        jsonResponse(req, res, 403, {
          error: "Accesul la simulator este permis doar din regiuni autorizate.",
        });
        return;
      }
    }

    if (method === "GET" && pathname === "/api/check-rate-limits") {
      handleCheckRateLimits(req, res, ip, logPrefix);
      return;
    }

    if (method === "POST" && pathname === "/api/generate-implant-visualization") {
      await handleGenerate(req, res, ip, logPrefix);
      return;
    }

    if (method === "GET" && pathname === "/api/check-animation-rate-limits") {
      handleCheckAnimationRateLimits(req, res, ip, logPrefix);
      return;
    }

    if (method === "POST" && pathname === "/api/animate-implant-visualization") {
      await handleStartAnimation(req, res, ip, logPrefix);
      return;
    }

    if (method === "GET" && animationStatusMatch?.[1]) {
      await handleAnimationStatus(req, res, ip, logPrefix, animationStatusMatch[1]);
      return;
    }

    if (method === "GET" && animationVideoMatch?.[1]) {
      await handleAnimationVideo(req, res, ip, logPrefix, animationVideoMatch[1]);
      return;
    }

    jsonResponse(req, res, 404, { error: "Not found" });
  } catch (error) {
    logError(`${logPrefix} request:error`, error);

    if (error instanceof Error && error.message === "BODY_TOO_LARGE") {
      jsonResponse(req, res, 413, { error: "Body prea mare." });
      return;
    }

    if (error instanceof SyntaxError) {
      jsonResponse(req, res, 400, { error: "JSON invalid." });
      return;
    }

    jsonResponse(req, res, 500, { error: "Eroare internă la procesarea cererii." });
  }
});

server.listen(config.port, config.host, () => {
  logInfo(`[Simulator API] Listening on http://${config.host}:${config.port}`);
  if (config.allowedCountryCodes.length > 0) {
    logInfo("[Simulator API] Country allowlist enabled", {
      allowedCountryCodes: config.allowedCountryCodes,
      countryHeaderNames: config.countryHeaderNames,
      allowUnknownCountry: config.allowUnknownCountry,
    });
  }
});
