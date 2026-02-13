import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { logInfo, logWarn } from "./logger.js";

export type ProfileReferenceImage = {
  mimeType: string;
  data: string;
  sourcePath: string;
  profileKey: "low" | "moderate" | "moderate_plus" | "high" | "ultra_high";
  normalizedCc: number;
};

const selectNearestSupportedCc = (requestedCc: number): number => {
  const supported = [200, 250, 300, 350, 400, 450, 500];
  let nearest = supported[0];
  for (const cc of supported) {
    if (Math.abs(cc - requestedCc) < Math.abs(nearest - requestedCc)) {
      nearest = cc;
    }
  }
  return nearest;
};

const getProfileKeyForCc = (requestedCc: number): { profileKey: ProfileReferenceImage["profileKey"]; normalizedCc: number } => {
  const normalizedCc = selectNearestSupportedCc(requestedCc);

  if (normalizedCc <= 200) return { profileKey: "low", normalizedCc };
  if (normalizedCc <= 300) return { profileKey: "moderate", normalizedCc };
  if (normalizedCc <= 350) return { profileKey: "moderate_plus", normalizedCc };
  if (normalizedCc <= 450) return { profileKey: "high", normalizedCc };
  return { profileKey: "ultra_high", normalizedCc };
};

export const loadProfileReferenceImageForCc = (implantSizeCc: number): ProfileReferenceImage | null => {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFilePath);
  const { profileKey, normalizedCc } = getProfileKeyForCc(implantSizeCc);

  const candidatePaths = [
    path.resolve(currentDir, `../assets/profiles/${profileKey}.png`),
    path.resolve(process.cwd(), `assets/profiles/${profileKey}.png`),
    path.resolve(process.cwd(), `server/assets/profiles/${profileKey}.png`),
  ];

  for (const candidatePath of candidatePaths) {
    if (!existsSync(candidatePath)) {
      continue;
    }

    try {
      const bytes = readFileSync(candidatePath);
      logInfo("[Simulator API] profile-reference:loaded", {
        sourcePath: candidatePath,
        byteLength: bytes.length,
        profileKey,
        requestedCc: implantSizeCc,
        normalizedCc,
      });
      return {
        mimeType: "image/png",
        data: bytes.toString("base64"),
        sourcePath: candidatePath,
        profileKey,
        normalizedCc,
      };
    } catch (error) {
      logWarn("[Simulator API] profile-reference:read-error", {
        sourcePath: candidatePath,
        error,
        profileKey,
        requestedCc: implantSizeCc,
        normalizedCc,
      });
    }
  }

  logWarn("[Simulator API] profile-reference:not-found", {
    candidatePaths,
    profileKey,
    requestedCc: implantSizeCc,
    normalizedCc,
  });
  return null;
};
