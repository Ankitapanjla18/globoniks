import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/cards/ProductCard";
import { whiteLabelProjects } from "@/data/projects";

/** Homepage strip: the studio's own platforms, offered under a customer's name. */
export function ProductsStrip() {
  const products = whiteLabelProjects.slice(0, 3);
  if (products.length === 0) return null;

  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-4 text-foreground">
              Our products, <span className="text-violet-600">under your name.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Platforms we built and run, offered as your own instance — your
              name, your data, the team that built it behind you.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href="/products/"
              className="inline-flex items-center text-violet-500 font-semibold hover:text-violet-400 transition-colors"
            >
              All products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
