import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { clientLabel, type Project } from "@/data/projects";
import { WhiteLabelPill } from "@/components/cards/WhiteLabelPill";

/**
 * Cards lead with the product's own brand mark where one exists (owner
 * direction: logos rather than UI screenshots, since the live sites are
 * under maintenance), and fall back to type-led layout where none does --
 * never a grey placeholder box.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { slug, title, summary, stack, liveUrl, logo } = project;
  const client = clientLabel(project.client);
  const host = liveUrl ? new URL(liveUrl).hostname.replace(/^www\./, "") : null;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-violet-500/40 hover:shadow-lg">
        {logo && (
          <div className="flex h-36 items-center justify-center border-b border-border bg-muted/20 p-6">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={80}
              unoptimized
              className="max-h-20 w-auto"
            />
          </div>
        )}
        <div className="flex flex-grow flex-col p-6">
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
            <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
              {host}
            </span>
          )}
          {project.whiteLabel && <WhiteLabelPill stage={project.whiteLabel.stage} />}
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

        {stack.length > 0 && (
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
        )}

        <span className="mt-auto flex items-center text-sm font-semibold text-foreground">
          Read the case study
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
        </div>
      </article>
    </Link>
  );
}
