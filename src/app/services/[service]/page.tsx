import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import { getService, services } from "@/data/services";
import { breadcrumbSchema, SITE_URL, BUSINESS } from "@/lib/site";

type Props = { params: { service: string } };

// Previously this route synthesised a page for any URL string. Now only the
// four real services exist; everything else 404s.
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

        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
          <p className="text-xl leading-relaxed mb-12">{service.detail}</p>

          <h2 className="text-2xl font-bold font-heading text-foreground mb-6 border-b border-border pb-4">
            Approach &amp; Methodology
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {[
              "Architecture Planning & Blueprints",
              "Iterative Agile Development",
              "Automated CI/CD Workflows",
              "Production-grade Security Audits",
            ].map((item) => (
              <div key={item} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-violet-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-muted/30 border border-border rounded-2xl p-8 lg:p-12 mb-12 text-center">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
              Start your {service.title.toLowerCase()} project.
            </h2>
            <p className="mb-8">
              Discuss your requirements with a senior engineer — {BUSINESS.email}.
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
    </div>
  );
}
