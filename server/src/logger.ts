import { inspect } from "node:util";

export const formatLogPayload = (payload: unknown): string => {
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

export const logInfo = (message: string, payload?: unknown) => {
  if (payload === undefined) {
    console.info(message);
    return;
  }
  console.info(`${message} ${formatLogPayload(payload)}`);
};

export const logWarn = (message: string, payload?: unknown) => {
  if (payload === undefined) {
    console.warn(message);
    return;
  }
  console.warn(`${message} ${formatLogPayload(payload)}`);
};

export const logError = (message: string, payload?: unknown) => {
  if (payload === undefined) {
    console.error(message);
    return;
  }
  console.error(`${message} ${formatLogPayload(payload)}`);
};
