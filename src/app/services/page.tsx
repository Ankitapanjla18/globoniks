import type { Metadata } from "next";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Store, Layers, ShieldCheck, Smartphone, Wrench, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { services, roadmap } from "@/data/services";
import { capabilities } from "@/data/capabilities";
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Use-case-based software services backed by shipped work: marketplaces, SaaS platforms, operations & compliance systems, mobile apps and long-term support.",
  alternates: { canonical: "/services/" },
};

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            We sell what we&apos;ve already <span className="text-violet-600">shipped.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Every service below is backed by a system we have delivered — most
            of them live right now for you to open and judge. No capability
            slides, no hypotheticals.{" "}
            <Link href="/how-we-work/" className="font-medium text-violet-500 hover:text-violet-400 transition-colors">
              See how a project runs.
            </Link>
          </p>
        </div>

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
            className="text-3xl font-heading font-bold text-foreground mb-4 text-center"
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
              className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-500 font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2" />
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
                className="bg-card border border-border rounded-2xl p-6 flex flex-col"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-500 mb-3">
                  {item.status}
                </span>
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {item.description}
                </p>
                {"projectSlug" in item && item.projectSlug && (
                  <Link
                    href={`/projects/${item.projectSlug}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-violet-500 hover:text-violet-400 transition-colors"
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
