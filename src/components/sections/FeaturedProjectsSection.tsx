import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { liveSites } from "@/data/projects";

/*
 * Featured work: one lead case study at full width, two beside it. Leads
 * with the live, clickable projects -- something a visitor can verify beats
 * a description of a project they cannot see. Product logos where they
 * exist (owner direction), type-led otherwise; never a placeholder box.
 */
const featured = liveSites.slice(0, 3);

function Tile({ project, lead = false }: { project: (typeof featured)[number]; lead?: boolean }) {
  const host = project.liveUrl ? new URL(project.liveUrl).hostname.replace(/^www\./, "") : null;
  return (
    <article
      className={`group relative flex w-[86%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border rule bg-card/60 p-7 transition-colors hover:border-violet-500/40 sm:w-[70%] md:w-auto md:p-8 ${
        lead ? "md:col-span-2 md:min-h-[26rem]" : "md:min-h-[22rem]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/0 blur-3xl transition-colors duration-500 group-hover:bg-violet-600/20"
      />
      <div className="relative flex items-start justify-between gap-6">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {host && (
            <>
              <span className="live-dot" aria-hidden="true" />
              <span>{host}</span>
            </>
          )}
        </div>
        {project.logo && (
          <Image
            src={project.logo.mark ?? project.logo.src}
            alt={project.logo.alt}
            width={lead ? 120 : 88}
            height={lead ? 60 : 44}
            unoptimized
            className={`${lead ? "max-h-12" : "max-h-9"} w-auto opacity-90`}
          />
        )}
      </div>

      <div className="relative mt-10">
        <h3
          className={`font-heading leading-[1.02] tracking-tight text-foreground ${
            lead ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl"
          }`}
        >
          <Link href={`/projects/${project.slug}/`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className={`mt-4 leading-relaxed text-muted-foreground ${lead ? "max-w-2xl text-base md:text-lg" : "text-sm md:text-[15px]"}`}>
          {project.summary}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="inline-flex items-center font-medium text-foreground transition-colors group-hover:text-violet-300">
            Case study<span className="sr-only">: {project.title}</span>
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center font-mono text-xs text-muted-foreground transition-colors hover:text-violet-300"
            >
              Open live
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </a>
          )}
          {project.stack.length > 0 && (
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              {project.stack.slice(0, 3).join(" / ")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function FeaturedProjectsSection() {
  const [lead, ...rest] = featured;
  if (!lead) return null;

  return (
    <section className="py-20 md:py-28" aria-labelledby="work-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal="" className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Selected work</p>
            <h2 id="work-heading" className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl">
              Open any of these <span className="ink">right now.</span>
            </h2>
          </div>
          <Link
            href="/projects/"
            className="inline-flex items-center text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
          >
            All work
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        {/* Phones: a swipe row, the next tile peeking in from the right.
            Tablets and up: one lead tile, two beside it. */}
        <div
          data-reveal=""
          data-reveal-stagger=""
          className="swipe-row -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
        >
          <Tile project={lead} lead />
          {rest.map((p) => (
            <Tile key={p.slug} project={p} />
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:hidden">
          Swipe for more <span aria-hidden="true">→</span>
        </p>
      </div>
    </section>
  );
}
