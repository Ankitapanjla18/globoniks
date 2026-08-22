import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  excerpt: string;
  thumbnail?: string;
  date: string;
  readTime: string;
  slug: string;
  category: string;
}

export function BlogCard({
  title,
  excerpt,
  date,
  readTime,
  slug,
  category,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-2xl block h-full">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:border-violet-500/30 flex flex-col h-full">
        <div className="relative h-48 w-full bg-muted overflow-hidden">
          <div className="absolute inset-0 bg-violet-900/40 mix-blend-overlay z-10 transition-colors group-hover:bg-violet-500/20" />
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="font-heading font-black text-2xl tracking-tight text-violet-500/40 uppercase">{category}</span>
          </div>
          <div className="absolute top-4 left-4 z-20">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs font-semibold capitalize tracking-wider">
              {category}
            </Badge>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center text-xs text-muted-foreground mb-4 space-x-3">
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" /> {readTime}
            </span>
          </div>
          
          <h3 className="text-xl font-heading font-bold mb-3 text-foreground group-hover:text-violet-500 transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="mt-auto pt-4 border-t border-border flex items-center text-sm font-semibold text-violet-500 uppercase tracking-widest group-hover:text-purple-500 transition-colors">
            Read Article
          </div>
        </div>
      </div>
    </Link>
  );
}
