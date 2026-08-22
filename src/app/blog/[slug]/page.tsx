import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StructuredData } from "@/components/seo/StructuredData";
import { getPost, publishedPosts } from "@/data/posts";
import { breadcrumbSchema, SITE_URL } from "@/lib/site";

type Props = { params: { slug: string } };

/**
 * Bounded to published posts only. Previously ANY slug returned 200 with the
 * same hardcoded article under a title derived from the URL string -- four
 * listed posts and infinite unlisted ones all served identical content.
 */
export function generateStaticParams() {
  return publishedPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.isoDate,
    },
  };
}

export default function BlogPostDetail({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  /*
   * Article schema. Author is deliberately the organization, not a person:
   * the visible byline ("Alex Vance") is unverified -- see NEEDS-INPUT.md
   * section 1.1 -- and an unverified name must not be asserted as structured
   * data.
   */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <article className="min-h-screen pt-32 pb-24 selection:bg-violet-500/30">
      <StructuredData data={articleSchema} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <nav aria-label="Breadcrumb">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all articles
          </Link>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Badge
              variant="outline"
              className="border-violet-500/30 text-violet-500 bg-violet-500/10"
            >
              {post.category}
            </Badge>
            <span className="text-muted-foreground text-sm flex items-center">
              <CalendarDays className="w-4 h-4 mr-1.5" /> {post.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-muted-foreground text-sm flex items-center">
              <Clock className="w-4 h-4 mr-1.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground leading-[1.1] mb-8">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">AV</span>
              </div>
              <div>
                {/* Byline pending verification -- NEEDS-INPUT.md 1.1. Kept
                    visible per the no-silent-deletion rule, but deliberately
                    NOT asserted in the Article structured data. */}
                <p className="font-semibold text-foreground text-sm">Alex Vance</p>
                <p className="text-xs text-muted-foreground">Lead Architect @ Globoniks</p>
              </div>
            </div>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-headings:font-heading prose-headings:font-bold prose-a:text-violet-500 hover:prose-a:text-violet-400 prose-img:rounded-xl">
          <p className="lead text-xl text-foreground font-medium mb-10">
            As one of our enterprise applications grew, we hit performance bottlenecks rooted in a deep React component tree and a complex Redux store. Here is how we fixed it.
          </p>

          <h2 className="text-2xl font-bold font-heading text-foreground mt-12 mb-4">The Boilerplate Problem</h2>
          <p>
            Redux has been the industry standard for years, but as our engineering team grew, the cognitive load required to trace action creators, reducers, and thunks slowed down our velocity. Every new feature required touching at least three different files before any business logic was written.
          </p>

          <h2 className="text-2xl font-bold font-heading text-foreground mt-12 mb-4">Enter Zustand</h2>
          <p>
            We migrated our core state to Zustand. Boilerplate dropped sharply, bundle size decreased, and concurrent rendering optimizations became straightforward to implement.
          </p>

          <pre className="bg-muted border border-border rounded-xl p-4 my-8 overflow-x-auto text-sm text-foreground">
            <code>
{`import { create } from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
}

export const useStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))`}
            </code>
          </pre>

          <h2 className="text-2xl font-bold font-heading text-foreground mt-12 mb-4">Conclusion</h2>
          <p>
            Technical debt is not just bad architectural patterns; it is also choosing tools that slow down your developers. Zustand was the right tool for our use case, and it let us move faster without compromising on state predictability.
          </p>
        </div>
      </div>
    </article>
  );
}
