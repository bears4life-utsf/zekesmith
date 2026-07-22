export type ProjectStatus = "live" | "coming-soon";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  url?: string;
  status: ProjectStatus;
  accent: string;
  /** Soft wash used for placeholder imagery */
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
    accent: "#4a6d8c",
    visual:
      "linear-gradient(145deg, #e8eef3 0%, #d5e0ea 45%, #c9d6e3 100%)",
  },
  {
    id: "pokescout",
    title: "PokeScout",
    description:
      "A Pokémon companion app for searching, exploring matchups, and learning type effectiveness.",
    category: "Gaming / Side Project",
    url: "https://bears4life-utsf.github.io/pokescout/",
    status: "live",
    accent: "#b08d3e",
    visual:
      "linear-gradient(150deg, #f3eee3 0%, #e8dcc4 50%, #ddcfae 100%)",
  },
  {
    id: "closetcast",
    title: "ClosetCast",
    description:
      "An experiment in personal recommendations and decision support around clothing and style.",
    category: "Lifestyle / AI Experiment",
    url: "https://bears4life-utsf.github.io/ClosetCast/",
    status: "live",
    accent: "#3d5a4c",
    visual:
      "linear-gradient(155deg, #e7efe9 0%, #d4e2d8 50%, #c5d6cb 100%)",
  },
];
