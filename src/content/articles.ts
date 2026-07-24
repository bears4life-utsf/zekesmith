export type ArticleStatus = "draft" | "published";

export type Article = {
  slug: string;
  title: string;
  category: string;
  description: string;
  readingTime: string;
  status: ArticleStatus;
  featured: boolean;
  relatedEssaySlugs: readonly string[];
  /** Short essay-specific note shown on the placeholder article page. */
  placeholderNote: string;
};

export type ContinueExploringItem = {
  slug: string;
  type: string;
  description: string;
};

/** Essays that extend the Tradeoff Model and Writing library. */
export const articles: Article[] = [
  {
    slug: "the-art-of-explaining-tradeoffs",
    title: "The Art of Explaining Tradeoffs",
    category: "Leadership Communication",
    description:
      "Leadership is not choosing the perfect answer. It is helping people understand why every meaningful decision costs something.",
    readingTime: "8 min",
    status: "draft",
    featured: true,
    relatedEssaySlugs: [
      "the-iron-triangle-still-wins",
      "why-more-people-often-slow-delivery",
      "ai-doesnt-eliminate-tradeoffs",
    ],
    placeholderNote:
      "It will look closely at how leaders frame constraints, make costs visible, and build support without pretending the hard parts disappear.",
  },
  {
    slug: "when-safe-stops-scaling",
    title: "When SAFe Stops Scaling",
    category: "Organizational Design",
    description:
      "How coordination gradually became more expensive than the value it created.",
    readingTime: "10 min",
    status: "draft",
    featured: false,
    relatedEssaySlugs: [
      "why-more-people-often-slow-delivery",
      "the-product-operating-model-actually-works",
      "the-art-of-explaining-tradeoffs",
    ],
    placeholderNote:
      "It will examine the moment a scaling framework stops clarifying work and starts protecting the coordination structure itself.",
  },
  {
    slug: "the-product-operating-model-actually-works",
    title: "The Product Operating Model Actually Works",
    category: "Product Leadership",
    description:
      "Why empowered teams outperform feature factories when leaders trust the system.",
    readingTime: "9 min",
    status: "draft",
    featured: false,
    relatedEssaySlugs: [
      "when-safe-stops-scaling",
      "the-art-of-explaining-tradeoffs",
      "ai-doesnt-eliminate-tradeoffs",
    ],
    placeholderNote:
      "It will focus on what changes when teams own outcomes end to end — and what leadership has to give up for that ownership to be real.",
  },
  {
    slug: "the-iron-triangle-still-wins",
    title: "The Iron Triangle Still Wins",
    category: "Leadership Foundations",
    description:
      "Why software leaders never escape the tradeoff between scope, speed, and quality.",
    readingTime: "7 min",
    status: "draft",
    featured: false,
    relatedEssaySlugs: [
      "the-art-of-explaining-tradeoffs",
      "why-more-people-often-slow-delivery",
      "ai-doesnt-eliminate-tradeoffs",
    ],
    placeholderNote:
      "It will return to the durable relationship between scope, speed, and quality — and why new methods rarely dissolve that triangle.",
  },
  {
    slug: "why-more-people-often-slow-delivery",
    title: "Why More People Often Slow Delivery",
    category: "Organizational Design",
    description:
      "A practical explanation of Brooks’s Law for modern software organizations.",
    readingTime: "7 min",
    status: "draft",
    featured: false,
    relatedEssaySlugs: [
      "when-safe-stops-scaling",
      "the-iron-triangle-still-wins",
      "the-product-operating-model-actually-works",
    ],
    placeholderNote:
      "It will show how added people can increase coordination cost faster than they increase delivery capacity — especially under unclear ownership.",
  },
  {
    slug: "ai-doesnt-eliminate-tradeoffs",
    title: "AI Doesn’t Eliminate Tradeoffs",
    category: "AI Leadership",
    description:
      "Artificial intelligence changes how we build software, but not the decisions leaders must make.",
    readingTime: "8 min",
    status: "draft",
    featured: false,
    relatedEssaySlugs: [
      "the-art-of-explaining-tradeoffs",
      "the-product-operating-model-actually-works",
      "the-iron-triangle-still-wins",
    ],
    placeholderNote:
      "It will argue that AI rearranges the economics of building software without removing the leadership judgments that still decide what ships.",
  },
];

/** Quiet pathway from the Tradeoff Model into the Writing library. */
export const continueExploring: ContinueExploringItem[] = [
  {
    slug: "the-iron-triangle-still-wins",
    type: "Leadership Foundation",
    description:
      "Every software organization eventually discovers the same three constraints.",
  },
  {
    slug: "why-more-people-often-slow-delivery",
    type: "Organizational Principle",
    description:
      "Why adding people often creates more coordination than capacity.",
  },
  {
    slug: "the-art-of-explaining-tradeoffs",
    type: "Leadership Communication",
    description:
      "Leadership isn't choosing perfect answers—it's helping others understand the cost of every decision.",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article): Article[] {
  return article.relatedEssaySlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((related): related is Article => Boolean(related));
}

export function articleHref(slug: string): string {
  return `/writing/${slug}`;
}

export const featuredArticle =
  articles.find((article) => article.featured) ?? articles[0];

export const supportingArticles = articles.filter((article) => !article.featured);
