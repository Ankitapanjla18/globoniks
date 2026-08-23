/**
 * Portfolio data.
 *
 * Rule for this file: every field is optional except the ones that describe
 * what the project is. If a fact is not known, the field is left out and the
 * page renders without it. Nothing here may be a plausible-sounding guess --
 * that is how the previous site ended up claiming four different projects had
 * identical four-month timelines.
 *
 * Missing fields per project are tracked in NEEDS-INPUT.md.
 */

export type ProjectClient =
  | { kind: "named"; name: string }
  /** Under NDA. Rendered as "Confidential - {industry}, {region}". */
  | { kind: "confidential"; industry: string; region: string };

export type Project = {
  slug: string;
  title: string;
  /** One or two sentences. Shown on the card and as the case-study lead. */
  summary: string;
  /** Shown on the card as tech pills, and in the case-study sidebar. */
  stack: string[];
  /**
   * False when the stack is carried over from the previous site and has not
   * been confirmed against the actual build. Drives a NEEDS-INPUT entry
   * rather than any user-facing text.
   */
  stackVerified: boolean;
  liveUrl?: string;
  client?: ProjectClient;
  /** Longer opening paragraph for the case-study page. */
  overview?: string;
  /** Case-study body. Omitted sections are not rendered at all. */
  challenge?: string;
  approach?: string;
  outcome?: string;
  timeline?: string;
  screenshots?: { src: string; alt: string }[];
  quote?: { text: string; name: string; role: string; company: string };
};

export const projects: Project[] = [
  {
    slug: "homekrafted",
    title: "Homekrafted",
    summary:
      "A multi-vendor marketplace for homemade food and handcrafted gifts, connecting home kitchens across Tricity with customers nationwide.",
    stack: ["Next.js", "React", "Nginx"],
    stackVerified: true,
    liveUrl: "https://homekrafted.in",
    overview:
      "Homekrafted brings independent home kitchens and makers onto a single storefront. Vendors keep their own identity and location on the platform, while customers browse by category or occasion, order gift hampers, subscribe to meal plans, or place corporate and bulk orders.",
    approach:
      "The storefront is server-rendered and incrementally regenerated, so category and product pages are delivered as static HTML and stay fast under load while remaining current as vendors update their listings. Ordering also runs over WhatsApp, which is where much of the customer base already is. A companion mobile app is in final testing ahead of launch.",
  },
  {
    slug: "tricitymatch",
    title: "TricityMatch",
    summary:
      "A matrimonial platform for Chandigarh, Mohali and Panchkula, built around photo-verified and human-reviewed profiles.",
    stack: ["React", "Cloudflare"],
    stackVerified: true,
    liveUrl: "https://tricitymatch.com",
    overview:
      "TricityMatch is a regional matrimonial platform focused on the Chandigarh, Mohali and Panchkula area. Its distinguishing feature is verification: profiles are photo-verified and reviewed by a person rather than published automatically. A companion mobile app is in final testing ahead of launch.",
  },
  {
    slug: "edumapping",
    title: "EduMapping",
    summary:
      "A placement management platform for colleges and universities, covering the full lifecycle from job posting through candidate selection.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    stackVerified: false,
    liveUrl: "https://edumapping.com",
    overview:
      "EduMapping connects students with employers through their institution. It handles job posting, candidate matching, interview scheduling and placement reporting in one system, so a placement cell can run a hiring cycle without spreadsheets.",
  },
  {
    slug: "tricity-life-insurance",
    title: "Tricity Life Insurance",
    summary:
      "A mentor-led recruitment platform for LIC insurance careers in the Chandigarh Tricity — guided application paths for agents, development officers and Bima Sakhi.",
    stack: ["Next.js", "React", "Nginx"],
    stackVerified: true,
    liveUrl: "https://www.tricitylifeinsurance.com",
    overview:
      "Tricity Life Insurance guides people into LIC careers under a named mentor. The platform presents each career path — agent, development officer, and the women-first Bima Sakhi programme — with the guidance content up front and a WhatsApp-first application flow, meeting applicants where they already are.",
    approach:
      "The site is fully server-rendered: every career path page arrives as complete HTML, which matters for a lead-generation platform that lives or dies on search visibility. Application friction is kept deliberately low with a WhatsApp-first flow rather than long forms.",
  },
  {
    slug: "pharma-supply",
    title: "Pharmaceutical Supply Chain",
    summary:
      "An order-to-delivery platform for pharmaceutical manufacturing, covering inventory, production scheduling, quality control and batch tracking.",
    stack: ["React Native", "Express", "MongoDB"],
    stackVerified: false,
    overview:
      "An enterprise system managing the full order-to-delivery lifecycle for a pharmaceutical manufacturer: order placement, inventory, production scheduling, quality control, packaging workflows and reporting, with the batch tracking that regulatory compliance requires.",
  },
  {
    slug: "saas-direct-sales",
    title: "Direct Sales Agent Management",
    summary:
      "A multi-tenant SaaS platform for direct sales organisations, handling lead management, commission calculation and team reporting.",
    stack: ["React", "Express", "AWS Lambda"],
    stackVerified: false,
    overview:
      "A cloud platform for direct sales organisations and independent agents. It covers lead management, customer relationship tracking, commission calculation, performance reporting and team collaboration across multiple tenants.",
  },
  {
    slug: "neet-college-predictor",
    title: "NEET College Predictor",
    summary:
      "A data-driven predictor that estimates medical college admission chances from previous years' NEET ranks and cutoffs.",
    // Stack and URL pending from the owner -- see NEEDS-INPUT.md.
    stack: [],
    stackVerified: false,
    overview:
      "A prediction tool for NEET aspirants: given a rank, it estimates realistic college options based on how previous years' ranks mapped to actual admissions. This is the studio's first shipped data-prediction product, and the base for its move into applied ML.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projects a prospect can click through to and verify for themselves. */
export const liveProjects = projects.filter((p) => p.liveUrl);

/** Renders a client as display text, or null when we cannot name one. */
export function clientLabel(client?: ProjectClient): string | null {
  if (!client) return null;
  return client.kind === "named"
    ? client.name
    : `Confidential — ${client.industry}, ${client.region}`;
}
