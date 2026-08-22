import Link from "next/link";
import { ArrowRight, Clock, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MentorshipTrackCardProps {
  title: string;
  duration: string;
  description: string;
  slug: string;
  tags: string[];
}

export function MentorshipTrackCard({
  title,
  duration,
  description,
  slug,
  tags,
}: MentorshipTrackCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 flex flex-col h-full hover:border-amber-500/50 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold font-heading text-foreground">{title}</h3>
      </div>
      
      <div className="flex items-center text-muted-foreground text-sm mb-6">
        <Clock className="w-4 h-4 mr-2 text-amber-500" />
        <span className="font-medium">{duration}</span>
      </div>

      <p className="text-muted-foreground leading-relaxed flex-grow mb-8">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80">
            <Code className="w-3 h-3 mr-1" />
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
        <Link 
          href={`/mentorship/${slug}`}
          className="flex-1 text-center py-3 px-4 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
        >
          View Syllabus
        </Link>
        <Link 
          href={`/mentorship/apply?track=${slug}`}
          className="flex-1 text-center py-3 px-4 amber-cta rounded-lg text-sm font-semibold shadow-md shadow-amber-500/10"
        >
          Apply for Cohort
        </Link>
      </div>
    </div>
  );
}
