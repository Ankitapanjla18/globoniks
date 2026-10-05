import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { liveDemos, liveSites } from "@/data/projects";
import { BUSINESS, ISO } from "@/lib/site";

/*
 * Hero (redesign 2026-10-04). Two columns on desktop: the claim on the
 * left, the evidence on the right -- a "live board" of every product a
 * visitor can open this second. The old hero made the claim alone and left
 * the proof three screens down.
 *
 * Motion is CSS only (`.reveal` in globals.css): one staggered page-load
 * sequence, the h1 moving without fading so it still counts as the
 * Largest Contentful Paint on first frame. Server component.
 */
export function HeroSection() {
  const live = liveSites;

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Soft violet bloom behind the headline; the starfield shows through. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-violet-600/20 blur-[140px] dark:bg-violet-600/25"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-7">
            <p className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1" style={{ "--i": 0 } as React.CSSProperties}>
              <span>{BUSINESS.locality}, {BUSINESS.region}</span>
              <span aria-hidden="true" className="text-violet-500">·</span>
              <span>Est. {BUSINESS.foundingYear}</span>
              <span aria-hidden="true" className="text-violet-500">·</span>
              <span>{ISO.standard}</span>
            </p>

            <h1
              className="reveal-lcp font-heading text-[2.9rem] leading-[0.98] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.4rem]"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              We build what others <span className="ink">only pitch.</span>
            </h1>

            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              Marketplaces, SaaS platforms and business systems — web and
              mobile — from a small studio where the person you talk to sits
              beside the person writing the code.
            </p>

            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <Link
                href="/contact/"
                className="brand-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium"
              >
                Start a project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/projects/"
                className="ghost-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium"
              >
                See the work
              </Link>
            </div>

            <p
              className="mt-8 font-mono text-xs text-muted-foreground"
              style={{ "--i": 4 } as React.CSSProperties}
            >
              Replies within one working day, from Ankita, the founder.
            </p>
          </div>

          {/* Live board */}
          <aside
            aria-labelledby="live-board"
            className="reveal lg:col-span-5 lg:pt-6"
          >
            <div
              className="relative rounded-3xl border border-[hsl(var(--hairline))] bg-card/70 p-6 backdrop-blur-md sm:p-7"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <div className="mb-5 flex items-center justify-between border-b rule pb-4">
                <h2 id="live-board" className="eyebrow flex items-center gap-2.5 !text-foreground">
                  <span className="live-dot" aria-hidden="true" />
                  Live right now
                </h2>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(live.length).padStart(2, "0")} live sites
                </span>
              </div>

              <ol className="divide-y divide-[hsl(var(--hairline))]">
                {live.map((p, i) => {
                  const host = new URL(p.liveUrl!).hostname.replace(/^www\./, "");
                  return (
                    <li key={p.slug}>
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-baseline gap-4 py-3 transition-colors hover:text-violet-300"
                      >
                        <span className="w-6 shrink-0 font-mono text-[11px] text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-grow">
                          <span className="block font-heading text-xl leading-tight text-foreground transition-colors group-hover:text-violet-300">
                            {p.title}
                          </span>
                          <span className="block truncate font-mono text-xs text-muted-foreground">
                            {host}
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 self-center text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-300" />
                      </a>
                    </li>
                  );
                })}
              </ol>

              {liveDemos.length > 0 && (
                <Link
                  href="/projects/#products"
                  className="group mt-1 flex items-baseline gap-4 border-t rule pt-3 text-sm text-muted-foreground transition-colors hover:text-violet-300"
                >
                  <span className="w-6 shrink-0 font-mono text-[11px]">+{String(liveDemos.length).padStart(2, "0")}</span>
                  <span className="flex-grow">
                    live {liveDemos.length === 1 ? "demo" : "demos"} of our own platforms
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 self-center transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}

              <p className="mt-4 border-t rule pt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                Every link opens the real product. Judge the work before you
                talk to us.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
