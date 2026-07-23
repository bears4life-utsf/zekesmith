/**
 * Product Tradeoff Engine — interactive mental model
 *
 * This is not a calculator, prediction engine, or claim of universal truth.
 * It encodes how one experienced product leader reasons about the
 * leadership decisions that shape software products and organizations.
 *
 * Numeric relationships are intentionally approximate. They exist to make
 * tensions visible — not to score organizations or prescribe answers.
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

export type SliderContext = {
  whyLeadersIncrease: string[];
  whatOftenChanges: string[];
  leadershipQuestion: string;
};

export type SliderDefinition = {
  id: SliderId;
  label: string;
  left: string;
  right: string;
  represents: string;
  context: SliderContext;
};

export type PresetId =
  | "growthAtScale"
  | "enterpriseCoordination"
  | "empoweredProductTeams"
  | "aiTransformation"
  | "platformModernization"
  | "customerExpansion"
  | "regulatedEnterprise";

export type PresetTint =
  | "amber"
  | "navy"
  | "teal"
  | "burgundy"
  | "steel"
  | "forest"
  | "slate"
  | "bronze";

export type Preset = {
  id: PresetId;
  /** URL slug for shareable challenge links (`?scenario=` query param) */
  slug: string;
  label: string;
  /** One-line chip hint */
  blurb: string;
  /** Miniature case study — why these tradeoffs exist for this challenge */
  explanation: string;
  tint: PresetTint;
  inputs: SliderInputs;
  /** Optional essay this challenge deep-links from */
  relatedEssayId?: string;
};

export type PrincipleTint = "slate" | "bronze" | "rust" | "teal" | "forest";

export type Principle = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  tint: PrincipleTint;
};

export type Reflection = {
  benefits: string[];
  costs: string[];
  organizationalEffects: string[];
  /** Primary leadership question — always present */
  question: string;
};

/**
 * Would an experienced VP of Product regularly think about this tradeoff?
 * Kept only the five that survive that test. Completeness is not the goal.
 */
export const SLIDER_DEFINITIONS: SliderDefinition[] = [
  {
    id: "scope",
    label: "Scope",
    left: "Narrow",
    right: "Broad",
    represents: "How much surface area the product tries to cover",
    context: {
      whyLeadersIncrease: [
        "Cover more customer jobs in a single release",
        "Match competitor breadth or contractual commitments",
        "Give sales and stakeholders a larger story to tell",
      ],
      whatOftenChanges: [
        "Engineering complexity rises",
        "Ownership boundaries blur",
        "Delivery predictability thins",
      ],
      leadershipQuestion:
        "If we cut scope by a third, what would get better for the customer?",
    },
  },
  {
    id: "deliverySpeed",
    label: "Delivery Speed",
    left: "Deliberate",
    right: "Aggressive",
    represents: "How hard the organization presses for time-to-market",
    context: {
      whyLeadersIncrease: [
        "Respond faster to customers and competitors",
        "Validate ideas sooner",
        "Reduce time to market on a known bet",
      ],
      whatOftenChanges: [
        "Technical debt accumulates",
        "Predictability softens",
        "Engineering pressure rises",
      ],
      leadershipQuestion:
        "If we slowed down slightly, what would improve?",
    },
  },
  {
    id: "qualityBar",
    label: "Quality Bar",
    left: "Prototype",
    right: "Polished",
    represents: "How much craft, reliability, and UX finish you insist on",
    context: {
      whyLeadersIncrease: [
        "Protect trust in high-stakes or regulated contexts",
        "Reduce support load and operational risk",
        "Differentiate through craft and reliability",
      ],
      whatOftenChanges: [
        "Timelines extend",
        "Experimentation slows",
        "Teams debate definition of done more often",
      ],
      leadershipQuestion:
        "Are we polishing because customers need it — or because we are uncomfortable shipping?",
    },
  },
  {
    id: "teamSize",
    label: "Team Size",
    left: "Small team",
    right: "Large organization",
    represents: "Capacity versus coordination cost",
    context: {
      whyLeadersIncrease: [
        "Add parallel capacity for a large surface area",
        "Cover specialized skills the current team lacks",
        "Absorb growth without abandoning commitments",
      ],
      whatOftenChanges: [
        "Coordination overhead grows",
        "Decision latency increases",
        "Clear ownership becomes harder to maintain",
      ],
      leadershipQuestion:
        "Are we adding people because the work needs them — or because the system cannot decide?",
    },
  },
  {
    id: "innovation",
    label: "Innovation",
    left: "Incremental",
    right: "Experimental",
    represents: "How much novelty and uncertainty you deliberately take on",
    context: {
      whyLeadersIncrease: [
        "Open new strategic upside",
        "Learn where the market is moving",
        "Avoid optimizing a product that is quietly obsolete",
      ],
      whatOftenChanges: [
        "Certainty drops",
        "Delivery predictability weakens",
        "Learning loops become more important than plans",
      ],
      leadershipQuestion:
        "What evidence would make us more confident — and how quickly can we get it?",
    },
  },
];

export const DEFAULT_INPUTS: SliderInputs = {
  scope: 48,
  deliverySpeed: 45,
  qualityBar: 55,
  teamSize: 40,
  innovation: 42,
};

export const PRESETS: Preset[] = [
  {
    id: "growthAtScale",
    slug: "growth-at-scale",
    label: "Scaling the Organization",
    blurb:
      "Growing teams, products, and dependencies while maintaining speed, alignment, and effective decision-making.",
    explanation:
      "As organizations grow, capacity and surface area expand together. The tradeoff is that coordination and decision latency often become the real constraint—speed and alignment compete unless ownership stays clear.",
    tint: "burgundy",
    inputs: {
      scope: 70,
      deliverySpeed: 62,
      qualityBar: 55,
      teamSize: 72,
      innovation: 48,
    },
  },
  {
    id: "enterpriseCoordination",
    slug: "enterprise-coordination",
    label: "Coordinating Enterprise Delivery",
    blurb:
      "Aligning multiple teams, shared platforms, and complex dependencies without slowing execution.",
    explanation:
      "Aligning many teams and shared platforms improves predictability. The tradeoff is that planning and governance can slow local decision-making and execution—coordination becomes valuable until it costs more than it returns.",
    tint: "navy",
    relatedEssayId: "beyond-safe",
    inputs: {
      scope: 82,
      deliverySpeed: 34,
      qualityBar: 62,
      teamSize: 88,
      innovation: 28,
    },
  },
  {
    id: "empoweredProductTeams",
    slug: "empowered-product-teams",
    label: "Building Product Teams",
    blurb:
      "Strengthening product, engineering, and design partnerships while increasing ownership, accountability, and customer focus.",
    explanation:
      "Strengthening product, engineering, and design partnerships increases ownership and customer focus. The tradeoff is less centralized control—and the need to trust teams with real decisions while keeping accountability clear.",
    tint: "forest",
    relatedEssayId: "product-operating-model",
    inputs: {
      scope: 42,
      deliverySpeed: 58,
      qualityBar: 68,
      teamSize: 34,
      innovation: 62,
    },
  },
  {
    id: "aiTransformation",
    slug: "ai-transformation",
    label: "Adopting AI",
    blurb:
      "Integrating AI into products and ways of working while balancing innovation, governance, and organizational readiness.",
    explanation:
      "Integrating AI opens innovation and new ways of working. The tradeoff is balancing that upside with governance, readiness, and the uncertainty of unproven bets—confidence lags novelty until evidence catches up.",
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
    id: "platformModernization",
    slug: "platform-modernization",
    label: "Modernizing Legacy Platforms",
    blurb:
      "Improving aging technology, reducing technical debt, and evolving architecture without disrupting customer delivery.",
    explanation:
      "Improving aging platforms and reducing debt protects future velocity. The tradeoff is less visible customer scope now so architecture can evolve—without dressing infrastructure work up as a customer-facing release.",
    tint: "steel",
    inputs: {
      scope: 32,
      deliverySpeed: 42,
      qualityBar: 78,
      teamSize: 52,
      innovation: 48,
    },
  },
  {
    id: "customerExpansion",
    slug: "customer-expansion",
    label: "Growing the Business",
    blurb:
      "Expanding into new markets, customers, or products while maintaining focus, execution, and organizational alignment.",
    explanation:
      "Expanding into new markets or products stretches scope and ambition. The tradeoff is maintaining focus, execution quality, and organizational alignment while the surface area—and delivery pressure—grows.",
    tint: "forest",
    inputs: {
      scope: 62,
      deliverySpeed: 82,
      qualityBar: 58,
      teamSize: 48,
      innovation: 30,
    },
  },
  {
    id: "regulatedEnterprise",
    slug: "regulated-enterprise",
    label: "Operating in a Regulated Environment",
    blurb:
      "Balancing compliance, governance, and risk management while preserving speed, innovation, and customer responsiveness.",
    explanation:
      "Compliance and risk management protect trust. The tradeoff is preserving enough speed, innovation, and customer responsiveness that governance does not become the product—quality and predictability are constraints, not preferences.",
    tint: "slate",
    inputs: {
      scope: 55,
      deliverySpeed: 32,
      qualityBar: 88,
      teamSize: 65,
      innovation: 35,
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
 * Approximate relationships used only to surface tensions.
 * Not a scoring system for organizations.
 */
export function computeOutputs(inputs: SliderInputs): EngineOutputs {
  const { scope, deliverySpeed, qualityBar, teamSize, innovation } = inputs;

  const scopeN = scope / 100;
  const speedN = deliverySpeed / 100;
  const qualityN = qualityBar / 100;
  const teamN = teamSize / 100;
  const innovationN = innovation / 100;

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

type WeightedItem = { text: string; weight: number };

function topItems(items: WeightedItem[], limit: number): string[] {
  return [...items]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit)
    .map((item) => item.text);
}

/**
 * Qualitative reflection for the current configuration.
 * Numbers stay under the hood; leaders see tensions, not scores.
 */
export function getReflection(
  inputs: SliderInputs,
  outputs: EngineOutputs,
): Reflection {
  const { scope, deliverySpeed, qualityBar, teamSize, innovation } = inputs;

  const benefits: WeightedItem[] = [];
  const costs: WeightedItem[] = [];
  const effects: WeightedItem[] = [];
  const questions: WeightedItem[] = [];

  if (deliverySpeed > 60) {
    benefits.push({
      weight: deliverySpeed,
      text: "Faster feedback from customers and the market",
    });
    benefits.push({
      weight: deliverySpeed - 8,
      text: "Shorter cycles between idea and evidence",
    });
  }
  if (qualityBar > 60) {
    benefits.push({
      weight: qualityBar,
      text: "Stronger trust in reliability and craft",
    });
    benefits.push({
      weight: qualityBar - 10,
      text: "Lower operational and support risk over time",
    });
  }
  if (scope < 40) {
    benefits.push({
      weight: 100 - scope,
      text: "Clearer focus on the jobs that matter most",
    });
  }
  if (innovation > 60) {
    benefits.push({
      weight: innovation,
      text: "Room for strategic upside and new learning",
    });
  }
  if (teamSize > 55 && scope > 55) {
    benefits.push({
      weight: (teamSize + scope) / 2,
      text: "More parallel capacity across a wide surface area",
    });
  }
  if (deliverySpeed < 45 && qualityBar > 55) {
    benefits.push({
      weight: 70,
      text: "Space to make deliberate, durable decisions",
    });
  }
  if (outputs.customerSatisfaction > 55) {
    benefits.push({
      weight: outputs.customerSatisfaction,
      text: "A posture more likely to protect customer outcomes",
    });
  }
  if (benefits.length === 0) {
    benefits.push({
      weight: 40,
      text: "A workable balance — no single decision is dominating yet",
    });
  }

  if (deliverySpeed > 65 && qualityBar < 50) {
    costs.push({
      weight: 95,
      text: "Technical debt and quality pressure from aggressive pace",
    });
  }
  if (scope > 65) {
    costs.push({
      weight: scope,
      text: "Broader scope raising complexity and integration risk",
    });
  }
  if (innovation > 70) {
    costs.push({
      weight: innovation,
      text: "Lower near-term certainty while experiments run",
    });
  }
  if (teamSize > 65) {
    costs.push({
      weight: teamSize,
      text: "Coordination cost and decision latency as the organization grows",
    });
  }
  if (qualityBar > 75 && deliverySpeed > 60) {
    costs.push({
      weight: 88,
      text: "High craft under high pace — something else absorbs the pressure",
    });
  }
  if (outputs.technicalDebt > 60) {
    costs.push({
      weight: outputs.technicalDebt,
      text: "Rising debt that borrows capacity from future roadmaps",
    });
  }
  if (outputs.teamStress > 65) {
    costs.push({
      weight: outputs.teamStress,
      text: "Team stress carrying more of the load than the system admits",
    });
  }
  if (outputs.deliveryPredictability < 45) {
    costs.push({
      weight: 100 - outputs.deliveryPredictability,
      text: "Thin predictability around commitments and dates",
    });
  }
  if (costs.length === 0) {
    costs.push({
      weight: 40,
      text: "Few sharp costs yet — watch what happens when one priority dominates",
    });
  }

  if (teamSize > 70 && deliverySpeed > 55) {
    effects.push({
      weight: 90,
      text: "Meetings and dependency management may start to outpace building",
    });
  }
  if (scope > 70 && teamSize > 65) {
    effects.push({
      weight: 88,
      text: "Ownership boundaries matter more than raw headcount",
    });
  }
  if (deliverySpeed > 70 && qualityBar < 45) {
    effects.push({
      weight: 92,
      text: "Engineering may optimize for shipping over maintainability",
    });
  }
  if (innovation > 75) {
    effects.push({
      weight: 86,
      text: "Discovery and evidence become more important than detailed plans",
    });
  }
  if (qualityBar > 75 && deliverySpeed < 45) {
    effects.push({
      weight: 78,
      text: "Teams may slow to protect craft — useful until perfectionism sets in",
    });
  }
  if (scope < 35 && innovation > 60) {
    effects.push({
      weight: 80,
      text: "A classic discovery posture: learn fast without drowning in surface area",
    });
  }
  if (teamSize < 35 && scope > 60) {
    effects.push({
      weight: 91,
      text: "A small team carrying broad ambition — overload is a design risk",
    });
  }
  if (outputs.strategicConfidence < 45 && innovation > 60) {
    effects.push({
      weight: 75,
      text: "Leaders may feel strategically curious and operationally uncertain at once",
    });
  }
  if (effects.length === 0) {
    effects.push({
      weight: 40,
      text: "Behavior stays relatively balanced until one constraint starts to dominate",
    });
  }

  if (deliverySpeed > 70 && qualityBar < 50) {
    questions.push({
      weight: 96,
      text: "Is delivery speed actually the constraint — or is decision making?",
    });
  }
  if (teamSize > 70) {
    questions.push({
      weight: 94,
      text: "Would clearer ownership unlock more than additional people?",
    });
  }
  if (scope > 70) {
    questions.push({
      weight: 93,
      text: "What would we stop doing if customer outcomes were the only scoreboard?",
    });
  }
  if (innovation > 75) {
    questions.push({
      weight: 92,
      text: "What evidence would make this bet feel grounded rather than hopeful?",
    });
  }
  if (qualityBar > 80 && deliverySpeed < 40) {
    questions.push({
      weight: 88,
      text: "Are we protecting customers — or protecting ourselves from shipping?",
    });
  }
  if (scope > 60 && teamSize < 45) {
    questions.push({
      weight: 95,
      text: "Are expectations set by ambition, or by what this team can actually absorb?",
    });
  }
  if (outputs.technicalDebt > 70) {
    questions.push({
      weight: 90,
      text: "Whose future roadmap are we borrowing from to look fast today?",
    });
  }
  if (questions.length === 0) {
    questions.push({
      weight: 50,
      text: "If one of these decisions had to give, which would you choose — and why?",
    });
  }

  return {
    benefits: topItems(benefits, 4),
    costs: topItems(costs, 4),
    organizationalEffects: topItems(effects, 3),
    question: topItems(questions, 1)[0],
  };
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

export function getPresetById(id: PresetId): Preset | undefined {
  return PRESETS.find((preset) => preset.id === id);
}

export function getPresetBySlug(slug: string): Preset | undefined {
  return PRESETS.find((preset) => preset.slug === slug);
}

export function getPresetByEssayId(essayId: string): Preset | undefined {
  return PRESETS.find((preset) => preset.relatedEssayId === essayId);
}

/** Build a shareable homepage URL for a leadership challenge (`?scenario=` kept for stable links). */
export function scenarioHref(slug: string): string {
  return `/?scenario=${encodeURIComponent(slug)}#tradeoffs`;
}

/** Query param for deep-linking a challenge; name kept for existing share URLs. */
export const SCENARIO_QUERY_PARAM = "scenario";

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
  forest: "var(--accent)",
  slate: "var(--signal-uncertain)",
  bronze: "var(--signal-debt)",
};
