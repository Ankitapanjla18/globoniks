import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  slug: string;
}

export function ServiceCard({ icon, title, description, slug }: ServiceCardProps) {
  return (
    <Link href={`/services/${slug}`} className="group block focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-xl">
      <div className="flex flex-col h-full bg-card rounded-2xl border border-border p-8 transition-all hover:bg-muted/30 hover:shadow-lg hover:border-violet-500/50">
        <div className="w-14 h-14 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6 text-violet-500 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold font-heading mb-3 text-foreground group-hover:text-violet-500 transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed flex-grow mb-6">
          {description}
        </p>
        
        <div className="flex items-center text-sm font-semibold text-foreground group-hover:text-violet-500 transition-colors mt-auto">
          Explore Service
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
