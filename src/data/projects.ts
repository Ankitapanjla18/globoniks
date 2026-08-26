/**
 * Portfolio data.
 *
 * Rule for this file: every field is optional except the ones that describe
 * what the project is. If a fact is not known, the field is left out and the
 * page renders without it. Nothing here may be a plausible-sounding guess --
 * that is how the previous site ended up claiming four different projects had
 * identical four-month timelines.
 *
 * Case-study copy sources: the live sites themselves (features observed
 * directly), the archived site's own project descriptions, and facts stated
 * by the owner. No invented metrics, no invented client words.
 *
 * Imagery: product logos only, at the owner's direction (2026-08-27) -- the
 * live sites are under maintenance, so UI screenshots would go stale.
 * Missing fields per project are tracked in NEEDS-INPUT.md.
 */

export type ProjectClient =
  | { kind: "named"; name: string }
  /** Under NDA. Rendered as "Confidential - {industry}, {region}". */
  | { kind: "confidential"; industry: string; region: string };

/** Multi-paragraph sections render one <p> per array entry. */
export type Prose = string | string[];

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
  /** The product's own brand mark, served from public/logos/. */
  logo?: { src: string; alt: string };
  /** Longer opening paragraph for the case-study page. */
  overview?: string;
  /** Case-study body. Omitted sections are not rendered at all. */
  challenge?: Prose;
  approach?: Prose;
  outcome?: Prose;
  timeline?: string;
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
    logo: { src: "/logos/homekrafted.svg", alt: "Homekrafted logo" },
    overview:
      "Homekrafted brings independent home kitchens and makers onto a single storefront. Vendors keep their own identity and location on the platform, while customers browse by category or occasion, order gift hampers, subscribe to meal plans, or place corporate and bulk orders.",
    challenge: [
      "Home kitchens and independent makers had no storefront of their own. Food marketplaces are built for restaurants — commercial listings, commission structures and delivery assumptions that do not fit someone cooking from a home kitchen. And homemade food carries a constraint ordinary e-commerce ignores: it only travels as far as the kitchen can deliver, while handcrafted gifts can ship across the country.",
      "The platform had to hold both models at once — hyper-local, made-the-same-morning food and nationwide gift shipping — across many independent vendors, without burying any one of them.",
    ],
    approach: [
      "Homekrafted is a multi-vendor marketplace where each home kitchen and maker keeps its own name, location and catalogue. Customers browse by category or occasion, order gift hampers packed and priced by a single kitchen, subscribe to daily meal plans, or place corporate and bulk orders quoted by a person. A location picker keeps the food catalogue honest: it only shows food that can actually reach the customer, while gifts ship anywhere in India.",
      "The storefront is server-rendered and incrementally regenerated — category and product pages arrive as static HTML for search engines and stay fast under load while vendors update their listings. Ordering also runs over WhatsApp, where much of the customer base already is, and a companion mobile app is in final testing ahead of launch.",
    ],
    outcome:
      "Homekrafted is live at homekrafted.in and taking orders across Chandigarh, Mohali, Panchkula and Zirakpur, with independent vendors selling under their own names, gift shipping nationwide, and the mobile app nearing launch.",
  },
  {
    slug: "tricitymatch",
    title: "TricityMatch",
    summary:
      "A matrimonial platform for Chandigarh, Mohali and Panchkula, built around photo-verified and human-reviewed profiles.",
    stack: ["React", "Cloudflare"],
    stackVerified: true,
    liveUrl: "https://tricitymatch.com",
    logo: { src: "/logos/tricitymatch.svg", alt: "TricityMatch logo" },
    overview:
      "TricityMatch is a regional matrimonial platform focused on the Chandigarh, Mohali and Panchkula area. Its distinguishing feature is verification: profiles are photo-verified and reviewed by a person rather than published automatically. A companion mobile app is in final testing ahead of launch.",
    challenge:
      "Matrimonial platforms have a trust problem: unverified profiles, recycled photos, and members who may not be who they claim. For families in the Tricity, the national platforms add a second problem — matches scattered across the country, when what many families actually want is someone close enough to meet this week.",
    approach: [
      "TricityMatch treats verification as the product. Every profile earns its badge through a live selfie check matched by human review — no uploads, no shortcuts — and flagged profiles go to a safety team rather than an algorithm. Matching weighs values, lifestyle and family expectations alongside the usual criteria, and the platform deliberately serves only Chandigarh, Mohali and Panchkula.",
      "Privacy is engineered in rather than promised: conversations are encrypted in transit, phone numbers are never shared between members, and incognito browsing lets a member appear only to people they have already expressed interest in.",
    ],
    outcome:
      "TricityMatch is live at tricitymatch.com and accepting founding members, with the verification pipeline in operation and the companion mobile app nearing launch.",
  },
  {
    slug: "edumapping",
    title: "EduMapping",
    summary:
      "A placement management platform for colleges and universities, covering the full lifecycle from job posting through candidate selection.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    stackVerified: false,
    liveUrl: "https://edumapping.com",
    logo: { src: "/logos/edumapping.svg", alt: "EduMapping logo" },
    overview:
      "EduMapping connects students with employers through their institution. It handles job posting, candidate matching, interview scheduling and placement reporting in one system, so a placement cell can run a hiring cycle without spreadsheets.",
    challenge:
      "Campus placement mostly runs on spreadsheets, phone calls and notice boards. Placement cells juggle employer relationships by hand, students miss deadlines they never saw, and recruiters have no clean way to reach verified candidates across institutions — so every hiring season, the same coordination work starts again from zero.",
    approach: [
      "EduMapping puts the whole placement lifecycle into one system, with a portal for each side of the market. Placement cells manage employers, drives and candidate pipelines. Students hold verified profiles and resumes. Recruiters get a dedicated dashboard with real-time stats, filters by institution and geography, eligibility rules such as minimum CGPA, bulk application actions, and a pipeline view that tracks candidates from applied through screening, shortlist, interview and selection.",
      "The platform serves both colleges and schools, with employability workshops and career-guidance programmes running alongside the placement machinery — so institutions use it through the year, not only in hiring season.",
    ],
    outcome:
      "EduMapping is live at edumapping.com with a public demo, serving educational institutions with placement management and recruiter access.",
  },
  {
    slug: "tricity-life-insurance",
    title: "Tricity Life Insurance",
    summary:
      "A mentor-led recruitment platform for LIC insurance careers in the Chandigarh Tricity — guided application paths for agents, development officers and Bima Sakhi.",
    stack: ["Next.js", "React", "Nginx"],
    stackVerified: true,
    liveUrl: "https://www.tricitylifeinsurance.com",
    // Owner confirmed (2026-08-23): client verified, naming and linking allowed.
    client: { kind: "named", name: "Subhash Panjla — LIC Career Mentor" },
    overview:
      "Tricity Life Insurance guides people into LIC careers under a named mentor. The platform presents each career path — agent, development officer, and the women-first Bima Sakhi programme — with the guidance content up front and a WhatsApp-first application flow, meeting applicants where they already are.",
    challenge:
      "Insurance careers are usually found by word of mouth. A prospective LIC agent or Bima Sakhi has to know the right person, piece together the paths and paperwork, and decide — often with no structured guidance at all. The information exists but is scattered; the mentor exists, but only if you already know where to look.",
    approach: [
      "The platform puts a named mentor at the centre of the recruitment funnel. Each career path gets its own guided page — the story first, then the steps — including the women-first Bima Sakhi programme presented with a watch-the-story-before-you-decide flow. The application itself runs WhatsApp-first rather than behind a long form, keeping friction as low as the audience expects.",
      "The site is fully server-rendered: every career-path page arrives as complete HTML, which matters for a lead-generation platform that lives or dies on search visibility.",
    ],
    outcome:
      "The platform is live at tricitylifeinsurance.com with the guided career paths and WhatsApp application flow in operation.",
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
    challenge:
      "Pharmaceutical manufacturing cannot run on generic tooling. Every batch must be traceable end to end, quality control has to leave an audit trail rather than a checkbox, and production scheduling must respect compliance constraints that ordinary ERP systems treat as afterthoughts.",
    approach:
      "The system manages the complete order-to-delivery lifecycle — order placement, inventory, production scheduling, quality-control workflows, packaging and reporting — with batch tracking designed in from the schema up, so that a compliance review queries records instead of reconstructing them.",
    outcome:
      "Delivered as an enterprise system for a pharmaceutical manufacturer. The client is under confidentiality; scale and measured outcomes are published only with client sign-off.",
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
    challenge:
      "Direct sales organisations run on people and spreadsheets: leads tracked by hand, commissions computed at month-end with the disputes to match, and no shared picture of how agents or teams are actually performing.",
    approach:
      "A multi-tenant SaaS platform where each organisation operates in isolation on shared infrastructure: lead management, customer relationship tracking, automated commission calculation, performance reporting and team collaboration, with role-based access separating agents, team leads and administrators.",
    outcome:
      "Delivered as a multi-tenant platform for direct sales organisations. Client details are under confidentiality.",
  },
  {
    slug: "neet-college-predictor",
    title: "NEET College Predictor",
    summary:
      "An internal data-prediction tool that estimates medical college admission chances from previous years' NEET ranks and cutoffs.",
    // Internal tool (owner, 2026-08-23) -- deliberately no public URL.
    // Stack still pending; see NEEDS-INPUT.md.
    stack: [],
    stackVerified: false,
    overview:
      "A prediction tool for NEET aspirants: given a rank, it estimates realistic college options based on how previous years' ranks mapped to actual admissions. Built and used as an internal tool, so it is not publicly linked — it is the studio's first shipped data-prediction product and the base for its move into applied ML.",
    challenge:
      "A NEET rank tells a student where they stand — not where they can get in. The rank-to-college mapping shifts every year with cutoffs, categories and seat matrices, and most aspirants navigate it on rumour and coaching-centre folklore.",
    approach:
      "The predictor maps a rank against how previous years' ranks actually converted into admissions, producing a realistic set of college options rather than a wishlist.",
    outcome: "In internal use as a decision-support tool.",
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
