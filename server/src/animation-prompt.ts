import type { ImplantType } from "./types.js";

interface AnimationPromptInput {
  implantType: ImplantType;
  implantSize: number;
  customPrompt: string;
}

export const buildAnimationPromptPayload = ({
  implantType,
  implantSize,
  customPrompt,
}: AnimationPromptInput) => {
  const userConfig = {
    implant_type: implantType,
    implant_size_cc: implantSize,
    clinical_instruction: customPrompt || null,
    duration_seconds: 4,
    aspect_ratio: "16:9",
    resolution: "720p",
  };

  return {
    project: "Breast Augmentation Clinical Animation | Image-to-Video",
    task: "medical_image_to_video_micro_motion_preview",
    mode: "medical_consultation_only",
    compliance_note:
      "Medical-only educational visualization for consultation planning. Not erotic, not suggestive, not entertainment.",
    user_config: userConfig,
    safety: {
      context: "strictly medical, non-sexual, doctor-patient consultation",
      disallowed: [
        "erotic or suggestive framing",
        "provocative gestures",
        "fetish styling",
        "explicit nudity",
        "glamour or fashion restyling",
      ],
      modesty:
        "maintain patient dignity and clinically appropriate appearance suitable for consultation",
    },
    motion_design: {
      goal: "animate the provided post-simulation image for dynamic medical understanding, with clearly visible movement while remaining clinically neutral",
      loop_target: "create a seamless 4-second loop-ready clip with smooth start/end continuity",
      allowed_camera_motion: ["gentle push-in", "slight parallax drift"],
      allowed_subject_motion: [
        "energetic but controlled in-place movement for dynamic assessment",
        "clear weight shift left-right",
        "light knee flex/extend cycle",
        "small neutral torso sway",
      ],
      forbidden_camera_motion: [
        "fast whip pans",
        "dramatic cinematic moves",
        "sudden cuts or transitions",
      ],
      continuity: "preserve identity, anatomy, clothing coverage, lighting, and background continuity",
      explicit_instruction:
        "Purpose is biomechanical/clinical dynamics understanding only. Do not reinterpret body shape, do not stylize, do not add sensual posing or dance-like behavior. Preserve the clinical appearance of the source image and maintain medically neutral movement. Ensure last frames transition naturally into first frames for loop playback.",
    },
    quality: {
      style: "photorealistic clinical look",
      constraints: [
        "no blur/smear/melting artifacts",
        "no anatomy deformation outside intended clinical context",
        "no scene changes",
      ],
    },
    failure_rule: "If safe clinical output cannot be produced, return no video.",
  };
};

export const buildAnimationPromptText = (input: AnimationPromptInput): string =>
  JSON.stringify(buildAnimationPromptPayload(input), null, 2);
