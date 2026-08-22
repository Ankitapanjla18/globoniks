import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            Building software with <span className="text-violet-600">conviction.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Globoniks was founded on a simple premise: most software agencies produce unmaintainable code. We exist to provide enterprise-grade MERN stack engineering and elite mentorship to shape the next generation of architects.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Meet the Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {/* The founder placeholder as requested */}
            <TeamMemberCard 
              name="[Founder Name]"
              role="Founder & Lead Architect"
              photoPlaceholder={true}
              linkedInUrl="#"
            />
            {/* Additional placeholders for realistic agency look */}
            <TeamMemberCard 
              name="[Name]"
              role="Head of Mobile Dev"
              photoPlaceholder={true}
              linkedInUrl="#"
            />
            <TeamMemberCard 
              name="[Name]"
              role="Mentorship Director"
              photoPlaceholder={true}
              linkedInUrl="#"
            />
          </div>
        </div>
      </div>

      {/* Inserted the Why Choose Us section only here, as requested */}
      <WhyUsSection />
    </div>
  );
}
