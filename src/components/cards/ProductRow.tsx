import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhiteLabelPill } from "@/components/cards/WhiteLabelPill";
import { liveLabel, type Project } from "@/data/projects";

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
    <article className="flex flex-col gap-6 rounded-3xl border rule bg-card/60 p-6 transition-colors hover:border-violet-500/40 md:flex-row md:items-start md:gap-8 md:p-7">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
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
            className="font-heading text-2xl text-violet-300"
          >
            {monogram}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-grow">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <WhiteLabelPill stage={wl.stage} />
          {host && (
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span aria-hidden="true" className="live-dot" />
              {liveLabel(project)}
            </span>
          )}
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet-400">
            For {wl.audience}
          </span>
        </div>
        <h3 className="mb-2 font-heading text-3xl leading-[1.05] tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        {wl.modules && wl.modules.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Included modules">
            {wl.modules.slice(0, 8).map((m, i) => (
              // Phones show four; the rest are a tap away on the case study.
              <li key={m} className={i >= 4 ? "hidden sm:list-item" : undefined}>
                <Badge
                  variant="outline"
                  className="border-border bg-muted/50 text-xs text-muted-foreground"
                >
                  {m}
                </Badge>
              </li>
            ))}
            {wl.modules.length > 4 && (
              <li className="sm:hidden">
                <Badge variant="outline" className="border-border bg-transparent text-xs text-muted-foreground">
                  +{Math.min(wl.modules.length, 8) - 4} more
                </Badge>
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="flex shrink-0 flex-row flex-wrap gap-x-5 gap-y-2 text-sm font-semibold md:flex-col md:items-end">
        <Link
          href={`/projects/${project.slug}/`}
          className="inline-flex items-center text-foreground transition-colors hover:text-violet-400"
        >
          Case study<span className="sr-only">: {project.title}</span>
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-violet-400 transition-colors hover:text-violet-300"
          >
            <ExternalLink className="mr-1.5 h-4 w-4" />
            {host}
          </a>
        )}
        <Link
          href="/contact/"
          className="inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {wl.stage === "offered" ? "Ask about white-label" : "Register interest"}
        </Link>
      </div>
    </article>
  );
}
