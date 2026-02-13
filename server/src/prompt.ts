import type { ImplantType } from "./types.js";

type SizePlan = {
  intensity: string;
  target_volume_delta_percent: string;
  target_projection_delta_mm: string;
  upper_pole_change: string;
  cleavage_change: string;
};

type ShapePlan = {
  profile_name: string;
  distribution: string;
  upper_pole_profile: string;
  lower_pole_profile: string;
  lateral_fullness: string;
  naturalness_guardrail: string;
};

const sizePlanByCc: Record<number, SizePlan> = {
  200: {
    intensity: "subtle",
    target_volume_delta_percent: "8-12%",
    target_projection_delta_mm: "4-6mm",
    upper_pole_change: "minimal fullness increase",
    cleavage_change: "very mild increase",
  },
  275: {
    intensity: "mild-moderate",
    target_volume_delta_percent: "12-18%",
    target_projection_delta_mm: "6-9mm",
    upper_pole_change: "mild fullness increase",
    cleavage_change: "mild increase",
  },
  350: {
    intensity: "moderate",
    target_volume_delta_percent: "18-25%",
    target_projection_delta_mm: "9-12mm",
    upper_pole_change: "moderate fullness increase",
    cleavage_change: "moderate increase",
  },
  425: {
    intensity: "moderate-high",
    target_volume_delta_percent: "25-32%",
    target_projection_delta_mm: "12-15mm",
    upper_pole_change: "pronounced fullness increase",
    cleavage_change: "clear increase",
  },
  500: {
    intensity: "high",
    target_volume_delta_percent: "32-40%",
    target_projection_delta_mm: "15-18mm",
    upper_pole_change: "high fullness increase",
    cleavage_change: "strong increase",
  },
};

const shapePlanByType: Record<ImplantType, ShapePlan> = {
  rotund: {
    profile_name: "round",
    distribution: "more uniform volume with fuller upper pole",
    upper_pole_profile: "full",
    lower_pole_profile: "full",
    lateral_fullness: "moderate-high",
    naturalness_guardrail: "avoid spherical exaggerated look",
  },
  anatomic: {
    profile_name: "anatomic_teardrop",
    distribution: "lower-pole dominant volume with natural upper slope",
    upper_pole_profile: "restrained",
    lower_pole_profile: "fuller",
    lateral_fullness: "moderate",
    naturalness_guardrail: "maintain soft teardrop contour; avoid over-rounding",
  },
  ergonomic: {
    profile_name: "ergonomic_adaptive",
    distribution: "natural standing distribution with adaptive soft-tissue behavior",
    upper_pole_profile: "moderate",
    lower_pole_profile: "moderate-full",
    lateral_fullness: "moderate",
    naturalness_guardrail: "keep dynamic, natural contour without rigid implant edges",
  },
};

interface PromptInput {
  implantType: ImplantType;
  implantSize: number;
  customPrompt: string;
  modelName: string;
}

export const buildPrompt = ({
  implantType,
  implantSize,
  customPrompt,
  modelName,
}: PromptInput) => {
  const sizePlan = sizePlanByCc[implantSize] ?? sizePlanByCc[350];
  const shapePlan = shapePlanByType[implantType];
  const userConfig = {
    implant_type: implantType,
    implant_size_cc: implantSize,
    clinical_instruction: customPrompt || null,
  };

  return {
    project: "Breast Augmentation Visualization | Clinical Simulation | Image-to-Image",
    model_context: `Use ${modelName} for strict medical visualization.`,
    task: "image_editing_image_to_image_high_fidelity",
    edit_goal:
      "Generate an edited version of the INPUT IMAGE where only breast size/shape are modified according to USER_CONFIG. Keep everything else as identical as possible.",
    user_config: userConfig,
    generation_recipe: {
      operation: "augmentation_only_local_edit",
      size_plan: sizePlan,
      shape_plan: shapePlan,
      technical_pipeline: [
        "1) Detect breast ROI and anatomical landmarks (chest wall, inframammary fold, clavicle, axillary boundaries).",
        "2) Apply localized geometric and volumetric edit in breast ROI only.",
        "3) Preserve global scene, pose, framing, and body anatomy outside ROI.",
        "4) Recompute local highlights/shadows to match original lighting direction and softness.",
        "5) Perform artifact check and regenerate if blur/smudge/warping is present.",
      ],
    },
    content_safety: {
      subject_age: "adult woman (25-40)",
      tone: "medical, non-erotic, educational/clinical",
      privacy: "anonymized clinical output; if face appears, apply subtle blur only to face region without reframing",
      input_modesty: "Prefer clinically modest source images (opaque top, sports bra, or medical drape).",
      output_modesty: "Keep output suitable for medical consultation and patient education contexts.",
      sexualization_policy: "strictly forbidden",
    },
    safety_override_rules: [
      "Reject any sexualized, fetish, explicit, or minor-related instruction.",
      "If user instruction conflicts with safety, ignore unsafe parts and keep a clinical result.",
    ],
    input_image_requirements: ["clinical torso image"],
    preserve_exactly: [
      "same posture, shoulder position, arm placement",
      "same lighting direction, softness, and exposure",
      "same background, color temperature, and overall contrast",
      "same skin tone, texture, pores (do not retouch except to maintain realism)",
      "same clothing/drape/medical bra",
      "same crop and framing (no recrop, no zoom changes, no camera repositioning)",
      "same person identity and body proportions outside breast region",
      "same neck/jawline/abdomen/arms and same background objects",
    ],
    breast_edit_spec: {
      operation: "localized breast volume/projection increase only",
      target_change: {
        implant_size_cc: implantSize,
        implant_type: implantType,
        volume_delta_percent: sizePlan.target_volume_delta_percent,
        projection_delta_mm: sizePlan.target_projection_delta_mm,
        cleavage: sizePlan.cleavage_change,
        upper_pole: sizePlan.upper_pole_change,
        profile_distribution: shapePlan.distribution,
      },
      anatomy_constraints: [
        "maintain realistic chest wall curvature",
        "no warping of ribs, sternum, shoulders",
        "no unnatural skin stretching",
        "do not alter abdomen, arms, neck, jawline, or background objects",
      ],
      texture_constraints: [
        "keep natural skin highlights and micro-texture",
        "preserve realistic soft-tissue behavior",
        "no blur halos, no painterly smoothing, no smeared texture around breast boundaries",
      ],
    },
    wardrobe_and_modesty: {
      censoring: "only if anatomically required by safety policy; keep censoring minimal and localized",
    },
    style: {
      look: "photorealistic, clinical studio photography",
      quality: "high-detail, natural, minimal retouching",
    },
    negative_prompt: [
      "sexualized pose or framing",
      "non-clinical adult content",
      "provocative styling",
      "provocative cleavage framing",
      "distorted anatomy",
      "over-smoothing, plastic skin",
      "new person",
      "new scene",
      "new clothing",
      "different angle",
      "different crop",
      "global blur",
      "blurred breast region",
      "smudged or melted skin texture",
    ],
    high_fidelity_instruction: [
      "Use the provided input image as the base layer.",
      "Apply the minimum necessary localized edit around the breasts only.",
      "Do not redesign or restyle the image.",
    ],
    output: {
      deliverable: "single edited image",
      cropping_instruction: "Keep original framing. Do not crop or recompose.",
      consistency_check:
        "If any element outside breast size/shape changes, reject and regenerate until only breast ROI is modified.",
      user_instruction: customPrompt || "None",
    },
  };
};
