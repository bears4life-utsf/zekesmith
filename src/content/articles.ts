export type Article = {
  id: string;
  title: string;
  teaser: string;
  readingTime: string;
  category: string;
  accent: string;
  visual: string;
  status: "draft" | "published";
};

export const articles: Article[] = [
  {
    id: "product-operating-models-after-safe",
    title: "Product operating models after SAFe",
    teaser:
      "How modern product organizations are shifting from large-scale planning frameworks toward empowered teams and outcome-driven execution.",
    readingTime: "8 min",
    category: "Product strategy",
    accent: "#38bdf8",
    visual:
      "linear-gradient(135deg, #0c1929 0%, #1e3a5f 40%, #0a1628 100%)",
    status: "draft",
  },
  {
    id: "product-engineering-line-disappearing",
    title: "The line between product and engineering is disappearing",
    teaser:
      "Why AI and modern tooling are creating tighter collaboration between product managers and developers.",
    readingTime: "7 min",
    category: "Teams",
    accent: "#2dd4bf",
    visual:
      "linear-gradient(145deg, #0a1614 0%, #134e4a 45%, #08201c 100%)",
    status: "draft",
  },
  {
    id: "why-ai-excites-me",
    title: "Why AI excites me as a software builder",
    teaser:
      "How AI changes the economics of software creation and enables individuals to build products that once required entire teams.",
    readingTime: "6 min",
    category: "AI",
    accent: "#a3e635",
    visual:
      "linear-gradient(150deg, #0f1a0a 0%, #365314 42%, #0c1408 100%)",
    status: "draft",
  },
  {
    id: "product-managers-need-technical-curiosity",
    title: "Product managers need technical curiosity",
    teaser:
      "Why understanding systems, APIs, data, and software architecture matters more than ever.",
    readingTime: "7 min",
    category: "Craft",
    accent: "#fbbf24",
    visual:
      "linear-gradient(140deg, #1a1408 0%, #854d0e 40%, #120e06 100%)",
    status: "draft",
  },
  {
    id: "hidden-cost-of-organizational-complexity",
    title: "The hidden cost of organizational complexity",
    teaser:
      "How process, governance, and handoffs silently slow product organizations.",
    readingTime: "9 min",
    category: "Organizations",
    accent: "#fb7185",
    visual:
      "linear-gradient(135deg, #1a0c10 0%, #9f1239 38%, #12080c 100%)",
    status: "draft",
  },
  {
    id: "great-software-feels-inevitable",
    title: "Great software feels inevitable",
    teaser:
      "Thoughts on UX, simplicity, and why the best products remove friction rather than add features.",
    readingTime: "5 min",
    category: "UX",
    accent: "#c4b5fd",
    visual:
      "linear-gradient(145deg, #120c1a 0%, #5b21b6 40%, #0c0814 100%)",
    status: "draft",
  },
];
