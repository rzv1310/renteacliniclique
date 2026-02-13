export const API_UNAVAILABLE_MESSAGE =
  "Serviciul este temporar indisponibil. Te rugăm să încerci din nou în câteva momente.";

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
