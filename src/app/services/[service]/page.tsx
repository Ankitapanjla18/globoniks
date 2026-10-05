import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import { getService, services } from "@/data/services";
import { getProject } from "@/data/projects";
import { WhiteLabelPill } from "@/components/cards/WhiteLabelPill";
import { breadcrumbSchema, pageMetadata, SITE_URL } from "@/lib/site";
import { CheckList, CtaPanel, PageHeader, SectionTitle } from "@/components/ui/page";

type Props = { params: { service: string } };

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const service = getService(params.service);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}/`,
  });
}

export default function ServiceDetail({ params }: Props) {
  const service = getService(params.service);
  if (!service) notFound();

  // Proof section pulls from the same data that drives the portfolio, so a
  // service can never cite work that is not on the work page.
  const proof = service.proofSlugs
    .map((slug) => getProject(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}/`,
    provider: { "@id": `${SITE_URL}/#organization` },
    serviceType: service.title,
    areaServed: { "@type": "Country", name: "India" },
    // The proof projects, as the works this service produced.
    ...(proof.length > 0
      ? {
          subjectOf: proof.map((p) => ({
            "@id": `${SITE_URL}/projects/${p.slug}/#work`,
          })),
        }
      : {}),
  };

  return (
    <div className="min-h-screen pb-24 pt-32 md:pt-40">
      <StructuredData data={serviceSchema} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          back={{ href: "/services/", label: "All services" }}
          eyebrow="Service"
          title={service.title}
          lead={service.detail}
        />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <section data-reveal="" aria-labelledby="built-for" className="lg:col-span-5">
            <SectionTitle eyebrow="Built for" id="built-for">
              Where this <span className="ink">fits.</span>
            </SectionTitle>
            <CheckList items={service.useCases} />
          </section>

          <section data-reveal="" aria-labelledby="receive" className="lg:col-span-7">
            <SectionTitle eyebrow="What you receive" id="receive">
              Delivered, <span className="ink">not described.</span>
            </SectionTitle>
            <ol className="divide-y divide-[hsl(var(--hairline))] border-y rule">
              {service.deliverables.map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 py-4">
                  <span className="w-6 shrink-0 font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-relaxed text-foreground">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {service.compliance && (
          <div data-reveal="" className="mt-14 flex items-start gap-4 rounded-3xl border rule bg-card/60 p-6 md:p-7">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <p className="text-[15px] leading-relaxed text-muted-foreground">{service.compliance}</p>
          </div>
        )}

        {proof.length > 0 && (
          <section data-reveal="" aria-labelledby="proof" className="mt-24">
            <SectionTitle eyebrow="Proof" id="proof">
              Work we can <span className="ink">show you.</span>
            </SectionTitle>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {proof.map((project) => {
                const host = project.liveUrl
                  ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
                  : null;
                return (
                  <article
                    key={project.slug}
                    className="group relative flex flex-col rounded-3xl border rule bg-card/60 p-7 transition-colors hover:border-violet-500/40"
                  >
                    <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {host ? (
                        <>
                          <span className="live-dot" aria-hidden="true" />
                          <span className="normal-case tracking-normal">{host}</span>
                        </>
                      ) : (
                        <span>Case study</span>
                      )}
                      {project.whiteLabel && <WhiteLabelPill stage={project.whiteLabel.stage} />}
                    </div>
                    <h3 className="font-heading text-3xl leading-[1.05] tracking-tight text-foreground">
                      <Link href={`/projects/${project.slug}/`} className="after:absolute after:inset-0 transition-colors group-hover:text-violet-300">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground md:text-[15px]">{project.summary}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t rule pt-4 text-sm">
                      <span className="inline-flex items-center font-medium text-foreground">
                        Case study<span className="sr-only">: {project.title}</span>
                        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 inline-flex items-center font-mono text-xs text-muted-foreground transition-colors hover:text-violet-300"
                        >
                          Open live
                          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <CtaPanel
          title="Have a project"
          accent="like this?"
          body="Describe it in a few lines. It lands directly with Ankita, the founder, and you hear back within one working day."
          secondary={{ href: "/how-we-work/", label: "How we work" }}
        />
      </div>
    </div>
  );
}
