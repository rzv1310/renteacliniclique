export type LimitType = "minute" | "hour" | "day" | null;

export interface RateLimitsResponse {
  limits: {
    minute: { used: number; limit: number; remaining: number };
    hour: { used: number; limit: number; remaining: number };
    day: { used: number; limit: number; remaining: number };
  };
  canGenerate: boolean;
  limitType: LimitType;
}

export interface RateLimitConfig {
  perMinute: number;
  perHour: number;
  perDay: number;
}

export type ImplantType = "rotund" | "anatomic" | "ergonomic";

export interface GenerateRequestBody {
  imageBase64?: unknown;
  implantType?: unknown;
  implantSize?: unknown;
  customPrompt?: unknown;
}

export interface InlineDataPayload {
  data?: string;
  mime_type?: string;
  mimeType?: string;
}

export interface GeminiCandidatePart {
  thought?: boolean;
  inline_data?: InlineDataPayload;
  inlineData?: InlineDataPayload;
}

export interface GeminiResponse {
  candidates?: Array<{
    finishReason?: string;
    finish_reason?: string;
    content?: {
      parts?: GeminiCandidatePart[];
    };
  }>;
}
