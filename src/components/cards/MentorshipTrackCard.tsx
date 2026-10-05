import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MentorshipTrackCardProps {
  title: string;
  duration: string;
  description: string;
  slug: string;
  tags: string[];
}

export function MentorshipTrackCard({
  title,
  duration,
  description,
  slug,
  tags,
}: MentorshipTrackCardProps) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border rule bg-card/60 p-8 transition-colors hover:border-purple-500/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-600/0 blur-3xl transition-colors duration-500 hover:bg-purple-600/20"
      />
      <p className="eyebrow-accent relative">{duration}</p>
      <h3 className="relative mt-4 font-heading text-3xl leading-[1.05] tracking-tight text-foreground">{title}</h3>

      <p className="relative mt-4 flex-grow text-sm leading-relaxed text-muted-foreground md:text-[15px]">
        {description}
      </p>

      <p className="relative mt-6 font-mono text-[11px] leading-relaxed text-muted-foreground">
        {tags.join(" · ")}
      </p>

      <div className="relative mt-7 flex flex-col gap-3 border-t rule pt-5 sm:flex-row">
        <Link
          href={`/mentorship/${slug}/`}
          className="ghost-cta inline-flex flex-1 items-center justify-center px-4 py-3 text-sm font-medium"
        >
          Syllabus<span className="sr-only">: {title}</span>
        </Link>
        <Link
          href={`/mentorship/apply/?track=${slug}`}
          className="brand-cta inline-flex flex-1 items-center justify-center px-4 py-3 text-sm font-medium"
        >
          Apply<span className="sr-only">: {title}</span>
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
