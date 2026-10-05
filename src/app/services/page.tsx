import type { Metadata } from "next";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Store, Layers, ShieldCheck, Smartphone, Wrench, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { services, roadmap } from "@/data/services";
import { capabilities } from "@/data/capabilities";
import { getProject } from "@/data/projects";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE_URL, pageMetadata, webPageSchema } from "@/lib/site";
import { PageHeader } from "@/components/ui/page";

const PAGE = {
  title: "Software development services — web and mobile",
  description:
    "Software development services backed by shipped work: marketplaces, SaaS platforms, operations & compliance systems, mobile apps and long-term support.",
  path: "/services/",
};

export const metadata: Metadata = pageMetadata(PAGE);

// Icons stay in the component so the data file remains serializable.
const icons: Record<string, React.ReactNode> = {
  "marketplace-platforms": <Store size={28} />,
  "saas-platforms": <Layers size={28} />,
  "operations-compliance": <ShieldCheck size={28} />,
  "mobile-apps": <Smartphone size={28} />,
  maintenance: <Wrench size={28} />,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <StructuredData
        data={webPageSchema({
          type: "CollectionPage",
          name: PAGE.title,
          ...PAGE,
          extra: {
            mainEntity: {
              "@type": "ItemList",
              itemListElement: services.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE_URL}/services/${s.slug}/`,
                name: s.title,
              })),
            },
          },
        })}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Services"
          title="We sell what we've"
          accent="already built."
          lead={
            <>
              Every service below cites a system we built — most of them live
              right now for you to open and judge. No capability slides, no
              hypotheticals.{" "}
              <Link href="/how-we-work/" className="text-violet-400 transition-colors hover:text-violet-300">
                See how a project runs.
              </Link>
            </>
          }
        />

        <h2 className="sr-only">What we build</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              icon={icons[service.slug]}
              title={service.title}
              description={service.description}
              slug={service.slug}
            />
          ))}
        </div>

        {/* Capabilities: a scannable list for prospects skimming the site.
            Framed explicitly as things we build, not case studies; items that
            have shipped link to the proof. Owner trims the list -- NEEDS-INPUT 2.6. */}
        <section aria-labelledby="capabilities" className="mt-24 max-w-5xl mx-auto">
          <h2
            id="capabilities"
            className="mb-4 text-center font-heading text-3xl leading-tight tracking-tight text-foreground md:text-4xl"
          >
            What we build — at a glance
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Capabilities, not case studies: the things we build into projects.
            Where we have already shipped one, it links to the proof.
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {capabilities.map((c) => {
              const proof = c.proofSlug ? getProject(c.proofSlug) : undefined;
              const cls =
                "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors";
              return (
                <li key={c.label}>
                  {proof ? (
                    <Link
                      href={`/projects/${proof.slug}/`}
                      className={`${cls} border-violet-500/30 bg-violet-500/5 text-foreground hover:border-violet-500/60`}
                      title={`Shipped in ${proof.title}`}
                    >
                      {c.label}
                      <span className="ml-2 text-xs text-violet-400">→ {proof.title}</span>
                    </Link>
                  ) : (
                    <span className={`${cls} border-border bg-muted/30 text-muted-foreground`}>
                      {c.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Future direction -- deliberately separate from the proof-led
            services above so unshipped work is never presented as a
            delivered capability. */}
        <section aria-labelledby="roadmap" className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              id="roadmap"
              className="mb-6 inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-violet-300"
            >
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              {roadmap.heading}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {roadmap.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.items.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-3xl border rule bg-card/60 p-6"
              >
                <span className="eyebrow-accent mb-3">
                  {item.status}
                </span>
                <h3 className="mb-3 font-heading text-2xl leading-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {item.description}
                </p>
                {"projectSlug" in item && item.projectSlug && (
                  <Link
                    href={`/projects/${item.projectSlug}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                  >
                    See the project
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
