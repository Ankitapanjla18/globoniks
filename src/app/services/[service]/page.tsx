import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import { getService, services } from "@/data/services";
import { getProject } from "@/data/projects";
import { breadcrumbSchema, SITE_URL } from "@/lib/site";

type Props = { params: { service: string } };

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const service = getService(params.service);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Globoniks`,
      description: service.description,
      url: `/services/${service.slug}`,
    },
  };
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
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "IN",
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <StructuredData data={serviceSchema} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <nav aria-label="Breadcrumb">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all services
          </Link>
        </nav>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
          {service.title}
        </h1>

        <p className="text-xl leading-relaxed text-muted-foreground mb-12">
          {service.detail}
        </p>

        <h2 className="text-2xl font-bold font-heading text-foreground mb-6 border-b border-border pb-4">
          Built for
        </h2>
        <ul className="space-y-3 mb-12">
          {service.useCases.map((useCase) => (
            <li key={useCase} className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0 mt-1" />
              <span className="text-foreground">{useCase}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold font-heading text-foreground mb-6 border-b border-border pb-4">
          What you receive
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {service.deliverables.map((item) => (
            <div
              key={item}
              className="flex items-start bg-muted/20 p-4 rounded-lg border border-border"
            >
              <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-foreground">{item}</span>
            </div>
          ))}
        </div>

        {service.compliance && (
          <div className="flex items-start gap-4 bg-muted/20 border border-border rounded-2xl p-6 mb-12">
            <ShieldCheck className="w-6 h-6 text-violet-500 flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground leading-relaxed">
              {service.compliance}
            </p>
          </div>
        )}

        {proof.length > 0 && (
          <>
            <h2 className="text-2xl font-bold font-heading text-foreground mb-6 border-b border-border pb-4">
              Proof — work we can show you
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {proof.map((project) => {
                const host = project.liveUrl
                  ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
                  : null;
                return (
                  <div
                    key={project.slug}
                    className="bg-card border border-border rounded-2xl p-6 flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-heading font-bold text-lg text-foreground">
                        {project.title}
                      </h3>
                      {host && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-500">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                          />
                          Live
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-violet-500 hover:text-violet-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1.5" />
                          {host}
                        </a>
                      )}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center text-foreground hover:text-violet-400 transition-colors"
                      >
                        Case study
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="bg-muted/30 border border-border rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
            Have a project like this?
          </h2>
          <p className="text-muted-foreground mb-8">
            Describe it to us — your message lands directly with a founder.
          </p>
          <Link
            href="/contact"
            className="brand-cta px-8 py-4 rounded-full text-base font-semibold inline-flex"
          >
            Request a Technical Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
