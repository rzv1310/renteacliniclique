import type { AnimateRequestBody, GeminiResponse, GenerateRequestBody } from "./types.js";

interface ParseBodyContext {
  maxCustomPromptLength: number;
}

const replaceControlCharsWithSpace = (input: string): string => {
  let cleaned = "";
  for (const char of input) {
    const code = char.charCodeAt(0);
    cleaned += code < 32 || code === 127 ? " " : char;
  }
  return cleaned;
};

export const sanitizeUserPrompt = (prompt: string, maxCustomPromptLength: number): string =>
  prompt
    .split("\n")
    .map((line) => replaceControlCharsWithSpace(line))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxCustomPromptLength);

export const parseGenerateBody = (body: GenerateRequestBody, context: ParseBodyContext) => {
  const imageBase64 = typeof body.imageBase64 === "string" ? body.imageBase64 : null;
  const implantType = typeof body.implantType === "string" ? body.implantType : null;
  const implantSize = typeof body.implantSize === "number" ? body.implantSize : null;
  const customPromptRaw = typeof body.customPrompt === "string" ? body.customPrompt : "";
  const customPrompt = sanitizeUserPrompt(customPromptRaw, context.maxCustomPromptLength);
  return { imageBase64, implantType, implantSize, customPrompt };
};

export const parseAnimateBody = (body: AnimateRequestBody, context: ParseBodyContext) => {
  const imageBase64 = typeof body.imageBase64 === "string" ? body.imageBase64 : null;
  const implantType = typeof body.implantType === "string" ? body.implantType : null;
  const implantSize = typeof body.implantSize === "number" ? body.implantSize : null;
  const customPromptRaw = typeof body.customPrompt === "string" ? body.customPrompt : "";
  const customPrompt = sanitizeUserPrompt(customPromptRaw, context.maxCustomPromptLength);
  return { imageBase64, implantType, implantSize, customPrompt };
};

export const extractImageData = (imageBase64: string | null) => {
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

export const selectGeneratedImage = (data: GeminiResponse): string | null => {
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

export const getStatusFromError = (error: unknown): number | null => {
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

export const getErrorMessageFromUnknown = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    try {
      const parsed = JSON.parse(error.message) as { error?: { message?: string } };
      if (parsed?.error?.message) return parsed.error.message;
    } catch {
      // Keep raw message fallback.
    }
    return error.message;
  }

  if (typeof error === "string") return error;
  return "Unexpected upstream error.";
};
