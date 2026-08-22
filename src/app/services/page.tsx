import type { Metadata } from "next";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { LayoutTemplate, Smartphone, Code2, Wrench } from "lucide-react";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web application development, mobile apps, custom software architecture and ongoing maintenance from Globoniks, a software studio in Mohali, Punjab.",
  alternates: { canonical: "/services" },
};

// Icons stay in the component so the data file remains serializable.
const icons: Record<string, React.ReactNode> = {
  "mern-stack": <LayoutTemplate size={28} />,
  "mobile-app": <Smartphone size={28} />,
  "custom-software": <Code2 size={28} />,
  maintenance: <Wrench size={28} />,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            Engineering excellence as a <span className="text-violet-600">service.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From architecture to deployment, we build scalable software systems that drive business growth. No bloated teams, just senior engineers delivering code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8">
          {services.map((service) => (
            <ServiceCard key={service.slug} icon={icons[service.slug]} title={service.title} description={service.description} slug={service.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}
