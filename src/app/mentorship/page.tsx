import type { Metadata } from "next";
import { MentorshipTrackCard } from "@/components/cards/MentorshipTrackCard";
import { tracks } from "@/data/mentorship";

export const metadata: Metadata = {
  title: "Tech Mentorship",
  description:
    "Mentor-led engineering tracks in full-stack web, mobile development and software architecture. 1-on-1, remote, taught by working engineers at Globoniks.",
  alternates: { canonical: "/mentorship" },
};

export default function MentorshipHub() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-500 font-semibold mb-6">
            Intensive Developer Training
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            Elite Engineering <span className="text-purple-500">Mentorship.</span>
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
            Mentorship is 1-on-1, so cohort places are limited. Pricing details are provided on application review; we offer income share agreements (ISA) and upfront payment tiers.
          </p>
        </div>
      </div>
    </div>
  );
}
