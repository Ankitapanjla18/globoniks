import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ServiceDetail({ params }: { params: { service: string } }) {
  // In a real app, we'd fetch service details from a CMS or lib file based on the slug.
  const serviceName = params.service.replace("-", " ");
  
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link 
          href="/services" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all services
        </Link>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground capitalize mb-6">
          {serviceName}
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
          <p className="text-xl leading-relaxed mb-12">
            Detailed information about {serviceName} engineered by Globoniks. We focus on scalable infrastructure, robust security protocols, and flawless UX/UI.
          </p>
          
          <h2 className="text-2xl font-bold font-heading text-foreground mb-6 border-b border-border pb-4">Approach & Methodology</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {[
              "Architecture Planning & Blueprints",
              "Iterative Agile Development",
              "Automated CI/CD Workflows",
              "Production-grade Security Audits"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-violet-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-muted/30 border border-border rounded-2xl p-8 lg:p-12 mb-12 text-center">
            <h3 className="text-2xl font-bold font-heading text-foreground mb-4">Start your {serviceName} project today.</h3>
            <p className="mb-8">Discuss your architecture requirements with a senior engineer.</p>
            <Link 
              href="/contact" 
              className="brand-cta px-8 py-4 rounded-md text-base font-semibold inline-flex"
            >
              Request a Technical Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
