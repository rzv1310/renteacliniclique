import type { IncomingMessage, ServerResponse } from "node:http";

const resolveCorsOrigin = (corsOrigins: string[], requestOrigin: string | null): string => {
  if (corsOrigins.length === 0 || corsOrigins.includes("*")) {
    return "*";
  }

  if (requestOrigin && corsOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  return corsOrigins[0];
};

export const applyCorsHeaders = (req: IncomingMessage, res: ServerResponse, corsOrigins: string[]) => {
  const requestOrigin = typeof req.headers.origin === "string" ? req.headers.origin : null;
  const allowedOrigin = resolveCorsOrigin(corsOrigins, requestOrigin);
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (allowedOrigin !== "*") {
    res.setHeader("Vary", "Origin");
  }
};

export const jsonResponse = (
  req: IncomingMessage,
  res: ServerResponse,
  statusCode: number,
  payload: unknown,
  corsOrigins: string[]
) => {
  res.statusCode = statusCode;
  applyCorsHeaders(req, res, corsOrigins);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

export const getClientIp = (req: IncomingMessage): string => {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return req.socket.remoteAddress || "unknown";
};

export const readJsonBody = async (req: IncomingMessage, maxBytes = 10_000_000): Promise<Record<string, unknown>> => {
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
