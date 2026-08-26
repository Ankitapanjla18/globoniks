import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Laptop, CheckCircle2 } from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import { getTrack, tracks } from "@/data/mentorship";
import { breadcrumbSchema } from "@/lib/site";

type Props = { params: { track: string } };

export function generateStaticParams() {
  return tracks.map((t) => ({ track: t.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const track = getTrack(params.track);
  if (!track) return {};
  return {
    title: `${track.title} — Mentorship Track`,
    description: track.description,
    alternates: { canonical: `/mentorship/${track.slug}/` },
    openGraph: {
      title: `${track.title} — Mentorship Track | Globoniks`,
      description: track.description,
      url: `/mentorship/${track.slug}/`,
    },
  };
}

export default function MentorshipTrackDetail({ params }: Props) {
  const track = getTrack(params.track);
  if (!track) notFound();

  return (
    <div className="min-h-screen pt-32 pb-24">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Mentorship", path: "/mentorship" },
          { name: track.title, path: `/mentorship/${track.slug}` },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <nav aria-label="Breadcrumb">
          <Link
            href="/mentorship"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all tracks
          </Link>
        </nav>

        <div className="flex items-center space-x-4 mb-4">
          <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Mentorship Program
          </span>
          <span className="flex items-center text-sm text-muted-foreground">
            {/* Per-track duration from the data layer. This used to be
                hardcoded to "12 Weeks" on every track. */}
            <Clock className="w-4 h-4 mr-1.5" /> {track.duration}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground mb-8">
          {track.title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 py-8 border-y border-border">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium mb-1 flex items-center">
              <Calendar className="w-4 h-4 mr-2" /> Next Cohort
            </span>
            {/* Real cohort dates pending -- see NEEDS-INPUT.md. */}
            <span className="text-foreground font-semibold">Dates on application</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium mb-1 flex items-center">
              <Laptop className="w-4 h-4 mr-2" /> Format
            </span>
            <span className="text-foreground font-semibold">100% Remote / Part-time</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium mb-1">Tuition</span>
            <span className="text-foreground font-semibold">Pricing on application</span>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-16 text-muted-foreground">
          <p className="lead text-xl text-foreground font-medium mb-8">
            {track.description}
          </p>

          <h2 className="text-2xl font-bold font-heading text-foreground mb-6">
            What you will learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {[
              "Enterprise project structuring",
              "Writing unit and integration tests",
              "Advanced state management architectures",
              "Building robust CI/CD pipelines",
              "Handling complex database schemas",
              "Security best practices",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start bg-muted/20 p-4 rounded-lg border border-border"
              >
                <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold font-heading text-foreground mb-6">
            Technologies covered
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {track.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted/30 px-4 py-1.5 text-sm font-medium text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-card border border-violet-500/20 rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -z-10" />
          <h2 className="text-2xl font-bold font-heading text-white mb-4">
            Ready to accelerate your career?
          </h2>
          <p className="text-violet-200 mb-8 max-w-lg mx-auto">
            Spots are strictly limited to ensure an elite 1-on-1 mentorship
            experience. Submitting an application does not guarantee acceptance.
          </p>
          <Link
            href={`/mentorship/apply?track=${track.slug}`}
            className="brand-cta px-8 py-4 rounded-full text-base font-semibold inline-flex items-center"
          >
            Start Your Application
          </Link>
        </div>
      </div>
    </div>
  );
}
