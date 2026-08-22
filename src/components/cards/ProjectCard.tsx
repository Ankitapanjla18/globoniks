import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { clientLabel, type Project } from "@/data/projects";

/**
 * There is no real project imagery yet, so the card leads with type and
 * layout rather than a grey box reading "Image: edumapping-thumb.jpg", which
 * is what it rendered before. A screenshot slot goes in once we have one.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { slug, title, summary, stack, liveUrl } = project;
  const client = clientLabel(project.client);
  const host = liveUrl ? new URL(liveUrl).hostname.replace(/^www\./, "") : null;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-violet-500/40 hover:shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          {host ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-500">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              />
              Live
            </span>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Case study
            </span>
          )}
          {host && (
            <span className="truncate font-mono text-xs text-muted-foreground">
              {host}
            </span>
          )}
        </div>

        <h3 className="mb-2 font-heading text-xl font-bold text-foreground transition-colors group-hover:text-violet-500">
          {title}
        </h3>

        {client && (
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            {client}
          </p>
        )}

        <p className="mb-6 flex-grow text-sm leading-relaxed text-muted-foreground">
          {summary}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-border bg-muted/50 text-xs text-muted-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <span className="mt-auto flex items-center text-sm font-semibold text-foreground">
          Read the case study
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </article>
    </Link>
  );
}
