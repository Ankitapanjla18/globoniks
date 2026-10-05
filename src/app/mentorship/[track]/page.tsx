import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/seo/StructuredData";
import { getTrack, tracks } from "@/data/mentorship";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { CtaPanel, PageHeader, SectionTitle } from "@/components/ui/page";

type Props = { params: { track: string } };

export function generateStaticParams() {
  return tracks.map((t) => ({ track: t.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const track = getTrack(params.track);
  if (!track) return {};
  return pageMetadata({
    title: `${track.title} — mentorship track`,
    description: track.description,
    path: `/mentorship/${track.slug}/`,
  });
}

export default function MentorshipTrackDetail({ params }: Props) {
  const track = getTrack(params.track);
  if (!track) notFound();
  const others = tracks.filter((t) => t.slug !== track.slug);

  return (
    <div className="min-h-screen pb-24 pt-32 md:pt-40">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Mentorship", path: "/mentorship" },
          { name: track.title, path: `/mentorship/${track.slug}` },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          back={{ href: "/mentorship/", label: "All tracks" }}
          eyebrow="Mentorship track"
          title={track.title}
          lead={track.description}
        />

        {/* Per-track duration from the data layer. This used to be
            hardcoded to "12 Weeks" on every track. Cohort dates and
            pricing are pending -- see NEEDS-INPUT.md. */}
        <dl data-reveal="" className="grid grid-cols-2 gap-x-8 gap-y-6 border-y rule py-7 md:grid-cols-4">
          {[
            { k: "Duration", v: track.duration },
            { k: "Format", v: "1-on-1, remote" },
            { k: "Next cohort", v: "Dates on application" },
            { k: "Tuition", v: "On application" },
          ].map((f) => (
            <div key={f.k}>
              <dt className="eyebrow">{f.k}</dt>
              <dd className="mt-1.5 font-heading text-2xl leading-tight text-foreground">{f.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <section data-reveal="" aria-labelledby="learn" className="lg:col-span-7">
            <SectionTitle eyebrow="What the track covers" id="learn">
              What you will <span className="ink">learn.</span>
            </SectionTitle>
            <ol className="divide-y divide-[hsl(var(--hairline))] border-y rule">
              {track.outcomes.map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 py-4">
                  <span className="w-6 shrink-0 font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-relaxed text-foreground">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <section data-reveal="" aria-labelledby="tech" className="lg:col-span-5">
            <SectionTitle eyebrow="Technologies" id="tech">
              The <span className="ink">stack.</span>
            </SectionTitle>
            <ul className="flex flex-wrap gap-2">
              {track.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[hsl(var(--hairline))] px-4 py-1.5 font-mono text-xs text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-12 mb-4">Other tracks</p>
            <ul className="divide-y divide-[hsl(var(--hairline))] border-y rule">
              {others.map((t) => (
                <li key={t.slug}>
                  <Link href={`/mentorship/${t.slug}/`} className="group flex items-baseline justify-between gap-4 py-4">
                    <span className="font-heading text-xl text-foreground transition-colors group-hover:text-violet-300">
                      {t.title}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">{t.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <CtaPanel
          title="Ready to"
          accent="apply?"
          body="Places are limited because mentorship is 1-on-1. Tell us where you are now and what you want to build; an application is a conversation, not a guarantee of a place."
          primary={{ href: `/mentorship/apply/?track=${track.slug}`, label: "Apply for this track" }}
          secondary={{ href: "/mentorship/", label: "Compare tracks" }}
        />
      </div>
    </div>
  );
}
