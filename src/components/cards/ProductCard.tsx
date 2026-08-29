import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhiteLabelPill } from "@/components/cards/WhiteLabelPill";
import type { Project } from "@/data/projects";

/**
 * A Globoniks-owned platform offered under a customer's name. Rendered on the
 * Products page and the homepage strip. Requires `project.whiteLabel`.
 */
export function ProductCard({ project }: { project: Project }) {
  const wl = project.whiteLabel;
  if (!wl) return null;
  const host = project.liveUrl
    ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
    : null;
  const modules = wl.modules?.slice(0, 6) ?? [];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-violet-500/40 hover:shadow-lg">
      {/* Every product card carries the same band so a grid of them lines
          up; without a logo it shows a monogram tile rather than nothing. */}
      <div className="flex h-36 items-center justify-center border-b border-border bg-muted/20 p-6">
        {project.logo ? (
          <Image
            src={project.logo.src}
            alt={project.logo.alt}
            width={160}
            height={80}
            unoptimized
            className="max-h-20 w-auto"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500 font-heading text-2xl font-black text-white"
          >
            {project.title
              .split(/\s+/)
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </span>
        )}
      </div>
      <div className="flex flex-grow flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <WhiteLabelPill stage={wl.stage} />
          {host && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-500">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          )}
        </div>

        <h3 className="mb-1 font-heading text-xl font-bold text-foreground">
          {project.title}
        </h3>
        <p className="mb-3 text-sm font-medium text-violet-400">
          For {wl.audience}
        </p>
        <p className="mb-5 flex-grow text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        {modules.length > 0 && (
          <ul className="mb-6 flex flex-wrap gap-2" aria-label="Included modules">
            {modules.map((m) => (
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

        <div className="mt-auto flex flex-wrap items-center gap-4 text-sm font-semibold">
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
      </div>
    </article>
  );
}
