import Link from "next/link";
import { ArrowLeft, Calendar, Laptop, CheckCircle2 } from "lucide-react";

export default function MentorshipTrackDetail({ params }: { params: { track: string } }) {
  const trackName = params.track.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link 
          href="/mentorship" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all tracks
        </Link>
        
        <div className="flex items-center space-x-4 mb-4">
          <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Mentorship Program
          </span>
          {/* Duration was hardcoded to "12 Weeks" on every track, but the
              tracks run 12, 10 and 8 weeks. Restored per-track in Phase 2. */}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground mb-8">
          {trackName}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 py-8 border-y border-border">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium mb-1 flex items-center">
              <Calendar className="w-4 h-4 mr-2" /> Next Cohort
            </span>
            {/* Was the static string "Starts in 3 weeks", which has never
                been updated and cannot stay true. See NEEDS-INPUT.md. */}
            <span className="text-foreground font-semibold">Dates on application</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium mb-1 flex items-center">
              <Laptop className="w-4 h-4 mr-2" /> Format
            </span>
            <span className="text-foreground font-semibold">100% Remote / Part-time</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium mb-1">Tuition</span>
            <span className="text-foreground font-semibold">Pricing on application</span>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-16 text-muted-foreground">
          <p className="lead text-xl text-foreground font-medium mb-8">
            This module is designed to transition you from standard tutorials into a real-world engineering workflow.
          </p>
          
          <h2 className="text-2xl font-bold font-heading text-foreground mb-6">What you will learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {[
              "Enterprise project structuring",
              "Writing unit and integration tests",
              "Advanced state management architectures",
              "Building robust CI/CD pipelines",
              "Handling complex database schemas",
              "Security best practices"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start bg-muted/20 p-4 rounded-lg border border-border">
                <CheckCircle2 className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0A0F1E] border border-indigo-500/20 rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
          <h3 className="text-2xl font-bold font-heading text-white mb-4">Ready to accelerate your career?</h3>
          <p className="text-indigo-200 mb-8 max-w-lg mx-auto">
            Spots are strictly limited to ensure an elite 1-on-1 mentorship experience. Submitting an application does not guarantee acceptance.
          </p>
          <Link 
            href={`/mentorship/apply?track=${params.track}`}
            className="amber-cta px-8 py-4 rounded-md text-base font-semibold inline-flex items-center shadow-lg shadow-amber-500/20"
          >
            Start Your Application
          </Link>
        </div>
      </div>
    </div>
  );
}
