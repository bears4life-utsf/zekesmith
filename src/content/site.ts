export const site = {
  name: "Zeke S. Smith",
  title: "Zeke S. Smith — Product tradeoffs, AI, and how software gets built",
  description:
    "After nearly three decades leading software teams, Zeke S. Smith explores the tradeoffs that shape products — and the systems, curiosity, and craft behind building software in an AI era.",
  url: "https://zekesmith.dev",
  email: "hello@zekesmith.com",
  nav: [
    { label: "Tradeoffs", href: "#tradeoffs" },
    { label: "Writing", href: "#writing" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
  ],
  hero: {
    masthead: {
      name: "Zeke S. Smith",
      roles: "VP of Product · Builder · Writer",
    },
    headline:
      "Exploring the decisions that shape software organizations.",
    supporting:
      "After nearly three decades leading software teams, I still spend my time thinking about the same questions: How do products succeed? Which tradeoffs matter? And how is AI changing the way software gets built?",
    credibility:
      "Product Systems • Leadership Tradeoffs • AI Experiments",
    exploring: {
      title: "Questions I'm Exploring",
      items: [
        {
          label: "How do product tradeoffs shape software?",
          href: "/?scenario=managing-growth#tradeoffs",
        },
        {
          label: "How is AI changing software development?",
          href: "#writing",
        },
        {
          label: "What makes teams effective?",
          href: "#product-operating-model",
        },
        {
          label: "How should humans and AI collaborate?",
          href: "#projects",
        },
        {
          label: "Why do some products succeed?",
          href: "#about",
        },
      ],
    },
  },
  writing: {
    aside:
      "A curated notebook — less announcement, more working through the argument.",
  },
  projects: {
    aside:
      "Side projects that keep curiosity honest about what is easy in theory and hard in practice.",
  },
  about: {
    title: "Why any of this matters",
    pullQuote:
      "Software is increasingly about systems, human behavior, and the quiet constraints that decide whether something succeeds.",
    paragraphs: [
      "I've spent nearly three decades leading software organizations — shaping strategy, working beside engineers and designers, and sitting with the decisions that never show up on a roadmap slide.",
      "I still build because curiosity is how I learn. Small experiments keep me honest about what is easy in theory and hard in practice. Writing helps me pressure-test the ideas that keep returning: systems, incentives, craft, and judgment.",
      "What fascinates me now is how AI is changing the economics of building products — not by removing tradeoffs, but by rearranging them.",
    ],
    interests: [
      "Product systems and tradeoffs",
      "AI-assisted software development",
      "Product operating models",
      "Modern UX and software craft",
      "Investing and markets",
      "Golf",
      "Music and guitar",
      "Building small software products",
    ],
  },
} as const;
