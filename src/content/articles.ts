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
    accent: "#38bdf8",
    visual: "linear-gradient(135deg, #0c1929 0%, #1e3a5f 40%, #0a1628 100%)",
    status: "draft",
  },
  {
    id: "product-operating-model",
    title: "The product operating model actually works",
    teaser:
      "What changes when teams organize around outcomes, empowered decision-making, and continuous discovery instead of ceremony and handoffs.",
    readingTime: "7 min",
    category: "Organizations",
    accent: "#2dd4bf",
    visual: "linear-gradient(145deg, #0a1614 0%, #134e4a 45%, #08201c 100%)",
    status: "draft",
  },
  {
    id: "ai-changing-software-development",
    title: "How AI is changing software development",
    teaser:
      "AI is rewriting the economics of building software — shrinking the distance between idea, prototype, and shipped product.",
    readingTime: "6 min",
    category: "AI",
    accent: "#a3e635",
    visual: "linear-gradient(150deg, #0f1a0a 0%, #365314 42%, #0c1408 100%)",
    status: "draft",
  },
  {
    id: "product-engineering-converging",
    title: "Why product and engineering are converging",
    teaser:
      "Modern tooling and AI are collapsing the old walls between product managers and developers — and that changes how great software gets made.",
    readingTime: "7 min",
    category: "Teams",
    accent: "#fbbf24",
    visual: "linear-gradient(140deg, #1a1408 0%, #854d0e 40%, #120e06 100%)",
    status: "draft",
  },
  {
    id: "building-without-being-an-engineer",
    title: "Building software without being an engineer",
    teaser:
      "What it means to stay deeply involved in crafting products when you lead through product, design, and systems thinking rather than production code.",
    readingTime: "6 min",
    category: "Craft",
    accent: "#fb7185",
    visual: "linear-gradient(135deg, #1a0c10 0%, #9f1239 38%, #12080c 100%)",
    status: "draft",
  },
];
