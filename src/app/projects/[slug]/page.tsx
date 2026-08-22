import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  // Simulating fetching data based on slug.
  const projectName = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-foreground mb-6">
              {projectName} Architecture
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mb-12">
              <p className="lead text-xl text-foreground font-medium">
                This case study outlines the technical challenges and architectural decisions made while engineering the {projectName} platform. 
              </p>
              
              <h2 className="text-2xl font-bold font-heading text-foreground mt-12 mb-4">The Challenge</h2>
              <p>
                The client required a highly fault-tolerant system capable of processing massive concurrent operations without data loss or downtime. Legacy code was bottlenecking their growth and preventing horizontal scaling.
              </p>

              <h2 className="text-2xl font-bold font-heading text-foreground mt-12 mb-4">The Solution</h2>
              <p>
                We completely re-architected the monolithic application into scalable microservices using a MERN stack foundation, accelerated by distributed caching and asynchronous message queues. This allowed dynamic scaling during peak loads mapping exactly to infrastructure limits.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-muted/20 border border-border p-8 rounded-2xl sticky top-32">
              <h3 className="font-heading font-bold text-lg mb-6 text-foreground border-b border-border pb-4">
                Project Overview
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React.js", "Node.js", "PostgreSQL", "Redis", "AWS"].map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-background text-foreground border border-border">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Timeline</h4>
                  <p className="text-foreground font-medium">4 Months</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Links</h4>
                  <div className="flex flex-col space-y-3 mt-3">
                    <a href="#" className="inline-flex items-center text-indigo-500 font-medium hover:text-indigo-400 transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Application
                    </a>
                    <a href="#" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                      <Code2 className="w-4 h-4 mr-2" /> Architecture Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full width hero image placeholder */}
        <div className="mt-16 w-full h-80 md:h-[500px] bg-muted border border-border rounded-3xl flex items-center justify-center overflow-hidden relative group">
          <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors" />
          <span className="text-muted-foreground font-heading font-medium tracking-widest uppercase">System Dashboard Screenshot</span>
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-semibold text-foreground border border-border flex items-center shadow-sm">
            Mockup <ArrowUpRight className="ml-1 w-3 h-3" />
          </div>
        </div>

      </div>
    </div>
  );
}
