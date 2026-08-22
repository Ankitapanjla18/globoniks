import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays, Share2, MessageSquare, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BlogPostDetail({ params }: { params: { slug: string } }) {
  // In reality, this would fetch the markdown/MDX based on the slug
  const title = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <article className="min-h-screen pt-32 pb-24 bg-background selection:bg-indigo-500/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="outline" className="border-indigo-500/30 text-indigo-500 bg-indigo-500/10">Architecture</Badge>
            <span className="text-muted-foreground text-sm flex items-center">
              <CalendarDays className="w-4 h-4 mr-1.5" /> Oct 12, 2024
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-muted-foreground text-sm flex items-center">
              <Clock className="w-4 h-4 mr-1.5" /> 8 min read
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground leading-[1.1] mb-8">
            {title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">AV</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">Alex Vance</h4>
                <p className="text-xs text-muted-foreground">Lead Architect @ Globoniks</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button title="Comment" className="p-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-full transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
              <button title="Link" className="p-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-full transition-colors">
                <Link2 className="w-4 h-4" />
              </button>
              <button title="Copy" className="p-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-full transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-headings:font-heading prose-headings:font-bold prose-a:text-indigo-500 hover:prose-a:text-indigo-400 prose-img:rounded-xl">
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
