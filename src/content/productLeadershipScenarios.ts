export type ScenarioOptionId = "A" | "B" | "C";

export type ScenarioOption = {
  id: ScenarioOptionId;
  label: string;
  analysis: string;
  upside: string;
  risk: string;
};

export type ProductLeadershipScenario = {
  id: string;
  category: string;
  title: string;
  situation: string;
  options: ScenarioOption[];
  preferredOptionId: ScenarioOptionId;
  myApproach: string;
};

export const productLeadershipScenarios: ProductLeadershipScenario[] = [
  {
    id: "launch-date-at-risk",
    category: "Delivery and commitments",
    title: "The promised launch date is at risk",
    situation:
      "Sales has committed a major customer to a launch in six weeks. Engineering believes the product needs at least three additional months to meet the original scope and quality expectations. The customer is strategically important, but the team is already stretched.",
    options: [
      {
        id: "A",
        label:
          "Hold the original date and require the team to deliver the full scope.",
        analysis:
          "This protects the external commitment and may preserve short-term customer confidence, but it creates a high risk of quality problems, burnout, and missed expectations if the team cannot realistically deliver.",
        upside:
          "The customer receives what was promised on the original timeline.",
        risk: "The organization may trade trust and product quality for an unrealistic deadline.",
      },
      {
        id: "B",
        label: "Move the launch date and preserve the full scope.",
        analysis:
          "This protects quality and gives the team time to deliver the complete experience, but it may damage customer confidence and create commercial consequences.",
        upside:
          "The team can deliver a more complete and reliable product.",
        risk: "The customer may view the delay as a failure to honor the commitment.",
      },
      {
        id: "C",
        label:
          "Keep the date but narrow the release to the smallest valuable customer outcome.",
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
  },
  {
    id: "largest-customer-feature",
    category: "Customer requests",
    title: "Your largest customer wants a highly specific feature",
    situation:
      "Your largest customer requests a feature that would help their unique workflow. Sales believes it could protect significant revenue. Product discovery suggests that very few other customers have the same need.",
    options: [
      {
        id: "A",
        label: "Prioritize the feature because of the revenue at risk.",
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
        analysis:
          "This protects the product strategy and team focus, but it may underestimate the strategic importance of the customer or the possibility that the request reveals an emerging need.",
        upside:
          "The product remains focused on scalable market needs.",
        risk: "The organization may lose the customer or miss an important market signal.",
      },
      {
        id: "C",
        label:
          "Investigate the underlying problem and look for a scalable capability.",
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
  },
  {
    id: "ai-roadmap-pressure",
    category: "AI strategy",
    title: "Leadership wants AI added to the roadmap immediately",
    situation:
      "Executives want every product area to announce an AI initiative this quarter. Your team has several promising ideas, but customer research has not yet identified which one creates enough value to justify the investment.",
    options: [
      {
        id: "A",
        label:
          "Select the most visible AI concept and move directly into delivery.",
        analysis:
          "This demonstrates speed and may generate organizational excitement, but it risks creating a feature that looks impressive without solving a meaningful customer problem.",
        upside: "The organization can quickly show progress in AI.",
        risk: "The team may build technology in search of a problem.",
      },
      {
        id: "B",
        label: "Refuse to commit until discovery is complete.",
        analysis:
          "This protects product discipline, but it may appear overly cautious and can prevent the team from learning through experimentation.",
        upside:
          "Investment remains grounded in validated customer needs.",
        risk: "The organization may lose momentum while competitors continue experimenting.",
      },
      {
        id: "C",
        label:
          "Run a small, measurable experiment around the strongest customer problem.",
        analysis:
          "This allows the team to learn quickly without presenting an experiment as a finished strategy. Success criteria must be based on customer outcomes rather than novelty or usage alone.",
        upside: "The team builds evidence while maintaining momentum.",
        risk: "Stakeholders may expect production-level results from an intentionally limited experiment.",
      },
    ],
    preferredOptionId: "C",
    myApproach:
      "I would choose a narrow customer problem, define the decision or effort AI should reduce, and run a limited experiment with clear success criteria. AI should improve an outcome, not merely create a feature that can be labeled as AI.",
  },
  {
    id: "technical-debt-pause",
    category: "Product and engineering",
    title: "Engineering wants to pause feature work to address technical debt",
    situation:
      "Engineering recommends spending the next quarter modernizing part of the platform. Customers will not directly see most of the work. Product and sales are concerned that pausing visible improvements will slow growth.",
    options: [
      {
        id: "A",
        label: "Continue feature delivery and postpone the technical work.",
        analysis:
          "This preserves near-term roadmap momentum, but unresolved technical constraints may continue to reduce delivery speed and increase operational risk.",
        upside: "Customers continue receiving visible enhancements.",
        risk: "The platform becomes progressively harder and more expensive to change.",
      },
      {
        id: "B",
        label: "Pause feature development for the entire quarter.",
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
  },
  {
    id: "roadmap-without-outcomes",
    category: "Product operating model",
    title: "The roadmap is full, but customer outcomes are unclear",
    situation:
      "The organization has a detailed twelve-month roadmap with dozens of committed features. Teams are delivering regularly, but leaders cannot clearly explain which customer or business outcomes are improving.",
    options: [
      {
        id: "A",
        label: "Keep the roadmap and add more delivery metrics.",
        analysis:
          "This creates additional visibility into execution, but measuring more output does not necessarily reveal whether the work is producing value.",
        upside: "Leadership gains a clearer view of delivery performance.",
        risk: "The organization becomes more efficient at producing work without improving outcomes.",
      },
      {
        id: "B",
        label:
          "Replace the roadmap immediately with broad outcome statements.",
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
  },
];

export const simulatorClosing =
  "Good product leadership is rarely about finding a perfect answer. It is about making the tradeoffs visible, choosing intentionally, and learning quickly.";
