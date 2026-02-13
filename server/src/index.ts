import crypto from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { createServer } from "node:http";
import { inspect } from "node:util";
import { GoogleGenAI } from "@google/genai";
import geoip from "geoip-lite";

import {
  ALLOWED_IMAGE_MIME_TYPES,
  DISALLOWED_PROMPT_PATTERNS,
  MAX_CUSTOM_PROMPT_LENGTH,
  MAX_IMAGE_SIZE,
  MAX_IMPLANT_SIZE,
  MIN_IMPLANT_SIZE,
  SIMULATOR_RATE_LIMITS,
  VALID_IMPLANT_TYPES,
} from "./constants.js";
import { getServerConfig, loadEnvironment } from "./env.js";
import { buildPrompt } from "./prompt.js";
import { createRateLimiter } from "./rate-limiter.js";
import type { GeminiResponse, GenerateRequestBody, ImplantType } from "./types.js";

loadEnvironment();
const config = getServerConfig();
const genAI = config.apiKey ? new GoogleGenAI({ apiKey: config.apiKey }) : null;
const simulatorRateLimiter = createRateLimiter(SIMULATOR_RATE_LIMITS);

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

const replaceControlCharsWithSpace = (input: string): string => {
  let cleaned = "";
  for (const char of input) {
    const code = char.charCodeAt(0);
    cleaned += code < 32 || code === 127 ? " " : char;
  }
  return cleaned;
};

const sanitizeUserPrompt = (prompt: string): string =>
  prompt
    .split("\n")
    .map((line) => replaceControlCharsWithSpace(line))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_CUSTOM_PROMPT_LENGTH);

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

const extractImageData = (imageBase64: string | null) => {
  const dataUrlMatch =
    typeof imageBase64 === "string"
      ? imageBase64.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/)
      : null;
  const rawMimeType = dataUrlMatch?.[1]?.toLowerCase() ?? "image/jpeg";
  const normalizedMimeType = rawMimeType === "image/jpg" ? "image/jpeg" : rawMimeType;
  const base64Data =
    typeof imageBase64 === "string" ? (dataUrlMatch?.[2] ?? imageBase64).trim() : "";

  return { normalizedMimeType, base64Data };
};

const parseGenerateBody = (body: GenerateRequestBody) => {
  const imageBase64 = typeof body.imageBase64 === "string" ? body.imageBase64 : null;
  const implantType = typeof body.implantType === "string" ? body.implantType : null;
  const implantSize = typeof body.implantSize === "number" ? body.implantSize : null;
  const customPromptRaw = typeof body.customPrompt === "string" ? body.customPrompt : "";
  const customPrompt = sanitizeUserPrompt(customPromptRaw);
  return { imageBase64, implantType, implantSize, customPrompt };
};

const selectGeneratedImage = (data: GeminiResponse): string | null => {
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imageParts = parts.filter((part) => Boolean(part.inline_data || part.inlineData));
  const nonThoughtImagePart = imageParts.find((part) => !part.thought);
  const selectedImagePart = nonThoughtImagePart || imageParts.at(-1);

  if (selectedImagePart) {
    const inlineData = selectedImagePart.inline_data || selectedImagePart.inlineData;
    if (inlineData?.data) {
      const outputMimeType = inlineData.mime_type || inlineData.mimeType || "image/png";
      return `data:${outputMimeType};base64,${inlineData.data}`;
    }
  }

  for (const part of parts) {
    const inlineData = part.inline_data || part.inlineData;
    if (inlineData?.data) {
      const outputMimeType = inlineData.mime_type || inlineData.mimeType || "image/png";
      return `data:${outputMimeType};base64,${inlineData.data}`;
    }
  }

  return null;
};

const getStatusFromError = (error: unknown): number | null => {
  if (!error || typeof error !== "object") return null;
  const payload = error as Record<string, unknown>;
  const directStatus = payload.status;
  if (typeof directStatus === "number") return directStatus;

  const statusCode = payload.statusCode;
  if (typeof statusCode === "number") return statusCode;

  const code = payload.code;
  if (typeof code === "number") return code;

  const nestedError = payload.error;
  if (nestedError && typeof nestedError === "object") {
    const nestedStatus = (nestedError as Record<string, unknown>).status;
    if (typeof nestedStatus === "number") return nestedStatus;
  }

  return null;
};

const handleCheckRateLimits = (req: IncomingMessage, res: ServerResponse, ip: string, logPrefix: string) => {
  const snapshot = simulatorRateLimiter.getRateSnapshot(ip);
  logInfo(`${logPrefix} check-rate-limits`, { ip, snapshot });
  jsonResponse(req, res, 200, snapshot);
};

const handleGenerate = async (req: IncomingMessage, res: ServerResponse, ip: string, logPrefix: string) => {
  const body = (await readJsonBody(req)) as GenerateRequestBody;
  const { imageBase64, implantType, implantSize, customPrompt } = parseGenerateBody(body);
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
