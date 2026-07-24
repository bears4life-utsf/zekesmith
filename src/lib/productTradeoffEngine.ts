/**
 * Product Tradeoff Model — interactive mental model
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
  | "managingGrowth"
  | "managingDependencies"
  | "modernizingLegacyPlatforms"
  | "managingCompliance"
  | "aiAdoption";

export type PresetTint =
  | "amber"
  | "navy"
  | "teal"
  | "burgundy"
  | "steel"
  | "forest"
  | "slate"
  | "bronze";

/** Challenge-framed guidance that surfaces when this leadership challenge is active. */
export type ChallengeGuidance = {
  /** Short lens shown above recommendations — the one core principle */
  lens: string;
  benefits: string[];
  costs: string[];
  organizationalEffects: string[];
  /** Reflection question shown in Questions to Consider */
  question: string;
};

export type Preset = {
  id: PresetId;
  /** URL slug for shareable challenge links (`?scenario=` query param) */
  slug: string;
  label: string;
  /** One-line chip hint */
  blurb: string;
  /** Why this challenge is difficult, why leaders struggle, and what the model explores */
  explanation: string;
  /** Tailored guidance for this leadership challenge */
  guidance: ChallengeGuidance;
  /** Decisions most relevant to this challenge — used for content weighting, not UI emphasis */
  emphasizedSliders: SliderId[];
  /**
   * Challenge-framed Understanding copy for key decisions.
   * Falls back to SLIDER_DEFINITIONS when a slider has no override.
   */
  sliderInsights?: Partial<Record<SliderId, SliderContext>>;
  tint: PresetTint;
  inputs: SliderInputs;
  /** Optional essay this challenge deep-links from */
  relatedEssayId?: string;
};

export type PrincipleTint = "slate" | "bronze" | "rust" | "teal" | "forest";

export type Principle = {
  id: string;
  title: string;
  /** One sentence capturing the core idea */
  core: string;
  /** 2–3 sentences: what it looks like in a real org */
  practicalExample: string;
  /** One sentence connecting back to the Product Tradeoff Model */
  whyItMatters: string;
  tint: PrincipleTint;
};

export type Reflection = {
  benefits: string[];
  costs: string[];
  organizationalEffects: string[];
  /** Primary leadership question — always present */
  question: string;
  /** Active leadership challenge label, when inputs match a challenge */
  challengeLabel?: string;
  /** Challenge-specific framing for the recommendations column */
  challengeLens?: string;
};

/**
 * Would an experienced VP of Product regularly think about this tradeoff?
 * Kept only the five that survive that test. Completeness is not the goal.
 */
export const SLIDER_DEFINITIONS: SliderDefinition[] = [
  {
    id: "scope",
    label: "Product Scope",
    left: "Focused",
    right: "Comprehensive",
    represents: "How much capability the product tries to provide",
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
        "If we cut product scope by a third, what would get better for the customer?",
    },
  },
  {
    id: "deliverySpeed",
    label: "Delivery Speed",
    left: "Measured",
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
    label: "Product Quality",
    left: "Functional",
    right: "Exceptional",
    represents:
      "How much craftsmanship, reliability, and UX polish you insist on",
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
    label: "Organization Size",
    left: "Small Team",
    right: "Large Organization",
    represents: "Capacity versus coordination cost",
    context: {
      whyLeadersIncrease: [
        "Add parallel capacity for a large surface area",
        "Cover specialized skills the current organization lacks",
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
    right: "Transformational",
    represents:
      "How ambitious a change the organization is willing to pursue",
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
    id: "managingGrowth",
    slug: "managing-growth",
    label: "Managing Growth",
    blurb:
      "Expanding products and organizations without letting coordination cost outrun focus.",
    explanation:
      "Growth looks like a capacity problem. It is usually a focus problem. Every expansion of product scope and organization size multiplies the number of decisions that must stay aligned.\n\nThis model explores the tension between expanding what you cover and keeping the organization able to decide.",
    guidance: {
      lens: "Growth multiplies coordination cost faster than it adds capacity — unless focus stays deliberately tight.",
      benefits: [
        "More room to cover demand without starving the core product",
      ],
      costs: [
        "Decision latency rising faster than headcount or scope can justify",
      ],
      organizationalEffects: [
        "Leaders feel pressure to hire or expand before they narrow what matters",
      ],
      question:
        "If we grew half as much this year, what would get sharper for customers?",
    },
    emphasizedSliders: ["scope", "teamSize", "deliverySpeed"],
    sliderInsights: {
      scope: {
        whyLeadersIncrease: [
          "Serve more segments without choosing which jobs matter most",
        ],
        whatOftenChanges: [
          "Focus thins — every team inherits a wider surface to keep coherent",
        ],
        leadershipQuestion:
          "What are we willing to stop covering so growth stays usable?",
      },
      teamSize: {
        whyLeadersIncrease: [
          "Match headcount to rising demand and specialized work",
        ],
        whatOftenChanges: [
          "More people create more paths that must agree before work moves",
        ],
        leadershipQuestion:
          "Are we adding people to create capacity — or to compensate for unclear focus?",
      },
      deliverySpeed: {
        whyLeadersIncrease: [
          "Prove growth is working by shipping expansion bets quickly",
        ],
        whatOftenChanges: [
          "Pace hides whether the organization can still decide cleanly",
        ],
        leadershipQuestion:
          "Is speed revealing focus — or papering over the cost of growth?",
      },
    },
    tint: "burgundy",
    relatedEssayId: "the-product-operating-model-actually-works",
    inputs: {
      scope: 68,
      deliverySpeed: 58,
      qualityBar: 52,
      teamSize: 74,
      innovation: 44,
    },
  },
  {
    id: "managingDependencies",
    slug: "managing-dependencies",
    label: "Managing Dependencies",
    blurb:
      "Reducing the conversations that must happen before work can move.",
    explanation:
      "Dependencies are conversations waiting to happen. Each one inserts another handoff, approval, or wait before work can proceed.\n\nThis model explores how product scope and organization size multiply those conversations — and how delivery speed collapses when they do.",
    guidance: {
      lens: "Every dependency introduces another conversation before work can move.",
      benefits: [
        "Fewer waits when work can finish without borrowing someone else's calendar",
      ],
      costs: [
        "Each new dependency adds another conversation that can stall progress",
      ],
      organizationalEffects: [
        "Delivery slows in the gaps between teams — not in the work itself",
      ],
      question:
        "Which dependency are we treating as inevitable that is really just another conversation?",
    },
    emphasizedSliders: ["scope", "teamSize", "deliverySpeed"],
    sliderInsights: {
      scope: {
        whyLeadersIncrease: [
          "Cover more capability — even when that means depending on more teams",
        ],
        whatOftenChanges: [
          "Broader scope creates more places where work must wait on someone else",
        ],
        leadershipQuestion:
          "How much of this scope only exists because another team must talk first?",
      },
      teamSize: {
        whyLeadersIncrease: [
          "Add teams to cover specialized work the product now requires",
        ],
        whatOftenChanges: [
          "More teams means more conversations between them before anything ships",
        ],
        leadershipQuestion:
          "Does a larger organization reduce waits — or multiply the conversations that cause them?",
      },
      deliverySpeed: {
        whyLeadersIncrease: [
          "Push for pace even when work still needs others to respond first",
        ],
        whatOftenChanges: [
          "Aggressive timelines collide with every conversation a dependency requires",
        ],
        leadershipQuestion:
          "Are we slow because we lack speed — or because work keeps waiting on a conversation?",
      },
    },
    tint: "navy",
    relatedEssayId: "when-safe-stops-scaling",
    inputs: {
      scope: 78,
      deliverySpeed: 30,
      qualityBar: 56,
      teamSize: 84,
      innovation: 26,
    },
  },
  {
    id: "modernizingLegacyPlatforms",
    slug: "modernizing-legacy-platforms",
    label: "Modernizing Legacy Platforms",
    blurb:
      "Rebuilding foundations while still delivering for customers — without pretending both are free.",
    explanation:
      "Legacy platforms tax every release. Modernizing them is real work — and it competes with the product customers can see. You cannot run the old system and build the new one as if delivery were unchanged.\n\nThis model explores the dual-running cost: scope deferred, quality protected, and ambition paid for in patience.",
    guidance: {
      lens: "You cannot modernize the platform and ship the product the same way at once.",
      benefits: [
        "Future delivery stops paying yesterday's platform tax",
      ],
      costs: [
        "Near-term customer scope gives way while two systems must be kept alive",
      ],
      organizationalEffects: [
        "Roadmaps split between visible features and invisible dual-running work",
      ],
      question:
        "What customer promise are we consciously deferring so modernization can finish?",
    },
    emphasizedSliders: ["scope", "qualityBar", "innovation"],
    sliderInsights: {
      scope: {
        whyLeadersIncrease: [
          "Keep shipping visible features so modernization does not look like pause",
        ],
        whatOftenChanges: [
          "Trying to modernize and expand scope at once stretches both thin",
        ],
        leadershipQuestion:
          "Which customer scope must wait so the platform can actually change?",
      },
      qualityBar: {
        whyLeadersIncrease: [
          "Protect reliability while old and new systems run side by side",
        ],
        whatOftenChanges: [
          "Dual-running raises the cost of every definition of done",
        ],
        leadershipQuestion:
          "Are we holding quality for customers — or using polish to avoid cutting scope?",
      },
      innovation: {
        whyLeadersIncrease: [
          "Treat platform change as a transformational bet, not a tidy refactor",
        ],
        whatOftenChanges: [
          "Ambition rises — and so does the uncertainty of running two worlds",
        ],
        leadershipQuestion:
          "Is this modernization transformational enough to justify dual-running — or just expensive churn?",
      },
    },
    tint: "steel",
    inputs: {
      scope: 28,
      deliverySpeed: 36,
      qualityBar: 82,
      teamSize: 54,
      innovation: 60,
    },
  },
  {
    id: "managingCompliance",
    slug: "managing-compliance",
    label: "Managing Compliance",
    blurb:
      "Treating assurance as a design constraint — not an afterthought bolted onto speed.",
    explanation:
      "Compliance is not a workstream beside the product. It reshapes what scope is allowed, how fast you can move, and how much novelty you can absorb.\n\nThis model explores assurance as a constraint: every other leadership decision is made inside it, whether leaders admit that or not.",
    guidance: {
      lens: "Compliance is a constraint that reshapes every other decision — not a checklist at the end.",
      benefits: [
        "Trust compounds when assurance is designed into the product from the start",
      ],
      costs: [
        "Speed and experimentation shrink wherever evidence and approval are required",
      ],
      organizationalEffects: [
        "Teams optimize for what can be shown as safe — sometimes before what helps customers",
      ],
      question:
        "Which controls protect customers — and which ones only slow decisions we already trust?",
    },
    emphasizedSliders: ["qualityBar", "deliverySpeed", "innovation"],
    sliderInsights: {
      qualityBar: {
        whyLeadersIncrease: [
          "Meet assurance bars that customers, regulators, and auditors will test",
        ],
        whatOftenChanges: [
          "Quality stops being polish and becomes the price of being allowed to ship",
        ],
        leadershipQuestion:
          "Is this bar protecting customers — or protecting us from deciding what 'good enough' means?",
      },
      deliverySpeed: {
        whyLeadersIncrease: [
          "Push pace as if compliance were something that can catch up later",
        ],
        whatOftenChanges: [
          "Aggressive speed either waits on assurance — or quietly skips it",
        ],
        leadershipQuestion:
          "Are we buying speed by deferring assurance we will still have to pay for?",
      },
      innovation: {
        whyLeadersIncrease: [
          "Pursue new capability while still operating inside regulated constraints",
        ],
        whatOftenChanges: [
          "Novelty and assurance compete for the same attention and evidence",
        ],
        leadershipQuestion:
          "What evidence would make this innovation compliant enough to try — not forever?",
      },
    },
    tint: "slate",
    inputs: {
      scope: 50,
      deliverySpeed: 26,
      qualityBar: 90,
      teamSize: 64,
      innovation: 28,
    },
  },
  {
    id: "aiAdoption",
    slug: "ai-adoption",
    label: "AI Adoption",
    blurb:
      "Raising learning speed without pretending uncertainty goes away.",
    explanation:
      "AI lets organizations learn and ship differently — and it raises uncertainty in the same motion. Ambition outruns readiness when leaders treat novelty as proof.\n\nThis model explores the twin rise of learning speed and uncertainty: how innovation, pace, and quality must stay honest with each other.",
    guidance: {
      lens: "AI raises learning speed and uncertainty together — ambition without readiness is just fashion.",
      benefits: [
        "Faster loops from idea to evidence when bets stay narrow enough to measure",
      ],
      costs: [
        "Confidence lags novelty until readiness and quality catch the ambition",
      ],
      organizationalEffects: [
        "Teams debate demos and possibility while evidence and operating habits lag",
      ],
      question:
        "What would we need to see before calling this adoption — not just an experiment?",
    },
    emphasizedSliders: ["innovation", "deliverySpeed", "qualityBar"],
    sliderInsights: {
      innovation: {
        whyLeadersIncrease: [
          "Open strategic upside before competitors define the new default",
        ],
        whatOftenChanges: [
          "Uncertainty rises in lockstep with how transformational the bet becomes",
        ],
        leadershipQuestion:
          "Is this ambition matched by readiness — or only by enthusiasm?",
      },
      deliverySpeed: {
        whyLeadersIncrease: [
          "Learn faster by shipping AI-assisted change on short cycles",
        ],
        whatOftenChanges: [
          "Pace amplifies learning — and amplifies mistakes the org cannot yet absorb",
        ],
        leadershipQuestion:
          "Are we moving fast to learn — or fast to look like we already know?",
      },
      qualityBar: {
        whyLeadersIncrease: [
          "Hold craft and reliability while AI changes how work gets done",
        ],
        whatOftenChanges: [
          "A low bar makes learning cheap; a high bar makes trust possible — rarely both at once",
        ],
        leadershipQuestion:
          "Where must quality stay non-negotiable even while we are still learning?",
      },
    },
    tint: "teal",
    inputs: {
      scope: 32,
      deliverySpeed: 74,
      qualityBar: 36,
      teamSize: 28,
      innovation: 92,
    },
  },
];

export const PRINCIPLES: Principle[] = [
  {
    id: "iron-triangle",
    title: "Iron Triangle",
    core: "You cannot maximize scope, speed, and quality at the same time.",
    practicalExample:
      "A team promises every feature, an aggressive deadline, and exceptional quality. As release day approaches, something has to give. The team either cuts features, delays the launch, or ships with more defects than planned.",
    whyItMatters:
      "Every leadership challenge in this model eventually forces you to decide which constraint you're willing to protect.",
    tint: "slate",
  },
  {
    id: "brooks-law",
    title: "Brooks's Law",
    core: "Adding people to a late project often makes it later.",
    practicalExample:
      "A release is slipping, so leadership adds two more engineers. The existing team spends weeks onboarding them, answering questions, and re-splitting the work. The deadline moves further out—not closer.",
    whyItMatters:
      "Organization Size in this model isn't free capacity—past a point it raises coordination cost and can slow delivery.",
    tint: "bronze",
  },
  {
    id: "conways-law",
    title: "Conway's Law",
    core: "Your product's shape will mirror how your teams communicate.",
    practicalExample:
      "Three teams own three parts of the same customer journey. Each ships on their own timeline with their own priorities. Customers feel the seams—inconsistent UX, awkward handoffs, and features that never quite connect.",
    whyItMatters:
      "When you change Organization Size or how work is structured, you're also shaping how the product itself will fit together.",
    tint: "teal",
  },
  {
    id: "goodharts-law",
    title: "Goodhart's Law",
    core: "When a measure becomes a target, it stops being a useful measure.",
    practicalExample:
      "Leadership tracks story points completed each sprint. Teams start optimizing for points instead of outcomes—splitting work into smaller tickets, avoiding hard problems, and reporting strong velocity while customer value stalls.",
    whyItMatters:
      "The outcomes in this model are signals to interpret, not targets to hit—optimizing one gauge in isolation usually distorts the others.",
    tint: "forest",
  },
  {
    id: "technical-debt",
    title: "Technical Debt",
    core: "Speed today can reduce velocity tomorrow.",
    practicalExample:
      "To hit a launch date, the team skips tests, hard-codes edge cases, and leaves \"temporary\" workarounds. Six months later, every feature takes twice as long because nobody wants to touch the fragile parts.",
    whyItMatters:
      "Delivery Speed and Product Quality trade against each other here—debt is the quiet cost of choosing speed without a plan to pay it back.",
    tint: "rust",
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
 *
 * Pass `challengeId` when a leadership challenge is selected so guidance
 * stays challenge-aware while leaders explore the sliders. Exact input
 * matches weight challenge copy more heavily; diverged exploration still
 * keeps the challenge lens, question, and a lighter guidance blend.
 */
export function getReflection(
  inputs: SliderInputs,
  outputs: EngineOutputs,
  challengeId?: PresetId | null,
): Reflection {
  const { scope, deliverySpeed, qualityBar, teamSize, innovation } = inputs;
  const matchedPresetId = matchPreset(inputs);
  const activeChallengeId = challengeId ?? matchedPresetId;
  const activeChallenge = activeChallengeId
    ? getPresetById(activeChallengeId)
    : undefined;
  const exactChallengeMatch =
    matchedPresetId != null && matchedPresetId === activeChallengeId;

  const benefits: WeightedItem[] = [];
  const costs: WeightedItem[] = [];
  const effects: WeightedItem[] = [];
  const questions: WeightedItem[] = [];

  if (activeChallenge) {
    const { guidance } = activeChallenge;
    const itemWeight = exactChallengeMatch ? 108 : 72;
    for (const text of guidance.benefits) {
      benefits.push({ weight: itemWeight, text });
    }
    for (const text of guidance.costs) {
      costs.push({ weight: itemWeight, text });
    }
    for (const text of guidance.organizationalEffects) {
      effects.push({ weight: itemWeight, text });
    }
    questions.push({
      weight: exactChallengeMatch ? 120 : 105,
      text: guidance.question,
    });
  }

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
      text: "Comprehensive product scope raising complexity and integration risk",
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
      text: "A small organization carrying ambitious product scope — overload is a design risk",
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

  // Challenge mode stays brief — one principle, a few reinforcing lines.
  const benefitLimit = activeChallenge ? 2 : 4;
  const costLimit = activeChallenge ? 2 : 4;
  const effectLimit = activeChallenge ? 2 : 3;

  return {
    benefits: topItems(benefits, benefitLimit),
    costs: topItems(costs, costLimit),
    organizationalEffects: topItems(effects, effectLimit),
    question: topItems(questions, 1)[0],
    ...(activeChallenge
      ? {
          challengeLabel: activeChallenge.label,
          challengeLens: activeChallenge.guidance.lens,
        }
      : {}),
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

/** Understanding-panel copy — challenge overrides when present. */
export function getSliderContext(
  sliderId: SliderId,
  challengeId?: PresetId | null,
): SliderContext {
  const base =
    SLIDER_DEFINITIONS.find((slider) => slider.id === sliderId)?.context ??
    SLIDER_DEFINITIONS[0].context;
  if (!challengeId) return base;
  const override = getPresetById(challengeId)?.sliderInsights?.[sliderId];
  return override ?? base;
}

/** Outside this band, a slider counts as a meaningful leadership decision. */
const MEANINGFUL_LOW = 30;
const MEANINGFUL_HIGH = 70;

/** Qualitative fragments for endpoint-leaning slider positions. */
const DECISION_FRAGMENTS: Record<
  SliderId,
  { low: string; high: string }
> = {
  scope: { low: "focused scope", high: "comprehensive scope" },
  deliverySpeed: { low: "measured delivery", high: "aggressive delivery" },
  qualityBar: { low: "functional quality", high: "exceptional quality" },
  teamSize: { low: "a small team", high: "a large organization" },
  innovation: {
    low: "incremental innovation",
    high: "transformational innovation",
  },
};

/**
 * Short editorial sentence explaining why the Tradeoffs column looks the
 * way it does — challenge label plus up to three endpoint-leaning decisions.
 * Explanatory only; does not affect weighting or reflection content.
 */
export function getTradeoffDecisionSummary(
  challenge: Preset | null | undefined,
  inputs: SliderInputs,
): string {
  const meaningful = SLIDER_DEFINITIONS.flatMap((slider) => {
    const value = inputs[slider.id];
    if (value > MEANINGFUL_LOW && value < MEANINGFUL_HIGH) return [];
    const fragment =
      value <= MEANINGFUL_LOW
        ? DECISION_FRAGMENTS[slider.id].low
        : DECISION_FRAGMENTS[slider.id].high;
    return [
      {
        id: slider.id,
        fragment,
        deviation: Math.abs(value - 50),
      },
    ];
  });

  const emphasized = challenge?.emphasizedSliders;
  meaningful.sort((a, b) => {
    if (emphasized?.length) {
      const aIdx = emphasized.indexOf(a.id);
      const bIdx = emphasized.indexOf(b.id);
      const aRank = aIdx === -1 ? Number.POSITIVE_INFINITY : aIdx;
      const bRank = bIdx === -1 ? Number.POSITIVE_INFINITY : bIdx;
      if (aRank !== bRank) return aRank - bRank;
    }
    return b.deviation - a.deviation;
  });

  const decisions = meaningful.slice(0, 3).map((item) => item.fragment);
  const label = challenge?.label;

  if (decisions.length === 0) {
    return label
      ? `These tradeoffs reflect your current ${label} decisions.`
      : "These tradeoffs reflect your current decisions.";
  }

  if (decisions.length === 1) {
    return label
      ? `These tradeoffs reflect ${label} with ${decisions[0]}.`
      : `These tradeoffs reflect ${decisions[0]}.`;
  }

  if (decisions.length === 2) {
    return label
      ? `These tradeoffs reflect ${label} with ${decisions[0]} and ${decisions[1]}.`
      : `These tradeoffs reflect ${decisions[0]} and ${decisions[1]}.`;
  }

  return label
    ? `These tradeoffs reflect ${label} with ${decisions[0]}, ${decisions[1]}, and ${decisions[2]}.`
    : `These tradeoffs reflect ${decisions[0]}, ${decisions[1]}, and ${decisions[2]}.`;
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
