export type ScenarioOptionId = "A" | "B" | "C";

export type ScenarioOption = {
  id: ScenarioOptionId;
  label: string;
  lens: string;
  analysis: string;
  upside: string;
  risk: string;
};

export type TradeoffSlider = {
  id: string;
  left: string;
  right: string;
  /** Default 0–100, 50 is balanced */
  defaultValue: number;
  commentary: {
    left: string;
    balanced: string;
    right: string;
  };
};

export type ThinkingPanel = {
  optimizeFor: string;
  concerns: string;
  keyPrinciple: string;
  commonMistake: string;
};

export type ProductLeadershipScenario = {
  id: string;
  /** Short label for the scenario selector */
  navLabel: string;
  category: string;
  title: string;
  situation: string;
  stakeholders: string[];
  constraints: string[];
  tradeoffs: TradeoffSlider[];
  options: ScenarioOption[];
  preferredOptionId: ScenarioOptionId;
  myApproach: string;
  thinking: ThinkingPanel;
};

export const productLeadershipScenarios: ProductLeadershipScenario[] = [
  {
    id: "launch-date-at-risk",
    navLabel: "Delivery & Commitments",
    category: "Delivery and commitments",
    title: "The promised launch date is at risk",
    situation:
      "Sales has committed a major customer to a launch in six weeks. Engineering believes the product needs at least three additional months to meet the original scope and quality expectations. The customer is strategically important, but the team is already stretched.",
    stakeholders: ["Sales", "Engineering", "Customer"],
    constraints: ["Six-week deadline", "Team capacity", "Product quality"],
    tradeoffs: [
      {
        id: "commitment-quality",
        left: "Customer commitment",
        right: "Product quality",
        defaultValue: 50,
        commentary: {
          left: "You are prioritizing short-term customer commitments.",
          balanced: "You are holding commitment and quality in tension.",
          right: "You are protecting quality even if the external promise shifts.",
        },
      },
      {
        id: "speed-health",
        left: "Short-term speed",
        right: "Long-term health",
        defaultValue: 50,
        commentary: {
          left: "You are optimizing for near-term delivery momentum.",
          balanced: "You are balancing speed with sustainability.",
          right: "You are optimizing for long-term product and team health.",
        },
      },
      {
        id: "capacity-scope",
        left: "Team capacity",
        right: "Scope",
        defaultValue: 50,
        commentary: {
          left: "You are protecting the team's ability to deliver well.",
          balanced: "You are negotiating capacity against desired scope.",
          right: "You are accepting delivery risk to preserve more of the original plan.",
        },
      },
    ],
    options: [
      {
        id: "A",
        label:
          "Hold the original date and require the team to deliver the full scope.",
        lens: "Fastest path",
        analysis:
          "This protects the external commitment and may preserve short-term customer confidence, but it creates a high risk of quality problems, burnout, and missed expectations if the team cannot realistically deliver.",
        upside:
          "The customer receives what was promised on the original timeline.",
        risk: "The organization may trade trust and product quality for an unrealistic deadline.",
      },
      {
        id: "B",
        label: "Move the launch date and preserve the full scope.",
        lens: "Lowest risk",
        analysis:
          "This protects quality and gives the team time to deliver the complete experience, but it may damage customer confidence and create commercial consequences.",
        upside: "The team can deliver a more complete and reliable product.",
        risk: "The customer may view the delay as a failure to honor the commitment.",
      },
      {
        id: "C",
        label:
          "Keep the date but narrow the release to the smallest valuable customer outcome.",
        lens: "Most customer-focused",
        analysis:
          "This preserves momentum while forcing the organization to separate the essential customer outcome from the original wish list. It requires transparent communication and disciplined scope decisions.",
        upside:
          "The customer receives meaningful value on time without forcing the team to deliver everything.",
        risk: "The reduced release may not satisfy the customer if expectations are not reset clearly.",
      },
    ],
    preferredOptionId: "C",
    myApproach:
      "I would first confirm the customer outcome behind the commitment, then reduce the release to the smallest experience that meaningfully delivers that outcome. I would communicate the revised scope directly and avoid pretending the full original plan is still achievable. The date, scope, and quality cannot all remain fixed when the underlying assumptions have changed.",
    thinking: {
      optimizeFor:
        "A credible customer outcome on a date the organization can stand behind.",
      concerns:
        "Silent scope inflation, quality erosion, and burning trust with both customers and the team.",
      keyPrinciple:
        "When assumptions change, at least one of date, scope, or quality must change with them.",
      commonMistake:
        "Teams try to protect the original promise by pretending the constraints have not changed.",
    },
  },
  {
    id: "largest-customer-feature",
    navLabel: "Customer Requests",
    category: "Customer requests",
    title: "Your largest customer wants a highly specific feature",
    situation:
      "Your largest customer requests a feature that would help their unique workflow. Sales believes it could protect significant revenue. Product discovery suggests that very few other customers have the same need.",
    stakeholders: ["Sales", "Product", "Largest customer"],
    constraints: ["Revenue risk", "Roadmap focus", "Long-term maintainability"],
    tradeoffs: [
      {
        id: "revenue-strategy",
        left: "Revenue protection",
        right: "Product strategy",
        defaultValue: 50,
        commentary: {
          left: "You are prioritizing protection of an important commercial relationship.",
          balanced: "You are weighing account risk against strategic focus.",
          right: "You are protecting the broader product direction over one account request.",
        },
      },
      {
        id: "custom-scale",
        left: "Customization",
        right: "Scalability",
        defaultValue: 50,
        commentary: {
          left: "You are leaning toward a solution tailored for one workflow.",
          balanced: "You are looking for a path that serves this need without becoming bespoke.",
          right: "You are optimizing for capabilities that can serve a larger market.",
        },
      },
      {
        id: "speed-discovery",
        left: "Immediate answer",
        right: "Deeper discovery",
        defaultValue: 55,
        commentary: {
          left: "You are favoring a fast commercial decision.",
          balanced: "You are balancing urgency with understanding the real problem.",
          right: "You are investing time to understand the underlying workflow before committing.",
        },
      },
    ],
    options: [
      {
        id: "A",
        label: "Prioritize the feature because of the revenue at risk.",
        lens: "Highest short-term cost",
        analysis:
          "This may protect an important account and strengthen the commercial relationship, but it can move the product toward custom development and create long-term maintenance costs.",
        upside:
          "The company may retain an important customer and associated revenue.",
        risk: "The broader roadmap becomes distorted by the needs of one account.",
      },
      {
        id: "B",
        label:
          "Decline the request because it does not represent the broader market.",
        lens: "Lowest risk",
        analysis:
          "This protects the product strategy and team focus, but it may underestimate the strategic importance of the customer or the possibility that the request reveals an emerging need.",
        upside: "The product remains focused on scalable market needs.",
        risk: "The organization may lose the customer or miss an important market signal.",
      },
      {
        id: "C",
        label:
          "Investigate the underlying problem and look for a scalable capability.",
        lens: "Most customer-focused",
        analysis:
          "This delays an immediate yes or no while the team determines whether the request can be reframed into a broader customer problem. It requires both discovery and honest commercial communication.",
        upside:
          "The company may solve the customer’s problem in a way that benefits a larger market.",
        risk: "The customer may become frustrated if discovery feels like avoidance.",
      },
    ],
    preferredOptionId: "C",
    myApproach:
      "I would not treat the requested feature as the problem definition. I would investigate the workflow, determine why the customer needs it, and test whether the underlying problem exists elsewhere. Large customers deserve serious attention, but they should not automatically become the product strategy.",
    thinking: {
      optimizeFor:
        "Solving a real customer problem in a way that strengthens, rather than fragments, the product.",
      concerns:
        "Becoming a custom shop for one account while missing the broader market signal.",
      keyPrinciple:
        "A feature request is a clue, not the requirements document.",
      commonMistake:
        "Teams treat the largest customer's requested solution as the product strategy by default.",
    },
  },
  {
    id: "ai-roadmap-pressure",
    navLabel: "AI Strategy",
    category: "AI strategy",
    title: "Leadership wants AI added to the roadmap immediately",
    situation:
      "Executives want every product area to announce an AI initiative this quarter. Your team has several promising ideas, but customer research has not yet identified which one creates enough value to justify the investment.",
    stakeholders: ["Executives", "Product", "Customers"],
    constraints: ["Quarterly optics", "Unvalidated ideas", "Investment discipline"],
    tradeoffs: [
      {
        id: "innovation-evidence",
        left: "Innovation",
        right: "Evidence",
        defaultValue: 50,
        commentary: {
          left: "You are prioritizing visible AI progress and experimentation energy.",
          balanced: "You are balancing novelty with validated customer need.",
          right: "You are requiring clearer evidence before committing major investment.",
        },
      },
      {
        id: "speed-confidence",
        left: "Speed",
        right: "Confidence",
        defaultValue: 50,
        commentary: {
          left: "You are moving quickly to show organizational momentum.",
          balanced: "You are seeking a path that learns quickly without overclaiming.",
          right: "You are accepting slower external progress to reduce the risk of building the wrong thing.",
        },
      },
      {
        id: "visibility-value",
        left: "Executive visibility",
        right: "Customer value",
        defaultValue: 55,
        commentary: {
          left: "You are responding strongly to internal pressure for an AI announcement.",
          balanced: "You are connecting internal narrative to an external outcome.",
          right: "You are anchoring the work in a customer problem rather than a label.",
        },
      },
    ],
    options: [
      {
        id: "A",
        label:
          "Select the most visible AI concept and move directly into delivery.",
        lens: "Fastest path",
        analysis:
          "This demonstrates speed and may generate organizational excitement, but it risks creating a feature that looks impressive without solving a meaningful customer problem.",
        upside: "The organization can quickly show progress in AI.",
        risk: "The team may build technology in search of a problem.",
      },
      {
        id: "B",
        label: "Refuse to commit until discovery is complete.",
        lens: "Lowest risk",
        analysis:
          "This protects product discipline, but it may appear overly cautious and can prevent the team from learning through experimentation.",
        upside: "Investment remains grounded in validated customer needs.",
        risk: "The organization may lose momentum while competitors continue experimenting.",
      },
      {
        id: "C",
        label:
          "Run a small, measurable experiment around the strongest customer problem.",
        lens: "Most customer-focused",
        analysis:
          "This allows the team to learn quickly without presenting an experiment as a finished strategy. Success criteria must be based on customer outcomes rather than novelty or usage alone.",
        upside: "The team builds evidence while maintaining momentum.",
        risk: "Stakeholders may expect production-level results from an intentionally limited experiment.",
      },
    ],
    preferredOptionId: "C",
    myApproach:
      "I would choose a narrow customer problem, define the decision or effort AI should reduce, and run a limited experiment with clear success criteria. AI should improve an outcome, not merely create a feature that can be labeled as AI.",
    thinking: {
      optimizeFor:
        "Learning whether AI improves a specific customer outcome before scaling the narrative.",
      concerns:
        "Shipping impressive technology that does not change a decision, cost, or experience that customers care about.",
      keyPrinciple:
        "AI should improve an outcome, not merely create a feature that can be labeled as AI.",
      commonMistake:
        "Teams start with the model or announcement and search backward for a justifying problem.",
    },
  },
  {
    id: "technical-debt-pause",
    navLabel: "Engineering Investment",
    category: "Product and engineering",
    title: "Engineering wants to pause feature work to address technical debt",
    situation:
      "Engineering recommends spending the next quarter modernizing part of the platform. Customers will not directly see most of the work. Product and sales are concerned that pausing visible improvements will slow growth.",
    stakeholders: ["Engineering", "Product", "Sales"],
    constraints: ["Visible roadmap", "Platform health", "Growth pressure"],
    tradeoffs: [
      {
        id: "feature-platform",
        left: "Feature delivery",
        right: "Platform investment",
        defaultValue: 50,
        commentary: {
          left: "You are prioritizing visible customer-facing progress.",
          balanced: "You are splitting attention between near-term value and platform health.",
          right: "You are prioritizing the foundation that makes future delivery possible.",
        },
      },
      {
        id: "immediate-future",
        left: "Immediate value",
        right: "Future flexibility",
        defaultValue: 50,
        commentary: {
          left: "You are optimizing for benefits customers can notice soon.",
          balanced: "You are balancing short-term demand with future optionality.",
          right: "You are investing in the ability to change the product more safely later.",
        },
      },
      {
        id: "growth-reliability",
        left: "Growth optics",
        right: "Reliability",
        defaultValue: 50,
        commentary: {
          left: "You are sensitive to the commercial cost of pausing visible work.",
          balanced: "You are looking for a credible link between technical work and business outcomes.",
          right: "You are accepting less visible progress to reduce operational and delivery risk.",
        },
      },
    ],
    options: [
      {
        id: "A",
        label: "Continue feature delivery and postpone the technical work.",
        lens: "Fastest path",
        analysis:
          "This preserves near-term roadmap momentum, but unresolved technical constraints may continue to reduce delivery speed and increase operational risk.",
        upside: "Customers continue receiving visible enhancements.",
        risk: "The platform becomes progressively harder and more expensive to change.",
      },
      {
        id: "B",
        label: "Pause feature development for the entire quarter.",
        lens: "Highest short-term cost",
        analysis:
          "This gives engineering concentrated time to improve the platform, but it may disconnect the investment from measurable customer or business outcomes.",
        upside:
          "The team may remove major technical constraints more quickly.",
        risk: "The business absorbs a large opportunity cost without clear evidence of the return.",
      },
      {
        id: "C",
        label:
          "Fund the technical work based on the customer and delivery outcomes it unlocks.",
        lens: "Most customer-focused",
        analysis:
          "This reframes technical debt as a product investment rather than an engineering side project. It may require sequencing work over multiple releases instead of using an all-or-nothing quarter.",
        upside:
          "Technical investment remains connected to reliability, speed, scalability, or customer value.",
        risk: "Splitting capacity may make the modernization effort take longer.",
      },
    ],
    preferredOptionId: "C",
    myApproach:
      "I would ask what the technical work enables or prevents: faster releases, fewer incidents, lower support costs, stronger security, or a critical future capability. Then I would fund it according to those outcomes. Technical health is part of the product, but the investment should still have a clear purpose.",
    thinking: {
      optimizeFor:
        "Technical investment that unlocks reliability, speed, or a capability the roadmap depends on.",
      concerns:
        "Either starving the platform or funding modernization without a clear product purpose.",
      keyPrinciple:
        "Technical health is part of the product — and still needs a clear investment thesis.",
      commonMistake:
        "Teams treat technical debt as an engineering concern instead of a product investment.",
    },
  },
  {
    id: "roadmap-without-outcomes",
    navLabel: "Operating Models",
    category: "Product operating model",
    title: "The roadmap is full, but customer outcomes are unclear",
    situation:
      "The organization has a detailed twelve-month roadmap with dozens of committed features. Teams are delivering regularly, but leaders cannot clearly explain which customer or business outcomes are improving.",
    stakeholders: ["Leadership", "Product teams", "Customers"],
    constraints: ["Committed features", "Unclear outcomes", "Delivery culture"],
    tradeoffs: [
      {
        id: "certainty-outcomes",
        left: "Execution certainty",
        right: "Customer outcomes",
        defaultValue: 50,
        commentary: {
          left: "You are prioritizing a clear, committed plan the organization can execute against.",
          balanced: "You are connecting delivery commitments to outcome evidence.",
          right: "You are prioritizing impact over the comfort of a filled feature inventory.",
        },
      },
      {
        id: "output-learning",
        left: "Output visibility",
        right: "Learning speed",
        defaultValue: 50,
        commentary: {
          left: "You are emphasizing delivery metrics and roadmap completeness.",
          balanced: "You want both visibility into work and clarity about what is changing for customers.",
          right: "You are emphasizing evidence, learning, and results over feature throughput.",
        },
      },
      {
        id: "continuity-change",
        left: "Organizational continuity",
        right: "Operating model change",
        defaultValue: 45,
        commentary: {
          left: "You are protecting enough stability for teams to keep shipping.",
          balanced: "You are shifting toward outcomes without discarding all delivery context.",
          right: "You are pushing for a clearer break from feature-led planning.",
        },
      },
    ],
    options: [
      {
        id: "A",
        label: "Keep the roadmap and add more delivery metrics.",
        lens: "Fastest path",
        analysis:
          "This creates additional visibility into execution, but measuring more output does not necessarily reveal whether the work is producing value.",
        upside: "Leadership gains a clearer view of delivery performance.",
        risk: "The organization becomes more efficient at producing work without improving outcomes.",
      },
      {
        id: "B",
        label:
          "Replace the roadmap immediately with broad outcome statements.",
        lens: "Highest short-term cost",
        analysis:
          "This signals a major change in philosophy, but removing delivery context too quickly may create confusion and reduce confidence across the organization.",
        upside:
          "Teams are encouraged to focus on customer and business impact.",
        risk: "The new model may feel vague or disconnected from execution.",
      },
      {
        id: "C",
        label:
          "Connect major initiatives to explicit outcomes and progressively remove unsupported commitments.",
        lens: "Most customer-focused",
        analysis:
          "This preserves enough continuity for the organization to operate while shifting planning conversations toward evidence, learning, and results.",
        upside:
          "The roadmap evolves from a feature inventory into a strategic decision tool.",
        risk: "The transition requires leadership discipline and may expose commitments that no longer have a strong rationale.",
      },
    ],
    preferredOptionId: "C",
    myApproach:
      "I would not replace one rigid framework with another overnight. I would require each major initiative to identify the customer problem, intended outcome, evidence, and measure of success. Commitments without a credible connection to an outcome should be challenged over time.",
    thinking: {
      optimizeFor:
        "A roadmap that makes outcomes, evidence, and tradeoffs visible — not just a list of features.",
      concerns:
        "Becoming highly efficient at shipping work that does not improve anything that matters.",
      keyPrinciple:
        "If a commitment cannot name the outcome it serves, it should be challenged.",
      commonMistake:
        "Organizations add more delivery metrics when the real problem is unclear customer impact.",
    },
  },
];
