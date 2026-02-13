export const API_UNAVAILABLE_MESSAGE =
  "Serviciul este temporar indisponibil. Te rugăm să încerci din nou în câteva momente.";

export const LOCAL_API_BASE_URL = "http://127.0.0.1:8787";

export const resolveApiBaseUrl = (): string => {
  const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").trim();
  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, "");
  }

  if (import.meta.env.DEV) {
    return LOCAL_API_BASE_URL;
  }

  return "";
};

export const buildApiUrl = (path: string): string => `${resolveApiBaseUrl()}${path}`;

export const parseJsonSafely = <T>(raw: string): T | null => {
  if (!raw.trim()) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const isUnavailableProxyResponse = (status: number, rawBody: string): boolean => {
  return status >= 500 && !rawBody.trim();
};

export const isServerUnavailableError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return (
    message.includes("failed to fetch") ||
    message.includes("networkerror") ||
    message.includes("network error")
  );
};
