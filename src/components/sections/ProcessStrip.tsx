import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { STAGES } from "@/data/process";

/*
 * The five stages of a project, compressed to a strip. Same data as
 * /how-we-work/, so the homepage can never promise a process the detail
 * page does not describe. A thin violet line threads the stages like a
 * constellation -- the one visual motif the site has.
 */
export function ProcessStrip() {
  return (
    <section className="border-y rule bg-muted/20 py-20 md:py-28" aria-labelledby="process-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal="" className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">How a project runs</p>
            <h2 id="process-heading" className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl">
              Five stages. <span className="ink">No proposal theatre.</span>
            </h2>
          </div>
          <Link
            href="/how-we-work/"
            className="inline-flex items-center text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
          >
            The full process
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <ol data-reveal="" data-reveal-stagger="" className="relative grid grid-cols-1 gap-x-6 gap-y-10 pl-9 sm:grid-cols-2 sm:pl-0 lg:grid-cols-5">
          {/* the thread: down the left edge on phones, across on desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-[7px] top-2 w-px bg-gradient-to-b from-violet-500/70 via-violet-500/40 to-violet-500/0 sm:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[7px] top-2 hidden h-px w-[calc(100%-14px)] bg-gradient-to-r from-violet-500/0 via-violet-500/60 to-violet-500/0 lg:block"
          />
          {STAGES.map((s, i) => (
            <li key={s.name} className="relative lg:pt-8">
              <span
                aria-hidden="true"
                className="absolute -left-9 top-0.5 block h-[15px] w-[15px] rounded-full border border-violet-400/70 bg-background shadow-[0_0_12px_rgba(167,139,250,0.6)] sm:hidden lg:left-0 lg:top-0 lg:block"
              >
                <span className="absolute inset-[4px] rounded-full bg-violet-400" />
              </span>
              <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-violet-400 lg:min-h-[2.6rem]">
                {String(i + 1).padStart(2, "0")} · {s.when}
              </p>
              <h3 className="mt-3 font-heading text-2xl leading-tight text-foreground">
                {s.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.receive[0]}
                {s.receive[1] ? `; ${s.receive[1].charAt(0).toLowerCase()}${s.receive[1].slice(1)}` : ""}.
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
