import { HeroSection } from "@/components/sections/HeroSection";
import { AudienceSplitSection } from "@/components/sections/AudienceSplitSection";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { MentorshipTeaser } from "@/components/sections/MentorshipTeaser";
import { SeoHead } from "@/components/seo/SeoHead";
import { StructuredData } from "@/components/seo/StructuredData";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "GLOBONIKS",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "361, Third Floor, Medallion 68, Sector 68",
      "addressLocality": "SAS Nagar",
      "addressRegion": "Punjab",
      "postalCode": "160062",
      "addressCountry": "IN"
    },
    "telephone": "+91-9988-909-556",
    "email": "info@globoniks.com",
    "url": "https://globoniks.com"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SeoHead 
        title="Globoniks | Elite MERN Stack Development"
        description="Premium MERN stack engineering and tech mentorship directly from experts in Punjab, India."
      />
      <StructuredData data={localBusinessSchema} />
      <HeroSection 
        headline="We build what others only pitch."
        subhead="MERN stack development & tech mentorship — Punjab, India."
        primaryCtaText="Start a project &rarr;"
        primaryCtaLink="/contact"
        secondaryCtaText="Join mentorship"
        secondaryCtaLink="/mentorship"
      />
      <AudienceSplitSection />
      <SocialProofBar />
      <FeaturedProjectsSection />
      <MentorshipTeaser />
    </div>
  );
}
