import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
  const client = clientLabel(project.client, project.ownBrand);
  const host = liveUrl ? new URL(liveUrl).hostname.replace(/^www\./, "") : null;

  return (
    <Link
      href={`/projects/${slug}/`}
      className="group block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border rule bg-card/60 p-7 transition-colors hover:border-violet-500/40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-600/0 blur-3xl transition-colors duration-500 group-hover:bg-violet-600/20"
        />
        <div className="relative mb-8 flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {host ? (
              <>
                <span className="live-dot" aria-hidden="true" />
                <span className="normal-case tracking-normal">{host}</span>
              </>
            ) : (
              <span>Case study</span>
            )}
            {project.whiteLabel && <WhiteLabelPill stage={project.whiteLabel.stage} />}
          </div>
          {logo && (
            <Image
              src={logo.mark ?? logo.src}
              alt={logo.alt}
              width={88}
              height={44}
              unoptimized
              className="max-h-9 w-auto opacity-90"
            />
          )}
        </div>

        <h3 className="relative font-heading text-3xl leading-[1.05] tracking-tight text-foreground transition-colors group-hover:text-violet-300">
          {title}
        </h3>

        {client && <p className="relative mt-2 text-sm text-muted-foreground">{client}</p>}

        <p className="relative mt-4 flex-grow text-sm leading-relaxed text-muted-foreground">{summary}</p>

        <div className="relative mt-7 flex items-center justify-between gap-4 border-t rule pt-4">
          <span className="inline-flex items-center text-sm font-medium text-foreground">
            Case study
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          {stack.length > 0 && (
            <span className="truncate font-mono text-[11px] text-muted-foreground">
              {stack.slice(0, 3).join(" / ")}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
