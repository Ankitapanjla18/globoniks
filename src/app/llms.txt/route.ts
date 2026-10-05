import { BUSINESS, ISO, SERVICE_AREA, SITE_URL, TEAM } from "@/lib/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { tracks } from "@/data/mentorship";
import { offers } from "@/data/offers";

/**
 * /llms.txt -- a plain-text summary of the site for AI crawlers and answer
 * engines, following the llmstxt.org convention: a title, a one-paragraph
 * summary, then sections of "- [name](url): description" links.
 *
 * Honest status: this is an emerging convention, not a ranking signal, and
 * no major engine has committed to reading it. It costs nothing (generated
 * from the same data as the pages, so it cannot drift) and gives any agent
 * that does look a compact, accurate picture instead of a parsed homepage.
 * The HTML pages remain the source of truth; nothing appears here that is
 * not already on the site.
 */
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    `# ${BUSINESS.name}`,
    "",
    `> ${BUSINESS.legalName} is a software development company in ${BUSINESS.locality}, ${BUSINESS.region}, India, founded in ${BUSINESS.foundingYear}. It builds web applications, mobile apps, marketplaces, SaaS platforms and business systems for clients, offers white-label platforms of its own, and runs a tech mentorship programme. ${ISO.standard} certified (certificate ${ISO.certNumber}, ${ISO.registrar}).`,
    "",
    `Office: ${BUSINESS.streetAddress}, ${BUSINESS.locality}, ${BUSINESS.region} ${BUSINESS.postalCode}, India. Serves ${SERVICE_AREA.join(", ")} in person and clients across India and overseas remotely. Contact: ${BUSINESS.email}, ${BUSINESS.telephone}. Replies within one working day.`,
    "",
    `Team: ${TEAM.map((t) => `${t.name} (${t.role})`).join("; ")}.`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}/): ${s.description}`),
    "",
    "## Want something like one of our products?",
    "",
    ...offers.map((o) => `- [${o.title}](${SITE_URL}/build/${o.slug}/): ${o.description}`),
    "",
    "## Work",
    "",
    ...projects.map((p) => {
      const live = p.liveUrl ? ` Live at ${p.liveUrl}.` : "";
      const own = p.ownBrand ? " Globoniks' own brand." : "";
      const wl = p.whiteLabel
        ? p.whiteLabel.stage === "offered"
          ? ` Offered as a white-label platform for ${p.whiteLabel.audience}.`
          : ` White-label version for ${p.whiteLabel.audience} planned.`
        : "";
      return `- [${p.title}](${SITE_URL}/projects/${p.slug}/): ${p.summary}${own}${live}${wl}`;
    }),
    "",
    "## Mentorship",
    "",
    ...tracks.map((t) => `- [${t.title}](${SITE_URL}/mentorship/${t.slug}/): ${t.description} ${t.duration}.`),
    "",
    "## Company",
    "",
    `- [How we work](${SITE_URL}/how-we-work/): First conversation, two-week fixed-price discovery sprint, milestone builds with weekly demos, launch and handover, maintenance plans.`,
    `- [About](${SITE_URL}/about/): Founder-led studio; who runs what.`,
    `- [Contact](${SITE_URL}/contact/): Start a project.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
