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
    <section className="py-24 border-t border-border" aria-labelledby="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="testimonials"
          className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-12 text-foreground"
        >
          In their <span className="text-violet-600">words.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quoted.map((p) => (
            <figure
              key={p.slug}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-8"
            >
              <blockquote className="flex-grow text-lg leading-relaxed text-foreground">
                &ldquo;{p.quote!.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{p.quote!.name}</span>
                , {p.quote!.role}, {p.quote!.company}
                <span className="block mt-1">
                  <Link
                    href={`/projects/${p.slug}/`}
                    className="text-violet-500 hover:text-violet-400 transition-colors"
                  >
                    {p.title} case study
                  </Link>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
