/**
 * Product Tradeoff Engine — simulation model
 *
 * Separated from the UI so relationships can be tuned independently.
 * Values are 0–100. The model is intentionally approximate: it mirrors
 * how experienced product leaders reason about constraints, not a formula
 * that claims scientific precision.
 */

export type SliderId =
  | "scope"
  | "deliverySpeed"
  | "qualityBar"
  | "teamSize"
  | "innovation";

export type OutputId =
  | "deliveryTimeline"
  | "technicalDebt"
  | "teamStress"
  | "customerSatisfaction"
  | "strategicConfidence"
  | "productQuality"
  | "engineeringComplexity"
  | "deliveryPredictability";

export type SliderInputs = Record<SliderId, number>;
export type EngineOutputs = Record<OutputId, number>;

export type SliderDefinition = {
  id: SliderId;
  label: string;
  left: string;
  right: string;
  represents: string;
};

export type OutputGroup = "outcomes" | "costs";

export type OutputDefinition = {
  id: OutputId;
  label: string;
  /** Outcomes are gains; costs are pressures the system absorbs. */
  group: OutputGroup;
  /**
   * Category color — communicates family (outcome vs cost emotion),
   * not success or failure.
   */
  signal: "calm" | "caution" | "stress" | "uncertain" | "debt" | "neutral";
  format: (value: number) => string;
};

export type PresetId =
  | "startupMvp"
  | "enterprisePlatform"
  | "aiExperiment"
  | "customerCommitment"
  | "technicalModernization";

export type PresetTint = "amber" | "navy" | "teal" | "burgundy" | "steel";

export type Preset = {
  id: PresetId;
  label: string;
  blurb: string;
  tint: PresetTint;
  inputs: SliderInputs;
};

export type PrincipleTint = "slate" | "bronze" | "rust" | "teal" | "forest";

export type Principle = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  tint: PrincipleTint;
};

export const SLIDER_DEFINITIONS: SliderDefinition[] = [
  {
    id: "scope",
    label: "Scope",
    left: "Small release",
    right: "Large release",
    represents: "Feature count, breadth, and ambition",
  },
  {
    id: "deliverySpeed",
    label: "Delivery Speed",
    left: "Deliberate",
    right: "Aggressive",
    represents: "Launch pressure, deadlines, and urgency",
  },
  {
    id: "qualityBar",
    label: "Quality Bar",
    left: "Prototype",
    right: "Highly polished",
    represents: "Testing, reliability, and UX quality",
  },
  {
    id: "teamSize",
    label: "Team Size",
    left: "Small team",
    right: "Large organization",
    represents: "Engineering capacity and coordination complexity",
  },
  {
    id: "innovation",
    label: "Innovation",
    left: "Incremental",
    right: "Experimental",
    represents: "Novelty, uncertainty, and product risk",
  },
];

function timelineLabel(value: number) {
  if (value < 28) return "Near-term";
  if (value < 48) return "Measured";
  if (value < 68) return "Extended";
  if (value < 85) return "Long-haul";
  return "Indeterminate";
}

function intensityLabel(value: number) {
  if (value < 22) return "Low";
  if (value < 42) return "Moderate";
  if (value < 62) return "Elevated";
  if (value < 82) return "High";
  return "Severe";
}

function positiveLabel(value: number) {
  if (value < 22) return "Fragile";
  if (value < 42) return "Uneven";
  if (value < 62) return "Solid";
  if (value < 82) return "Strong";
  return "Exceptional";
}

function confidenceLabel(value: number) {
  if (value < 22) return "Speculative";
  if (value < 42) return "Tentative";
  if (value < 62) return "Grounded";
  if (value < 82) return "High";
  return "Conviction";
}

function predictabilityLabel(value: number) {
  if (value < 22) return "Volatile";
  if (value < 42) return "Uncertain";
  if (value < 62) return "Manageable";
  if (value < 82) return "Reliable";
  return "Highly stable";
}

export const OUTPUT_DEFINITIONS: OutputDefinition[] = [
  {
    id: "customerSatisfaction",
    label: "Customer satisfaction",
    group: "outcomes",
    signal: "calm",
    format: positiveLabel,
  },
  {
    id: "productQuality",
    label: "Product quality",
    group: "outcomes",
    signal: "calm",
    format: positiveLabel,
  },
  {
    id: "strategicConfidence",
    label: "Strategic confidence",
    group: "outcomes",
    signal: "uncertain",
    format: confidenceLabel,
  },
  {
    id: "deliveryPredictability",
    label: "Delivery predictability",
    group: "outcomes",
    signal: "uncertain",
    format: predictabilityLabel,
  },
  {
    id: "technicalDebt",
    label: "Technical debt",
    group: "costs",
    signal: "debt",
    format: intensityLabel,
  },
  {
    id: "teamStress",
    label: "Team stress",
    group: "costs",
    signal: "stress",
    format: intensityLabel,
  },
  {
    id: "engineeringComplexity",
    label: "Engineering complexity",
    group: "costs",
    signal: "uncertain",
    format: intensityLabel,
  },
  {
    id: "deliveryTimeline",
    label: "Delivery timeline",
    group: "costs",
    signal: "caution",
    format: timelineLabel,
  },
];

export const OUTCOME_DEFINITIONS = OUTPUT_DEFINITIONS.filter(
  (item) => item.group === "outcomes",
);

export const COST_DEFINITIONS = OUTPUT_DEFINITIONS.filter(
  (item) => item.group === "costs",
);

export type SliderEffect = {
  sliderId: SliderId;
  directionLabel: string;
  gains: string[];
  costs: string[];
};

/** Educational notes for the most recent constraint move. */
export const SLIDER_EFFECTS: Record<SliderId, SliderEffect> = {
  scope: {
    sliderId: "scope",
    directionLabel: "Scope ↑",
    gains: ["Customer impact surface", "Strategic coverage"],
    costs: ["Complexity", "Predictability"],
  },
  deliverySpeed: {
    sliderId: "deliverySpeed",
    directionLabel: "Delivery speed ↑",
    gains: ["Time-to-learning", "Short-term momentum"],
    costs: ["Technical debt", "Quality pressure"],
  },
  qualityBar: {
    sliderId: "qualityBar",
    directionLabel: "Quality bar ↑",
    gains: ["Trust", "Craft and reliability"],
    costs: ["Timeline", "Experimentation speed"],
  },
  teamSize: {
    sliderId: "teamSize",
    directionLabel: "Team size ↑",
    gains: ["Capacity", "Parallel progress"],
    costs: ["Coordination overhead", "Predictability"],
  },
  innovation: {
    sliderId: "innovation",
    directionLabel: "Innovation ↑",
    gains: ["Strategic upside", "Learning opportunities"],
    costs: ["Certainty", "Delivery predictability"],
  },
};

export const DEFAULT_INPUTS: SliderInputs = {
  scope: 48,
  deliverySpeed: 45,
  qualityBar: 55,
  teamSize: 40,
  innovation: 42,
};

export const PRESETS: Preset[] = [
  {
    id: "startupMvp",
    label: "Startup MVP",
    blurb: "Ship learning fast with a small team.",
    tint: "amber",
    inputs: {
      scope: 28,
      deliverySpeed: 78,
      qualityBar: 28,
      teamSize: 22,
      innovation: 72,
    },
  },
  {
    id: "enterprisePlatform",
    label: "Enterprise Platform",
    blurb: "Broad ambition with a high quality bar.",
    tint: "navy",
    inputs: {
      scope: 78,
      deliverySpeed: 38,
      qualityBar: 82,
      teamSize: 78,
      innovation: 42,
    },
  },
  {
    id: "aiExperiment",
    label: "AI Experiment",
    blurb: "High novelty, fast learning loops.",
    tint: "teal",
    inputs: {
      scope: 36,
      deliverySpeed: 70,
      qualityBar: 40,
      teamSize: 32,
      innovation: 88,
    },
  },
  {
    id: "customerCommitment",
    label: "Customer Commitment",
    blurb: "Protect a promise under delivery pressure.",
    tint: "burgundy",
    inputs: {
      scope: 62,
      deliverySpeed: 82,
      qualityBar: 58,
      teamSize: 48,
      innovation: 30,
    },
  },
  {
    id: "technicalModernization",
    label: "Technical Modernization",
    blurb: "Invest in platform health over feature sprawl.",
    tint: "steel",
    inputs: {
      scope: 32,
      deliverySpeed: 42,
      qualityBar: 78,
      teamSize: 52,
      innovation: 48,
    },
  },
];

export const PRINCIPLES: Principle[] = [
  {
    id: "iron-triangle",
    title: "The Iron Triangle",
    summary:
      "You cannot maximize scope, speed, and quality simultaneously.",
    detail:
      "Every serious product decision chooses which corner to protect. Pretending otherwise usually means quality erodes quietly while timelines slip and teams burn out.",
    tint: "slate",
  },
  {
    id: "brooks-law",
    title: "Brooks's Law",
    summary: "Adding people to a late project often makes it later.",
    detail:
      "New teammates bring ramp-up cost, communication paths, and coordination tax. Capacity helps — but late in a constrained delivery, more people can slow the system.",
    tint: "bronze",
  },
  {
    id: "technical-debt",
    title: "Technical Debt",
    summary: "Speed today can reduce velocity tomorrow.",
    detail:
      "Aggressive timelines create shortcuts. Some debt is intentional. Unmanaged debt becomes a tax on every future release and quietly rewrites the roadmap.",
    tint: "rust",
  },
  {
    id: "product-market-fit",
    title: "Product-Market Fit",
    summary: "Innovation increases opportunity but also uncertainty.",
    detail:
      "Experimental bets expand the possibility space. They also weaken confidence until learning loops produce evidence. Novelty without feedback is just risk.",
    tint: "teal",
  },
  {
    id: "outcome-thinking",
    title: "Outcome Thinking",
    summary:
      "Features matter only if they improve customer outcomes.",
    detail:
      "Scope is not value. Shipping more does not automatically create satisfaction. Product leadership keeps the work tethered to outcomes, not output volume.",
    tint: "forest",
  },
];

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Core simulation. Inputs and outputs are 0–100.
 */
export function computeOutputs(inputs: SliderInputs): EngineOutputs {
  const { scope, deliverySpeed, qualityBar, teamSize, innovation } = inputs;

  const scopeN = scope / 100;
  const speedN = deliverySpeed / 100;
  const qualityN = qualityBar / 100;
  const teamN = teamSize / 100;
  const innovationN = innovation / 100;

  // Capacity helps, but Brooks's Law bites when large teams meet aggressive pressure.
  const capacityRelief = teamN * 18 * (1 - speedN * 0.45);
  const brooksPenalty =
    teamN > 0.55 && speedN > 0.55
      ? (teamN - 0.55) * (speedN - 0.55) * 120
      : 0;
  const coordinationTax = teamN * teamN * 22;

  const deliveryTimeline = clamp(
    22 +
      scopeN * 42 +
      qualityN * 22 +
      innovationN * 14 -
      speedN * 32 -
      capacityRelief +
      brooksPenalty +
      coordinationTax * 0.25,
  );

  const technicalDebt = clamp(
    12 +
      speedN * 38 +
      scopeN * 18 +
      innovationN * 14 -
      qualityN * 42 +
      (speedN > 0.7 && qualityN < 0.4 ? 12 : 0) +
      (scopeN > 0.7 && teamN < 0.35 ? 10 : 0),
  );

  const overload =
    scopeN > 0.65 && teamN < 0.4 ? (scopeN - 0.65) * (0.4 - teamN) * 180 : 0;
  const crunch =
    qualityN > 0.7 && speedN > 0.65
      ? (qualityN - 0.7) * (speedN - 0.65) * 160
      : 0;

  const teamStress = clamp(
    14 +
      scopeN * 24 +
      speedN * 32 +
      innovationN * 12 +
      qualityN * speedN * 16 -
      teamN * 10 +
      overload +
      crunch +
      brooksPenalty * 0.35,
  );

  const productQuality = clamp(
    18 +
      qualityN * 58 +
      (1 - speedN) * 12 -
      scopeN * speedN * 22 -
      technicalDebt * 0.18 -
      (teamN < 0.3 && scopeN > 0.6 ? 10 : 0) +
      (innovationN > 0.7 && qualityN < 0.45 ? -8 : 0),
  );

  const engineeringComplexity = clamp(
    10 +
      scopeN * 36 +
      innovationN * 28 +
      teamN * 18 +
      qualityN * 8 +
      coordinationTax * 0.4,
  );

  const deliveryPredictability = clamp(
    78 -
      speedN * 28 -
      innovationN * 26 -
      scopeN * 12 -
      coordinationTax * 0.55 -
      brooksPenalty * 0.4 +
      qualityN * 12 -
      (teamN > 0.75 ? 8 : 0),
  );

  const customerSatisfaction = clamp(
    28 +
      productQuality * 0.42 +
      (1 - deliveryTimeline / 100) * 18 +
      (1 - technicalDebt / 100) * 12 +
      innovationN * qualityN * 14 -
      teamStress * 0.12 -
      (scopeN > 0.8 && productQuality < 50 ? 10 : 0),
  );

  const strategicConfidence = clamp(
    36 +
      deliveryPredictability * 0.28 +
      productQuality * 0.22 +
      (1 - technicalDebt / 100) * 16 -
      innovationN * 28 +
      (innovationN > 0.55 && qualityN > 0.5 ? 8 : 0) -
      teamStress * 0.1 +
      (scopeN < 0.45 && speedN > 0.55 ? 4 : 0),
  );

  return {
    deliveryTimeline,
    technicalDebt,
    teamStress,
    customerSatisfaction,
    strategicConfidence,
    productQuality,
    engineeringComplexity,
    deliveryPredictability,
  };
}

export type Commentary = {
  id: string;
  text: string;
};

/**
 * Pick commentary based on the current configuration.
 * Returns the strongest matching observations (ordered by relevance).
 */
export function getCommentary(
  inputs: SliderInputs,
  outputs: EngineOutputs,
): Commentary[] {
  const observations: Array<Commentary & { weight: number }> = [];

  const { scope, deliverySpeed, qualityBar, teamSize, innovation } = inputs;

  if (deliverySpeed > 70 && qualityBar < 45) {
    observations.push({
      id: "speed-debt",
      weight: 95,
      text: "You are optimizing heavily for speed. Teams often underestimate the technical debt created by aggressive timelines.",
    });
  }

  if (scope > 65 && qualityBar > 65 && teamSize < 45) {
    observations.push({
      id: "capacity-gap",
      weight: 92,
      text: "Your scope and quality expectations exceed the current team capacity.",
    });
  }

  if (teamSize > 70 && deliverySpeed > 60) {
    observations.push({
      id: "brooks",
      weight: 88,
      text: "Adding engineers may increase delivery capacity, but communication overhead grows as well — especially under launch pressure.",
    });
  }

  if (scope > 60 && deliverySpeed > 65 && qualityBar > 55) {
    observations.push({
      id: "iron-triangle",
      weight: 90,
      text: "If scope increases while timelines stay fixed, quality almost always suffers. Something has to give.",
    });
  }

  if (innovation > 75) {
    observations.push({
      id: "experiment",
      weight: 86,
      text: "Experimental products require stronger learning loops and faster feedback. Confidence comes from evidence, not ambition alone.",
    });
  }

  if (qualityBar > 75 && deliverySpeed < 45) {
    observations.push({
      id: "craft",
      weight: 72,
      text: "You are protecting craft. High quality with deliberate pace builds trust — but watch for opportunities delayed by perfectionism.",
    });
  }

  if (scope < 35 && innovation > 60) {
    observations.push({
      id: "focused-bet",
      weight: 74,
      text: "A narrow scope with high novelty is a classic discovery posture: learn fast without drowning the team in surface area.",
    });
  }

  if (outputs.technicalDebt > 70) {
    observations.push({
      id: "debt-high",
      weight: 80,
      text: "Technical debt is rising. Speed today is borrowing capacity from tomorrow's roadmap.",
    });
  }

  if (outputs.teamStress > 72) {
    observations.push({
      id: "stress-high",
      weight: 84,
      text: "Team stress is carrying more of the load. Ambition, capacity, and scope are out of balance.",
    });
  }

  if (outputs.deliveryPredictability < 35) {
    observations.push({
      id: "unpredictable",
      weight: 78,
      text: "Predictability is thin. The work may still be right — but commitments need more contingency.",
    });
  }

  if (
    qualityBar > 70 &&
    scope < 45 &&
    deliverySpeed < 55 &&
    innovation < 55
  ) {
    observations.push({
      id: "platform-health",
      weight: 70,
      text: "This configuration favors platform health and reliability over feature theater — a modernization mindset.",
    });
  }

  if (scope > 70 && teamSize > 65 && innovation < 40) {
    observations.push({
      id: "enterprise-shape",
      weight: 68,
      text: "Large scope with a large organization rewards clear ownership boundaries. Without them, coordination becomes the product.",
    });
  }

  if (observations.length === 0) {
    observations.push({
      id: "balanced",
      weight: 50,
      text: "You are holding a workable balance. The interesting decisions appear when one force — scope, speed, quality, or novelty — starts to dominate.",
    });
  }

  return observations
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map(({ id, text }) => ({ id, text }));
}

/**
 * Live tradeoff insight — describes the tension being held, not a grade.
 */
export function getCurrentTension(
  inputs: SliderInputs,
  outputs: EngineOutputs,
): Commentary {
  const { scope, deliverySpeed, qualityBar, teamSize, innovation } = inputs;
  const candidates: Array<Commentary & { weight: number }> = [];

  if (deliverySpeed > 65 && qualityBar < 50) {
    candidates.push({
      id: "speed-vs-maintainability",
      weight: 94,
      text: "You are prioritizing delivery speed over long-term maintainability.",
    });
  }

  if (scope > 60 && teamSize < 45) {
    candidates.push({
      id: "expectations-vs-capacity",
      weight: 92,
      text: "Customer expectations currently exceed team capacity.",
    });
  }

  if (qualityBar > 70 && innovation > 55) {
    candidates.push({
      id: "quality-vs-learning",
      weight: 88,
      text: "Your quality expectations may slow learning and experimentation.",
    });
  }

  if (innovation < 40 && qualityBar > 60 && deliverySpeed < 55) {
    candidates.push({
      id: "stability-over-innovation",
      weight: 86,
      text: "This configuration favors stability over innovation.",
    });
  }

  if (scope > 65 && outputs.deliveryPredictability < 50) {
    candidates.push({
      id: "scope-vs-predictability",
      weight: 90,
      text: "Your scope is growing faster than predictability.",
    });
  }

  if (innovation > 70 && outputs.strategicConfidence < 50) {
    candidates.push({
      id: "novelty-vs-confidence",
      weight: 87,
      text: "You are trading certainty for strategic upside and faster learning.",
    });
  }

  if (teamSize > 70 && deliverySpeed > 55) {
    candidates.push({
      id: "capacity-vs-coordination",
      weight: 84,
      text: "More capacity is available, but coordination cost rises with urgency.",
    });
  }

  if (qualityBar > 70 && deliverySpeed > 65) {
    candidates.push({
      id: "craft-vs-pace",
      weight: 85,
      text: "You are asking for high craft under high pace — something else usually absorbs the pressure.",
    });
  }

  if (scope < 40 && deliverySpeed > 60) {
    candidates.push({
      id: "focus-vs-breadth",
      weight: 76,
      text: "A narrower scope is buying speed — and leaving adjacent customer needs for later.",
    });
  }

  if (candidates.length === 0) {
    return {
      id: "held-in-balance",
      text: "No single force dominates yet. The interesting decisions appear when one priority starts to outweigh the others.",
    };
  }

  candidates.sort((a, b) => b.weight - a.weight);
  const top = candidates[0];
  return { id: top.id, text: top.text };
}

export function inputsEqual(a: SliderInputs, b: SliderInputs) {
  return SLIDER_DEFINITIONS.every(
    (slider) => Math.round(a[slider.id]) === Math.round(b[slider.id]),
  );
}

export function matchPreset(inputs: SliderInputs): PresetId | null {
  for (const preset of PRESETS) {
    if (inputsEqual(inputs, preset.inputs)) return preset.id;
  }
  return null;
}

export type SignalTone =
  | "calm"
  | "caution"
  | "stress"
  | "uncertain"
  | "debt"
  | "neutral";

/** Category color for a metric — fixed by family, not by “good” vs “bad.” */
export function categorySignal(definition: OutputDefinition): SignalTone {
  return definition.signal;
}

export const PRINCIPLE_TINT_VAR: Record<PrincipleTint, string> = {
  slate: "var(--signal-uncertain)",
  bronze: "var(--signal-debt)",
  rust: "var(--signal-stress)",
  teal: "var(--tint-teal)",
  forest: "var(--accent)",
};

export const PRESET_TINT_VAR: Record<PresetTint, string> = {
  amber: "var(--tint-amber)",
  navy: "var(--tint-navy)",
  teal: "var(--tint-teal)",
  burgundy: "var(--tint-burgundy)",
  steel: "var(--tint-steel)",
};
