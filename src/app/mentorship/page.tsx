import type { Metadata } from "next";
import { MentorshipTrackCard } from "@/components/cards/MentorshipTrackCard";
import { tracks } from "@/data/mentorship";
import { pageMetadata } from "@/lib/site";
import { CtaPanel, PageHeader } from "@/components/ui/page";

export const metadata: Metadata = pageMetadata({
  title: "Tech mentorship — 1-on-1 engineering tracks",
  description:
    "Mentor-led engineering tracks in full-stack web, mobile development and software architecture. 1-on-1 and remote, with the team behind Globoniks' live products.",
  path: "/mentorship/",
});

/*
 * Rewritten in the 2026-10-04 consistency audit. The previous copy promised
 * "Elite Engineering Mentorship" taught by "senior architects", rigorous
 * "cohorts" (while also saying mentorship is 1-on-1), and income share
 * agreements -- a financing offer nothing on record supports. What is left
 * is what the data files and the owner have actually stated.
 */
export default function MentorshipHub() {
  return (
    <div className="min-h-screen pb-24 pt-32 md:pt-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Mentorship · 1-on-1, remote"
          title="Write production code,"
          accent="under review."
          lead="Mentor-led tracks in full-stack web, mobile development and software architecture. You build real things and have them reviewed by the team behind the live products on this site — not tutorials, not recorded videos."
        />

        <h2 className="sr-only">Mentorship tracks</h2>
        <div data-reveal="" data-reveal-stagger="" className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <MentorshipTrackCard key={track.slug} {...track} />
          ))}
        </div>

        <CtaPanel
          title="Places and"
          accent="tuition."
          body="Mentorship is 1-on-1, so places depend on mentor availability. Tuition and the next start dates come with our reply to your application."
          primary={{ href: "/mentorship/apply/", label: "Apply" }}
        />
      </div>
    </div>
  );
}
