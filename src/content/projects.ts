export type ProjectStatus = "live" | "coming-soon";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  url?: string;
  status: ProjectStatus;
  accent: string;
  image: string;
  imageAlt: string;
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
    image: "/images/projects/timeframe.jpg",
    imageAlt:
      "TimeFrame homepage with elegant gold typography, a year input set to 1776, and a Travel button",
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
    image: "/images/projects/pokescout.jpg",
    imageAlt:
      "PokeScout compare view showing Pikachu and Charizard with a base stats comparison chart",
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
    image: "/images/projects/closetcast.jpg",
    imageAlt:
      "ClosetCast today's outfit recommendation with dress, sneakers, and baseball cap selections",
  },
];
