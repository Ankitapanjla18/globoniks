import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhiteLabelPill } from "@/components/cards/WhiteLabelPill";
import type { Project } from "@/data/projects";

/**
 * A Globoniks-owned platform offered under a customer's name, as a
 * single-column row. Rows (not cards) because most products have no logo:
 * a row gives the copy and module pills the room a card would waste on an
 * empty image band, and rows stack cleanly under the client-project grid.
 */
export function ProductRow({ project }: { project: Project }) {
  const wl = project.whiteLabel;
  if (!wl) return null;
  const host = project.liveUrl
    ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
    : null;
  const monogram = project.title
    .split(/\s+/)
    .slice(0, 2)
    .map((t) => t[0])
    .join("");

  return (
    <article className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-violet-500/40 md:flex-row md:items-start md:gap-8">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-muted/30">
        {project.logo ? (
          <Image
            src={project.logo.mark ?? project.logo.src}
            alt={project.logo.alt}
            width={56}
            height={56}
            unoptimized
            className="h-12 w-12 rounded-xl object-contain"
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-heading text-xl font-black text-violet-400"
          >
            {monogram}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-grow">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <WhiteLabelPill stage={wl.stage} />
          {host && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-500">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          )}
          <span className="text-xs font-medium uppercase tracking-wider text-violet-400">
            For {wl.audience}
          </span>
        </div>
        <h3 className="mb-2 font-heading text-xl font-bold text-foreground">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        {wl.modules && wl.modules.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Included modules">
            {wl.modules.slice(0, 8).map((m) => (
              <li key={m}>
                <Badge
                  variant="outline"
                  className="border-border bg-muted/50 text-xs text-muted-foreground"
                >
                  {m}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex shrink-0 flex-row flex-wrap gap-x-5 gap-y-2 text-sm font-semibold md:flex-col md:items-end">
        <Link
          href={`/projects/${project.slug}/`}
          className="inline-flex items-center text-foreground transition-colors hover:text-violet-400"
        >
          Case study
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-violet-500 transition-colors hover:text-violet-400"
          >
            <ExternalLink className="mr-1.5 h-4 w-4" />
            {host}
          </a>
        )}
        <Link
          href="/contact/"
          className="inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {wl.stage === "offered" ? "Enquire" : "Register interest"}
        </Link>
      </div>
    </article>
  );
}
