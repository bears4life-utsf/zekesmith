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
    id: "beyond-safe",
    title: "Why product teams are moving beyond SAFe",
    teaser:
      "Large-scale planning frameworks promised alignment. Many teams are discovering that speed, clarity, and ownership come from a different operating model.",
    readingTime: "8 min",
    category: "Product strategy",
    accent: "#4a6d8c",
    visual: "linear-gradient(135deg, #e9eef3 0%, #d7e1ea 100%)",
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
    visual: "linear-gradient(145deg, #e8efe9 0%, #d5e2d8 100%)",
    status: "draft",
  },
  {
    id: "ai-changing-software-development",
    title: "How AI is changing software development",
    teaser:
      "AI is rewriting the economics of building software — shrinking the distance between idea, prototype, and shipped product.",
    readingTime: "6 min",
    category: "AI",
    accent: "#5a6b52",
    visual: "linear-gradient(150deg, #ecefe6 0%, #dde4d2 100%)",
    status: "draft",
  },
  {
    id: "product-engineering-converging",
    title: "Why product and engineering are converging",
    teaser:
      "Modern tooling and AI are collapsing the old walls between product managers and developers — and that changes how great software gets made.",
    readingTime: "7 min",
    category: "Teams",
    accent: "#b08d3e",
    visual: "linear-gradient(140deg, #f3eee3 0%, #e6dcc6 100%)",
    status: "draft",
  },
  {
    id: "building-without-being-an-engineer",
    title: "Building software without being an engineer",
    teaser:
      "What it means to stay deeply involved in crafting products when you lead through product, design, and systems thinking rather than production code.",
    readingTime: "6 min",
    category: "Craft",
    accent: "#6b5e55",
    visual: "linear-gradient(135deg, #f0ebe6 0%, #e2d8d0 100%)",
    status: "draft",
  },
];
