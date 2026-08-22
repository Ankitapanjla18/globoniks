import { ServiceCard } from "@/components/cards/ServiceCard";
import { LayoutTemplate, Smartphone, Code2, Wrench } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: <LayoutTemplate size={28} />,
      title: "MERN Stack Development",
      description: "End-to-end full-stack development using MongoDB, Express, React, and Node.js for high-performance enterprise applications.",
      slug: "mern-stack",
    },
    {
      icon: <Smartphone size={28} />,
      title: "Mobile App Development",
      description: "Cross-platform and native mobile solutions using React Native, designed for global reach and flawless user experience.",
      slug: "mobile-app",
    },
    {
      icon: <Code2 size={28} />,
      title: "Custom Software Architecture",
      description: "Complex system design, microservices, and specialized software tailored to the strict operational requirements of your business.",
      slug: "custom-software",
    },
    {
      icon: <Wrench size={28} />,
      title: "Maintenance & Support",
      description: "Dedicated engineering support, infrastructure scaling, and code auditing to keep your stack healthy and secure.",
      slug: "maintenance",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
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
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
