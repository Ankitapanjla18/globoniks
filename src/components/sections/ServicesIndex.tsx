import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { getProject } from "@/data/projects";

/*
 * Services as a numbered index -- an editorial contents page, not a grid of
 * icon cards. Each row names the service, says what it is for in one line,
 * and cites the shipped project that proves it, pulled from the same data
 * the service pages use. Replaces the "I need software / I want to learn"
 * split; the learning path lives in the sticky column.
 */
export function ServicesIndex() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="services-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div data-reveal="" className="lg:sticky lg:top-32">
              <p className="eyebrow mb-5">What we build</p>
              <h2
                id="services-heading"
                className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl"
              >
                Five services, <span className="ink">each with proof.</span>
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
                Every service cites a system we built, most of them live. Open
                the proof before you read the pitch.
              </p>
              <Link
                href="/services/"
                className="mt-7 inline-flex items-center text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
              >
                All services
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>

              <div className="mt-12 rounded-2xl border rule p-5">
                <p className="eyebrow mb-2">Here to learn instead?</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Mentor-led tracks in full-stack, mobile and architecture,
                  mentored 1-on-1 by the team behind the work above.
                </p>
                <Link
                  href="/mentorship/"
                  className="mt-3 inline-flex items-center text-sm font-medium text-foreground transition-colors hover:text-violet-300"
                >
                  Mentorship tracks
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <ol data-reveal="" data-reveal-stagger="" className="lg:col-span-8">
            {services.map((s, i) => {
              const proof = s.proofSlugs
                .map((slug) => getProject(slug))
                .filter((p): p is NonNullable<typeof p> => Boolean(p));
              return (
                <li key={s.slug} className="border-t rule last:border-b">
                  <Link
                    href={`/services/${s.slug}/`}
                    className="row-link group grid grid-cols-[2.5rem_1fr] gap-x-4 py-7 md:grid-cols-[3rem_1fr_auto] md:gap-x-8"
                  >
                    <span className="relative font-mono text-xs text-muted-foreground pt-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative min-w-0">
                      <span className="block font-heading text-2xl leading-tight text-foreground transition-colors group-hover:text-violet-300 md:text-3xl">
                        {s.title}
                      </span>
                      <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                        {s.description}
                      </span>
                      {proof.length > 0 && (
                        <span className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                          <span className="text-violet-400">Proof</span>
                          {proof.map((p, j) => (
                            <span key={p.slug}>
                              {p.title}
                              {j < proof.length - 1 && <span aria-hidden="true"> ·</span>}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                    <ArrowRight className="relative mt-2 hidden h-5 w-5 self-start text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-violet-300 md:block" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
