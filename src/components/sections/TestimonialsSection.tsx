import Link from "next/link";
import { projects } from "@/data/projects";

/**
 * Client words, rendered only when they exist. Quotes live on the project
 * entries in src/data/projects.ts (`quote: { text, name, role, company }`)
 * and appear here and on the case study the moment one is added -- nothing
 * is shown until a client has actually said it. See TESTIMONIAL-REQUESTS.md
 * for the three requests currently out.
 */
export function TestimonialsSection() {
  const quoted = projects.filter((p) => p.quote).slice(0, 3);
  if (quoted.length === 0) return null;

  return (
    <section className="border-t rule py-20 md:py-28" aria-labelledby="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow mb-5">In their words</p>
        <h2
          id="testimonials"
          className="mb-12 font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl"
        >
          What clients <span className="ink">actually said.</span>
        </h2>
        <div data-reveal="" data-reveal-stagger="" className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {quoted.map((p) => (
            <figure
              key={p.slug}
              className="flex h-full flex-col rounded-3xl border rule bg-card/60 p-8"
            >
              <blockquote className="flex-grow font-heading text-2xl leading-snug text-foreground">
                &ldquo;{p.quote!.text}&rdquo;
              </blockquote>
              <figcaption className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <span className="text-foreground">{p.quote!.name}</span>
                <span className="block normal-case tracking-normal">
                  {p.quote!.role}, {p.quote!.company}
                </span>
                <Link
                  href={`/projects/${p.slug}/`}
                  className="mt-2 inline-block normal-case tracking-normal text-violet-400 transition-colors hover:text-violet-300"
                >
                  {p.title} case study
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
