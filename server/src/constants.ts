import type { ImplantType, RateLimitConfig } from "./types.js";

export const SIMULATOR_RATE_LIMITS: RateLimitConfig = {
  perMinute: 3,
  perHour: 10,
  perDay: 20,
};

export const VALID_IMPLANT_TYPES = new Set<ImplantType>(["rotund", "anatomic", "ergonomic"]);
export const MIN_IMPLANT_SIZE = 200;
export const MAX_IMPLANT_SIZE = 500;
export const MAX_IMAGE_SIZE = 7_000_000;
export const MAX_CUSTOM_PROMPT_LENGTH = 280;
export const DEFAULT_NANO_BANANA_MODEL = "gemini-3-pro-image-preview";
export const ALLOWED_IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const DISALLOWED_PROMPT_PATTERNS: RegExp[] = [
  /\b(nsfw|porn|porno|erotic|sexy|seductive|fetish|xxx|onlyfans|striptease)\b/i,
  /\b(topless|lingerie|see[- ]?through|nipple play|boobs out)\b/i,
  /\b(minor|underage|teen|child|copil|minora|minore)\b/i,
];
