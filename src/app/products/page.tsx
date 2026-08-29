import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/cards/ProductCard";
import { StructuredData } from "@/components/seo/StructuredData";
import { whiteLabelProjects } from "@/data/projects";
import { breadcrumbSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products — white-label platforms",
  description:
    "Platforms Globoniks built and runs, offered under your own name: a multi-tenant school management system, a fine-jewellery e-commerce storefront, and more. Your instance, our team behind it.",
  alternates: { canonical: "/products/" },
};

/**
 * The studio's own platforms, distinct from client case studies. Each card
 * links to the product's case study (its detail page) -- no duplicate
 * product URLs. Items marked "planned" are intent, and say so.
 */
export default function ProductsPage() {
  const offered = whiteLabelProjects.filter((p) => p.whiteLabel?.stage === "offered");
  const planned = whiteLabelProjects.filter((p) => p.whiteLabel?.stage === "planned");

  return (
    <div className="min-h-screen pt-32 pb-24">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            Platforms you can run <span className="text-violet-600">under your own name.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            These are systems Globoniks built and runs. Instead of commissioning
            a build from scratch, you get your own instance of a working product
            — your name, your data — with the team that built it behind you.
            Where a product is planned rather than ready, it says so.
          </p>
        </div>

        <h2 className="sr-only">Available now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offered.map((p) => (
            <ProductCard key={p.slug} project={p} />
          ))}
        </div>

        {planned.length > 0 && (
          <>
            <h2 className="mt-20 mb-6 font-heading text-2xl font-bold text-foreground">
              On the roadmap
            </h2>
            <p className="mb-8 max-w-3xl text-muted-foreground">
              Platforms we have built for a client and plan to offer more widely.
              Not packaged yet — register interest and we will tell you exactly
              where each one stands.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {planned.map((p) => (
                <ProductCard key={p.slug} project={p} />
              ))}
            </div>
          </>
        )}

        <div className="mt-20 bg-muted/30 border border-border rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
            Want one of these under your name?
          </h2>
          <p className="text-muted-foreground mb-8">
            Tell us which product and who it is for — your message lands directly
            with a founder.
          </p>
          <Link
            href="/contact/"
            className="brand-cta px-8 py-4 rounded-full text-base font-semibold inline-flex"
          >
            Ask about a deployment
          </Link>
        </div>
      </div>
    </div>
  );
}
