import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tracks } from "@/data/mentorship";

/*
 * Mentorship, stated plainly: the three tracks with their real durations,
 * from src/data/mentorship.ts. The previous version showed a mock terminal
 * running an invented "npx create-senior-dev" -- a joke that read as a
 * fake product on a site whose whole pitch is that nothing is faked.
 */
export function MentorshipTeaser() {
  return (
    <section className="border-t rule py-20 md:py-28" aria-labelledby="mentorship-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal="" className="relative overflow-hidden rounded-3xl border rule bg-card/60 p-8 md:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]"
          />
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="eyebrow-accent mb-5">Mentorship · 1-on-1, remote</p>
              <h2 id="mentorship-heading" className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl">
                Learn from the people <span className="ink">who ship the work above.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                Mentor-led, 1-on-1 and remote. You write production-grade code
                under review from working engineers, not tutorials.
              </p>
              <Link
                href="/mentorship/"
                className="brand-cta mt-8 inline-flex items-center justify-center px-7 py-3.5 text-base font-medium"
              >
                Mentorship tracks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <ol className="divide-y divide-[hsl(var(--hairline))] border-y rule lg:col-span-6 lg:self-center">
              {tracks.map((t, i) => (
                <li key={t.slug}>
                  <Link
                    href={`/mentorship/${t.slug}/`}
                    className="group flex items-baseline gap-5 py-5 transition-colors"
                  >
                    <span className="w-6 shrink-0 font-mono text-[11px] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-grow">
                      <span className="block font-heading text-2xl leading-tight text-foreground transition-colors group-hover:text-violet-300">
                        {t.title}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {t.duration}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 self-center text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-violet-300" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
