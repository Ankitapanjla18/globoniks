import { MentorshipTrackCard } from "@/components/cards/MentorshipTrackCard";

export default function MentorshipHub() {
  const tracks = [
    {
      title: "MERN Stack Mastery",
      duration: "12 Weeks (Part-time)",
      description: "Go beyond basic tutorials. Learn testing, advanced state management, component architecture, and CI/CD pipelines in a production environment.",
      slug: "mern-track",
      tags: ["React 18", "Next.js", "Node", "MongoDB", "Jest"],
    },
    {
      title: "Mobile Development",
      duration: "10 Weeks (Part-time)",
      description: "Build performant native-feeling apps. Master React Native CLI, complex animations, native modules, and app store deployment.",
      slug: "mobile-track",
      tags: ["React Native", "Expo", "Redux", "Swift/Java Basics"],
    },
    {
      title: "Leadership & Architecture",
      duration: "8 Weeks (Part-time)",
      description: "For mid-level engineers looking to step up. Learn system design, microservices, cloud infrastructure, and technical leadership.",
      slug: "leadership",
      tags: ["System Design", "AWS", "Docker", "Agile Management"],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-500 font-semibold mb-6">
            Intensive Developer Training
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            Elite Engineering <span className="text-amber-500">Mentorship.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Stop building trivial side projects. Join our rigorous mentorship cohorts and write production-grade code under the guidance of senior architects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {tracks.map((track) => (
            <MentorshipTrackCard key={track.slug} {...track} />
          ))}
        </div>

        <div className="mt-24 max-w-4xl mx-auto bg-muted/30 border border-border rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Pricing & Applications</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Due to the intensive 1-on-1 nature of our mentorship, cohorts are strictly limited to 10 developers at a time. Pricing details will be provided upon application review, as we offer income share agreements (ISA) and upfront payment tiers.
          </p>
          <div className="inline-flex items-center text-sm font-medium text-muted-foreground bg-background px-6 py-3 rounded-full border border-border shadow-sm">
            Current Acceptance Rate: 12%
          </div>
        </div>
      </div>
    </div>
  );
}
