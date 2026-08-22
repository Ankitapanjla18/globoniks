import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  slug: string;
  enterprise?: boolean; // enterprise vs side-project
}

export function ProjectCard({
  title,
  description,
  thumbnail,
  tags,
  slug,
  enterprise,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group block focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl">
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:border-indigo-500/30 flex flex-col h-full">
        <div className="relative h-60 w-full bg-muted overflow-hidden">
          {/* Using a placeholder gradient if image fails or isn't provided */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-amber-500/20 mix-blend-overlay z-10" />
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            {/* Real implementation would use next/image here */}
            {thumbnail ? (
              <div className="w-full h-full bg-indigo-900/50 flex items-center justify-center text-muted-foreground">
                <span className="font-heading font-medium tracking-wide">Image: {thumbnail}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">No image available</span>
            )}
          </div>
          {enterprise && (
            <div className="absolute top-4 left-4 z-20">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider">
                Enterprise
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-muted/50 text-muted-foreground border-border">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-indigo-500 transition-colors flex items-center justify-between">
            {title}
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
            {description}
          </p>
          
          <div className="text-sm font-semibold text-foreground flex items-center mt-auto">
            View Case Study
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
