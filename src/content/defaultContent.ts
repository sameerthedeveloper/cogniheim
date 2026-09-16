export type CapabilityItem = { title: string; desc: string };
export type ProcessStep = { name: string; desc: string };

export type SiteContent = {
  brand: { name: string; tagline: string; category: string };
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    tag: string;
  };
  intro: { eyebrow: string; heading: string; body1: string; body2: string };
  capabilities: { eyebrow: string; items: CapabilityItem[] };
  process: { eyebrow: string; steps: ProcessStep[] };
  work: {
    eyebrow: string;
    title: string;
    desc: string;
    cta: string;
    initials: string;
  };
  philosophy: { eyebrow: string; heading: string; body: string };
  future: { eyebrow: string; heading: string; body: string };
  contact: { eyebrow: string; heading: string; sub: string; cta: string };
  footer: { copyright: string };
};

export const DEFAULT_CONTENT: SiteContent = {
  brand: {
    name: "COGNIHEIM",
    tagline: "World of Thinkers.",
    category: "Technology & Product Studio",
  },
  seo: {
    title: "Cogniheim — World of Thinkers | Technology & Product Studio",
    description:
      "Cogniheim is a technology and product studio that thinks, designs, and builds digital products, web apps, and SaaS software for businesses and people.",
  },
  hero: {
    eyebrow: "World of Thinkers",
    headline: "We think, design, and build products that matter.",
    sub: "We turn ideas, problems, and opportunities into thoughtful digital experiences and reliable software.",
    ctaPrimary: "Start a project",
    ctaSecondary: "Explore our work",
    tag: "Technology & Product Studio",
  },
  intro: {
    eyebrow: "Intro",
    heading: "Good software starts with good thinking.",
    body1:
      "Cogniheim is a technology and product studio built around a simple belief: the best digital products begin with understanding the problem before writing the code.",
    body2:
      "We combine product thinking, interface design, and engineering to create useful software for businesses and people.",
  },
  capabilities: {
    eyebrow: "Capabilities",
    items: [
      {
        title: "Digital Products",
        desc: "Websites, web applications, internal tools, and customer-facing platforms designed around real user needs.",
      },
      {
        title: "Product Design",
        desc: "Clear information architecture, refined interfaces, responsive systems, and interaction design.",
      },
      {
        title: "Software Engineering",
        desc: "Modern frontend and backend systems built for maintainability, performance, security, and growth.",
      },
      {
        title: "SaaS Development",
        desc: "From first prototype to production-ready software, we help turn validated ideas into products.",
      },
    ],
  },
  process: {
    eyebrow: "Process",
    steps: [
      { name: "Think", desc: "Understand the problem, users, constraints, and opportunity." },
      { name: "Design", desc: "Shape the experience, structure, and visual language." },
      { name: "Build", desc: "Engineer the product with clean, dependable technology." },
      { name: "Evolve", desc: "Measure, learn, refine, and keep making the product better." },
    ],
  },
  work: {
    eyebrow: "Selected Work",
    title: "CinemaFocus",
    desc: "A refined digital storefront and brand experience connecting premium audio, home cinema, products, and showroom discovery.",
    cta: "View case study",
    initials: "CF",
  },
  philosophy: {
    eyebrow: "Philosophy",
    heading: "Technology is the medium.\nThinking is the foundation.",
    body: "We don't build for the sake of building. We look for the clearest way to turn an idea into something useful.",
  },
  future: {
    eyebrow: "Product Studio",
    heading: "Ideas become products.",
    body: "Some of the problems we encounter deserve more than a one-off solution. Cogniheim explores, prototypes, and develops products of its own — with a long-term focus on useful software and SaaS.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Have a problem worth solving?",
    sub: "Tell us what you're trying to build, improve, or simplify.",
    cta: "Start a conversation",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Cogniheim. All rights reserved.`,
  },
};
