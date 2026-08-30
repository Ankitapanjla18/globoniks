import Link from "next/link";
import { Code2, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function AudienceSplitSection() {
  return (
    <section className="relative py-24">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Who we work with</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Enterprise Card */}
          <Link href="/services" className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 rounded-xl transition-transform hover:-translate-y-1">
            <Card className="h-full bg-card hover:bg-muted/50 border-border transition-colors relative overflow-hidden group-hover:border-violet-500/50 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-bl-full -z-10 group-hover:bg-violet-500/20 transition-colors" />
              <CardHeader>
                <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                  <Code2 className="w-6 h-6 text-violet-500" />
                </div>
                <CardTitle className="text-2xl font-heading mb-2">I need software built</CardTitle>
                <CardDescription className="text-base">
                  Hire the team behind live marketplaces, SaaS platforms and mobile apps to build your product.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-violet-500 font-semibold mt-4">
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Mentorship Card */}
          <Link href="/mentorship" className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-xl transition-transform hover:-translate-y-1">
            <Card className="h-full bg-card hover:bg-muted/50 border-border transition-colors relative overflow-hidden group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -z-10 group-hover:bg-purple-500/20 transition-colors" />
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <GraduationCap className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle className="text-2xl font-heading mb-2">I want to learn development</CardTitle>
                <CardDescription className="text-base">
                  Join our mentorship tracks and master architecture, full-stack, or leadership skills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-purple-500 font-semibold mt-4">
                  View Mentorship Tracks
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
