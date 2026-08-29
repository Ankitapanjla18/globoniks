/**
 * Capabilities: things the studio builds into projects, listed so a prospect
 * skimming the site gets a concrete picture fast.
 *
 * Framing rule: these are capabilities, NOT case studies. The section that
 * renders them says so explicitly. Where a capability has already shipped in
 * a portfolio project, `proofSlug` links to it; unlinked items are offers.
 * Drafted from shipped work plus the owner's examples (2026-08-29); the owner
 * trims or extends this list -- see NEEDS-INPUT 2.6.
 */

export type Capability = {
  label: string;
  /** Slug into src/data/projects.ts where this capability is already live. */
  proofSlug?: string;
};

export const capabilities: Capability[] = [
  { label: "WhatsApp ordering & notifications", proofSlug: "homekrafted" },
  { label: "WhatsApp-first lead capture", proofSlug: "tricity-life-insurance" },
  { label: "Chatbots & conversational assistants" },
  { label: "Multi-tenant SaaS platforms", proofSlug: "saas-direct-sales" },
  { label: "Role-based access & admin consoles", proofSlug: "globoniks-schools" },
  { label: "Payments & subscriptions", proofSlug: "homekrafted" },
  { label: "Verification & human-review workflows", proofSlug: "tricitymatch" },
  { label: "Batch tracking & audit trails", proofSlug: "pharma-supply" },
  { label: "Automated reporting & dashboards" },
  { label: "Installable web apps (PWA)", proofSlug: "globoniks-schools" },
  { label: "B2B workflow automation" },
  { label: "Data-prediction models", proofSlug: "neet-college-predictor" },
  { label: "Mobile apps (React Native)" },
  { label: "SEO-ready server-rendered storefronts", proofSlug: "homekrafted" },
];
