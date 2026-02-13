import type { IncomingMessage } from "node:http";
import geoip from "geoip-lite";

export const isLoopbackIp = (ip: string): boolean =>
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

const getCountryCodeFromHeaders = (req: IncomingMessage, countryHeaderNames: string[]): string | null => {
  for (const headerName of countryHeaderNames) {
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

export const resolveCountryCode = (
  req: IncomingMessage,
  ip: string,
  countryHeaderNames: string[]
): { countryCode: string | null; source: "header" | "geoip" | "unknown" } => {
  const fromHeader = getCountryCodeFromHeaders(req, countryHeaderNames);
  if (fromHeader) {
    return { countryCode: fromHeader, source: "header" };
  }

  const fromGeoip = getCountryCodeFromIp(ip);
  if (fromGeoip) {
    return { countryCode: fromGeoip, source: "geoip" };
  }

  return { countryCode: null, source: "unknown" };
};
