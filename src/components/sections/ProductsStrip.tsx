import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductRow } from "@/components/cards/ProductRow";
import { whiteLabelProjects } from "@/data/projects";

/** Homepage strip: the studio's own platforms, offered under a customer's name. */
export function ProductsStrip() {
  const products = whiteLabelProjects
    .filter((p) => p.whiteLabel?.stage === "offered")
    .slice(0, 3);
  if (products.length === 0) return null;

  return (
    <section className="py-20 md:py-28" aria-labelledby="products-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal="" className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Our platforms</p>
            <h2 id="products-heading" className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl">
              Built once, run well, <span className="ink">offered under your name.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Platforms we built and operate, deployed as your own instance —
              your name, your data, the team that built it behind you.
            </p>
          </div>
          <Link
            href="/projects/#products"
            className="inline-flex items-center text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
          >
            All products
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <div data-reveal="" data-reveal-stagger="" className="space-y-4">
          {products.map((p) => (
            <ProductRow key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
