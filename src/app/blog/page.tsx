import type { Metadata } from "next";
import { BlogCard } from "@/components/cards/BlogCard";
import { publishedPosts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Engineering Blog",
  description:
    "Technical articles from the Globoniks engineering team on architecture, state management and building production systems.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            Engineering <span className="text-violet-600">Insights.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Deep-dive technical articles written by our core engineers. We explore system architecture, modern web frameworks, and advanced development practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>

        <div className="mt-20 border border-border bg-card rounded-2xl p-8 lg:p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Subscribe to our engineering newsletter</h3>
          <p className="text-muted-foreground mb-6">Receive one high-quality technical article per month. No spam, just code.</p>
          {/* NEWSLETTER: no mailing-list provider is wired up yet. See NEEDS-INPUT.md. */}
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" method="post" action="/blog">
            <input 
              type="email" 
              placeholder="developer@example.com" 
              className="flex-grow h-12 rounded-md border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" 
              required
            />
            <button type="submit" className="brand-cta px-6 py-2 rounded-md font-semibold h-12 flex-shrink-0">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
