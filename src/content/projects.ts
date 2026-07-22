export type ProjectStatus = "live" | "coming-soon";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  url?: string;
  status: ProjectStatus;
  accent: string;
  /** CSS gradient used for placeholder screenshots */
  visual: string;
};

export const projects: Project[] = [
  {
    id: "timeframe",
    title: "TimeFrame",
    description:
      "A tool for exploring historical events and understanding how moments in time connect across history.",
    category: "History / Learning",
    url: "https://bears4life-utsf.github.io/TimeFrame/",
    status: "live",
    accent: "#38bdf8",
    visual:
      "radial-gradient(ellipse at 20% 20%, rgba(56,189,248,0.45), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(14,165,233,0.25), transparent 50%), linear-gradient(145deg, #0c1929 0%, #132033 50%, #0a121c 100%)",
  },
  {
    id: "pokescout",
    title: "PokeScout",
    description:
      "A Pokémon companion app for searching, exploring matchups, and learning type effectiveness.",
    category: "Gaming / Side Project",
    url: "https://bears4life-utsf.github.io/pokescout/",
    status: "live",
    accent: "#fbbf24",
    visual:
      "radial-gradient(ellipse at 30% 10%, rgba(251,191,36,0.4), transparent 50%), radial-gradient(ellipse at 70% 90%, rgba(239,68,68,0.28), transparent 45%), linear-gradient(160deg, #1a1208 0%, #24180c 45%, #0f0c08 100%)",
  },
  {
    id: "closetcast",
    title: "ClosetCast",
    description:
      "An experiment in personal recommendations and decision support around clothing and style.",
    category: "Lifestyle / AI Experiment",
    url: "https://bears4life-utsf.github.io/ClosetCast/",
    status: "live",
    accent: "#2dd4bf",
    visual:
      "radial-gradient(ellipse at 15% 30%, rgba(45,212,191,0.35), transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(99,102,241,0.2), transparent 50%), linear-gradient(150deg, #0a1614 0%, #10201c 50%, #081210 100%)",
  },
  {
    id: "ai-experiments",
    title: "AI experiments",
    description:
      "A growing set of prototypes exploring agents, copilots, and new interfaces for building software.",
    category: "Coming soon",
    status: "coming-soon",
    accent: "#94a3b8",
    visual:
      "radial-gradient(ellipse at 40% 40%, rgba(148,163,184,0.22), transparent 60%), linear-gradient(160deg, #111114 0%, #18181b 100%)",
  },
  {
    id: "product-ideas",
    title: "Product ideas",
    description:
      "Early concepts and notes on tools that help product teams move faster with clearer intent.",
    category: "Coming soon",
    status: "coming-soon",
    accent: "#94a3b8",
    visual:
      "radial-gradient(ellipse at 60% 30%, rgba(148,163,184,0.18), transparent 55%), linear-gradient(140deg, #101012 0%, #16161a 100%)",
  },
];
