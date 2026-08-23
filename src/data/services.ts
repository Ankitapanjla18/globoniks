/**
 * Services, curated from the projects Globoniks has actually delivered.
 *
 * Positioning decision (owner, 2026-08-23): drop the stack-first "MERN"
 * framing entirely and present use-case-based services, each anchored to a
 * real project as proof. Buyers search for outcomes -- a marketplace, a SaaS
 * platform, a compliant operations system -- not acronyms.
 *
 * `proofSlugs` reference src/data/projects.ts; the service pages render the
 * live links and case studies from there, so proof cannot drift from the
 * portfolio.
 */

export type Service = {
  slug: string;
  title: string;
  /** Card + meta description source. */
  description: string;
  /** Lead paragraph on the detail page. */
  detail: string;
  /** The situations this service is for -- rendered as "Built for". */
  useCases: string[];
  /** What the client receives. */
  deliverables: string[];
  /** Slugs into src/data/projects.ts, rendered as the proof section. */
  proofSlugs: string[];
  /** Honest compliance note, only where the delivered work supports it. */
  compliance?: string;
};

export const services: Service[] = [
  {
    slug: "marketplace-platforms",
    title: "Marketplace & E-Commerce Platforms",
    description:
      "Multi-vendor marketplaces and e-commerce platforms: vendor onboarding, catalogues, commissions, payments and order flows — proven live on homekrafted.in.",
    detail:
      "We build marketplaces end to end: vendor onboarding and management, product catalogues, commission handling, payments, subscriptions and bulk-order flows. Homekrafted — our multi-vendor marketplace for home kitchens and makers — is live, server-rendered for search, and taking orders right now.",
    useCases: [
      "A multi-vendor marketplace connecting independent sellers to customers",
      "A direct-to-consumer storefront with subscriptions or meal plans",
      "Corporate and bulk-ordering flows on top of a consumer catalogue",
      "Conversational ordering over WhatsApp alongside the web store",
    ],
    deliverables: [
      "Vendor dashboards with catalogue, inventory and order management",
      "Commission and payout handling",
      "Search-engine-ready storefront (server-rendered, fast on mobile)",
      "Payment gateway integration and order lifecycle management",
    ],
    proofSlugs: ["homekrafted"],
  },
  {
    slug: "saas-platforms",
    title: "SaaS & Multi-Tenant Platforms",
    description:
      "Multi-tenant SaaS products and consumer platforms: roles and permissions, verification workflows, analytics and commission engines.",
    detail:
      "We design and build software-as-a-service products: multi-tenant architectures where many organisations share one platform safely, and consumer platforms where trust workflows — verification, human review, moderation — are the product. TricityMatch, our matrimonial platform built around photo-verified, human-reviewed profiles, is live.",
    useCases: [
      "A B2B tool serving many client organisations from one codebase",
      "A consumer platform where profile verification and trust are central",
      "Sales-team tooling: leads, pipelines, commissions, team reporting",
      "Usage analytics and role-based dashboards for every tenant",
    ],
    deliverables: [
      "Multi-tenant architecture with tenant isolation and role-based access",
      "Verification and human-review workflows",
      "Commission calculation and performance reporting engines",
      "Admin consoles and analytics dashboards",
    ],
    proofSlugs: ["tricitymatch", "saas-direct-sales"],
  },
  {
    slug: "operations-compliance",
    title: "Operations & Compliance Systems",
    description:
      "Order-to-delivery, inventory, production and placement management systems for organisations with regulatory and audit requirements.",
    detail:
      "For organisations whose software has to satisfy more than users — regulators, auditors, institutional processes. We have delivered an order-to-delivery platform for pharmaceutical manufacturing with batch tracking and quality-control workflows, and a placement management system that runs an institution's entire hiring cycle.",
    useCases: [
      "Supply-chain and production management in a regulated industry",
      "Batch tracking, quality control and audit trails as hard requirements",
      "Institutional process management — like campus placements end to end",
      "Replacing spreadsheet-driven operations with one accountable system",
    ],
    deliverables: [
      "Order, inventory and production-scheduling workflows",
      "Batch tracking and audit-trail design for compliance reviews",
      "Reporting built for regulators and auditors, not just managers",
      "Role-separated access reflecting real organisational responsibility",
    ],
    proofSlugs: ["pharma-supply", "edumapping"],
    compliance:
      "Compliance is treated as a build requirement, not an afterthought: batch tracking, audit trails and regulatory reporting are designed in from the schema up. Globoniks itself operates as a GST-registered company (GSTIN 03CZQPA4795R1ZJ).",
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps built with React Native — companion apps for our own live platforms are in final testing ahead of launch.",
    detail:
      "We build cross-platform mobile apps that share one codebase across Android and iOS without feeling generic. We are currently finishing our own: companion apps for TricityMatch and Homekrafted are in final testing ahead of launch — the same product thinking as the web platforms, built for the pocket.",
    useCases: [
      "A mobile companion to an existing web platform",
      "A consumer app that must ship on Android and iOS simultaneously",
      "App-store submission, review and release handled for you",
    ],
    deliverables: [
      "React Native application from one maintained codebase",
      "API design shared cleanly between web and mobile clients",
      "App store deployment for both Google Play and the App Store",
    ],
    proofSlugs: ["tricitymatch", "homekrafted"],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Long-Term Support",
    description:
      "Ongoing engineering for software in production: dependency and security updates, performance work, scaling and code audits.",
    detail:
      "Software is not finished at launch. We keep production systems healthy: dependency and security updates, performance work, infrastructure scaling and code audits — for platforms we built, and for codebases we inherit. Our own delivered platforms are live and stay live; that is the standard we maintain.",
    useCases: [
      "A live product that needs a responsible engineering owner",
      "An inherited codebase nobody on your team wants to touch",
      "Pre-investment or pre-acquisition technical audits",
    ],
    deliverables: [
      "Scheduled dependency, security and infrastructure updates",
      "Performance and scaling work with before/after measurements",
      "Written code-audit reports your team can act on",
    ],
    proofSlugs: ["homekrafted", "edumapping"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * Where the studio is headed. Deliberately a SEPARATE structure from
 * `services`: services are proof-led ("we sell what we've already shipped"),
 * and unshipped work must never be presented as a delivered capability.
 * These render under an explicit "Where we're headed" heading.
 */
export const roadmap = {
  heading: "Where we're headed",
  intro:
    "We are moving into applied machine learning and AI, with a clear build preference: automation for B2B — systems that remove manual work rather than add dashboards. The direction is grounded in work already shipped, and we label what is not shipped yet as exactly that.",
  items: [
    {
      title: "Applied ML & prediction products",
      status: "First product shipped",
      description:
        "Our NEET College Predictor estimates admission chances from previous years' rank-to-admission data — the studio's first data-prediction product and the base for deeper ML work.",
      projectSlug: "neet-college-predictor",
    },
    {
      title: "A marketing co-founder for businesses",
      status: "Next on the roadmap",
      description:
        "An automation tool that runs social media and digital marketing across multiple domains and businesses — the always-on marketing partner a small company cannot yet hire.",
    },
    {
      title: "B2B workflow automation",
      status: "Open for projects",
      description:
        "The same systems discipline behind our operations platforms, aimed at automating repetitive B2B workflows end to end. If your team does it by hand every week, it is a candidate.",
    },
  ],
} as const;
