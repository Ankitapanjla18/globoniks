import type { Metadata } from "next";
import Link from "next/link";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { StructuredData } from "@/components/seo/StructuredData";
import { ADDRESS_LINES, BUSINESS, ISO, SITE_URL, TEAM, pageMetadata, webPageSchema } from "@/lib/site";
import { CtaPanel, PageHeader, SectionTitle } from "@/components/ui/page";

const PAGE = {
  title: "About — a founder-led software studio in Mohali",
  description:
    "Globoniks Technologies Private Limited is a founder-led software studio in Mohali, Punjab, founded in 2024: web, mobile and custom software, and mentorship.",
  path: "/about/",
};

export const metadata: Metadata = pageMetadata(PAGE);

/*
 * The team grid used to render three placeholder cards -- "[Founder Name]",
 * and two "[Name]" entries with invented roles ("Head of Mobile Dev",
 * "Mentorship Director") that corresponded to nobody. Replaced with the real,
 * confirmed story: a deliberately small, founder-led studio. (Owner note
 * 2026-08-27: the earlier copy leaned too hard on the family angle; the
 * framing is now studio-first.)
 * 2026-10-02: incorporated as a private limited company; Kapila joins as
 * the second director. Photos and LinkedIn URLs still pending -- see
 * NEEDS-INPUT.md 1.2.
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen pb-0 pt-32 md:pt-40">
      <StructuredData
        data={webPageSchema({
          type: "AboutPage",
          name: PAGE.title,
          ...PAGE,
          extra: {
            mainEntity: { "@id": `${SITE_URL}/#organization` },
          },
        })}
      />
      <div className="container mx-auto mb-24 px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow={`About · ${BUSINESS.locality}, est. ${BUSINESS.foundingYear}`}
          title="Building software with"
          accent="conviction."
          lead="Globoniks was founded to build production systems businesses can run on — maintainable, documented and handed over properly — and to mentor the next generation of engineers."
        />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <section data-reveal="" aria-labelledby="the-studio" className="lg:col-span-7">
            <SectionTitle eyebrow="The studio" id="the-studio">
              Small <span className="ink">by design.</span>
            </SectionTitle>
            <div className="space-y-5 text-base leading-[1.75] text-muted-foreground md:text-[17px]">
              <p>
                Globoniks was founded in {BUSINESS.foundingYear} in Mohali,
                Punjab, and is now incorporated as {BUSINESS.legalName}.
                The studio is deliberately small, with clear ownership:
                Ankita runs every client relationship, Kapila runs
                operations, and Saksham Panjla leads development.
              </p>
              <p>
                That structure is the product. There is no account layer
                and no handoff chain — scope, architecture and delivery all
                answer to the people listed here, and the person you talk to
                sits at the same table as the person building your system.
              </p>
              <p>
                You can see what that produces —{" "}
                <Link href="/projects/" className="text-violet-400 transition-colors hover:text-violet-300">
                  the work page
                </Link>{" "}
                links to live products you can open and judge for yourself.
              </p>
            </div>
          </section>

          <aside data-reveal="" aria-label="The team" className="lg:col-span-5">
            <ul className="divide-y divide-[hsl(var(--hairline))] border-y rule">
              {TEAM.map((person) => (
                <li key={person.name} className="flex items-center gap-5 py-5">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 font-heading text-lg text-violet-300"
                  >
                    {person.initials}
                  </span>
                  <span>
                    <span className="block font-heading text-2xl leading-tight text-foreground">{person.name}</span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {person.role}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-8 divide-y divide-[hsl(var(--hairline))] text-sm">
              {[
                { k: "Company", v: BUSINESS.legalName },
                { k: "Office", v: ADDRESS_LINES.join(", ") },
                { k: ISO.standard, v: `Certificate ${ISO.certNumber}, ${ISO.registrar}` },
              ].map((row) => (
                <div key={row.k} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                  <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{row.k}</dt>
                  <dd className="text-foreground">{row.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>

      <WhyUsSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CtaPanel
          title="Talk to the people"
          accent="who build it."
          body="Ankita reads every message and replies within one working day."
          secondary={{ href: "/how-we-work/", label: "How we work" }}
        />
      </div>
    </div>
  );
}
