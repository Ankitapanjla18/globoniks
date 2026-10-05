import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ProcessStrip } from "@/components/sections/ProcessStrip";
import { ProductsStrip } from "@/components/sections/ProductsStrip";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FoundersBand } from "@/components/sections/FoundersBand";
import { MentorshipTeaser } from "@/components/sections/MentorshipTeaser";

/*
 * Landing page (redesign 2026-10-04). The order is an argument:
 * claim + live proof (hero) -> what we build, each with proof -> the work,
 * open it -> how a project runs -> our own platforms -> client words (when
 * they exist) -> who you deal with -> mentorship. Organization and WebSite
 * schema come from the root layout.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <ServicesIndex />
      <FeaturedProjectsSection />
      <ProcessStrip />
      <ProductsStrip />
      <TestimonialsSection />
      <FoundersBand />
      <MentorshipTeaser />
    </div>
  );
}
