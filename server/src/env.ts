import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DEFAULT_IMAGE_SIZE, DEFAULT_NANO_BANANA_MODEL } from "./constants.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(currentDir, "..");
const repoRoot = path.resolve(serverRoot, "..");

const unquote = (input: string): string => {
  const trimmed = input.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const tryLoadEnvFile = (filePath: string, override = true) => {
  if (!fs.existsSync(filePath)) return;

  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator <= 0) continue;

    const key = trimmed.slice(0, separator).trim();
    if (!key) continue;

    if (!override && process.env[key] !== undefined) continue;

    const value = unquote(trimmed.slice(separator + 1));
    process.env[key] = value;
  }
};

export const loadEnvironment = () => {
  tryLoadEnvFile(path.join(repoRoot, ".env"));
  tryLoadEnvFile(path.join(repoRoot, ".env.local"));
  tryLoadEnvFile(path.join(serverRoot, ".env"));
  tryLoadEnvFile(path.join(serverRoot, ".env.local"));
};

const parseCorsOrigins = (raw: string | undefined): string[] =>
  (raw || "*")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

const parseCountryCodes = (raw: string | undefined): string[] =>
  (raw || "")
    .split(",")
    .map((value) => value.trim().toUpperCase())
    .filter((value) => /^[A-Z]{2}$/.test(value));

const parseHeaderNames = (raw: string | undefined): string[] =>
  (raw || "cf-ipcountry,x-vercel-ip-country,x-country-code,x-geo-country")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

const parseBoolean = (raw: string | undefined, fallback: boolean): boolean => {
  if (!raw) return fallback;
  const normalized = raw.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return fallback;
};

const parsePort = (raw: string | undefined): number => {
  if (!raw) return 8787;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) return 8787;
  return parsed;
};

export interface ServerConfig {
  host: string;
  port: number;
  corsOrigins: string[];
  apiKey?: string;
  model: string;
  imageSize: string;
  allowedCountryCodes: string[];
  countryHeaderNames: string[];
  allowUnknownCountry: boolean;
}

export const getServerConfig = (): ServerConfig => ({
  host: process.env.HOST || "127.0.0.1",
  port: parsePort(process.env.PORT),
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
  apiKey: process.env.NANO_BANANA_API_KEY,
  model: process.env.NANO_BANANA_MODEL || DEFAULT_NANO_BANANA_MODEL,
  imageSize: (process.env.NANO_BANANA_IMAGE_SIZE || DEFAULT_IMAGE_SIZE).toUpperCase(),
  allowedCountryCodes: parseCountryCodes(process.env.COUNTRY_ALLOWLIST),
  countryHeaderNames: parseHeaderNames(process.env.COUNTRY_HEADER_NAMES),
  allowUnknownCountry: parseBoolean(process.env.ALLOW_UNKNOWN_COUNTRY, false),
});
