import { HeroSection } from "@/components/sections/HeroSection";
import { AudienceSplitSection } from "@/components/sections/AudienceSplitSection";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ProductsStrip } from "@/components/sections/ProductsStrip";
import { MentorshipTeaser } from "@/components/sections/MentorshipTeaser";
import { StructuredData } from "@/components/seo/StructuredData";
import { organizationSchema } from "@/lib/site";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <StructuredData data={organizationSchema()} />
      <HeroSection 
        headline="We build what others only pitch."
        subhead="Marketplaces, SaaS platforms and business systems — web and mobile."
        primaryCtaText="Start a project &rarr;"
        primaryCtaLink="/contact"
        secondaryCtaText="Join mentorship"
        secondaryCtaLink="/mentorship"
      />
      <AudienceSplitSection />
      <SocialProofBar />
      <FeaturedProjectsSection />
      <ProductsStrip />
      <MentorshipTeaser />
    </div>
  );
}
