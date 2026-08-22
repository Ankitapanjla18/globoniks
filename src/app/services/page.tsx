import type { Metadata } from "next";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Store, Layers, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Use-case-based software services backed by shipped work: marketplaces, SaaS platforms, operations & compliance systems, mobile apps and long-term support.",
  alternates: { canonical: "/services" },
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
            slides, no hypotheticals.
          </p>
        </div>

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
      </div>
    </div>
  );
}
