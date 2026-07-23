export type ArticleIllustration = "beyond-safe" | "product-operating-model";

export type Article = {
  id: string;
  title: string;
  teaser: string;
  readingTime: string;
  category: string;
  accent: string;
  illustration: ArticleIllustration;
  /** Tradeoff Model challenge slug — deep-links into a predefined mental model. */
  relatedScenarioSlug: string;
  relatedConcepts: readonly string[];
  status: "draft" | "published";
};

/** Curated homepage writing — essays that extend the Tradeoff Model. */
export const articles: Article[] = [
  {
    id: "beyond-safe",
    title: "When SAFe Stops Scaling",
    teaser:
      "Lessons from leading a product organization through the transition from centralized planning to empowered product teams.",
    readingTime: "12 min",
    category: "Product strategy",
    accent: "#4a6d8c",
    illustration: "beyond-safe",
    relatedScenarioSlug: "managing-dependencies",
    relatedConcepts: [
      "Organization Size",
      "Delivery Predictability",
      "Brooks's Law",
    ],
    status: "draft",
  },
  {
    id: "product-operating-model",
    title: "The product operating model actually works",
    teaser:
      "What changes when teams organize around outcomes, empowered decision-making, and continuous discovery instead of ceremony and handoffs.",
    readingTime: "7 min",
    category: "Organizations",
    accent: "#3d5a4c",
    illustration: "product-operating-model",
    relatedScenarioSlug: "managing-growth",
    relatedConcepts: [
      "Outcomes",
      "Strategic Confidence",
      "Customer Satisfaction",
      "Product Quality",
    ],
    status: "draft",
  },
];
