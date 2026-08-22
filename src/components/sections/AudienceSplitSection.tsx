import Link from "next/link";
import { Code2, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function AudienceSplitSection() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Enterprise Card */}
          <Link href="/services" className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-xl transition-transform hover:-translate-y-1">
            <Card className="h-full bg-card hover:bg-muted/50 border-border transition-colors relative overflow-hidden group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -z-10 group-hover:bg-indigo-500/20 transition-colors" />
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <Code2 className="w-6 h-6 text-indigo-500" />
                </div>
                <CardTitle className="text-2xl font-heading mb-2">I need software built</CardTitle>
                <CardDescription className="text-base">
                  Hire our elite MERN stack and mobile development team to bring your product to life.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-indigo-500 font-semibold mt-4">
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Mentorship Card */}
          <Link href="/mentorship" className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 rounded-xl transition-transform hover:-translate-y-1">
            <Card className="h-full bg-card hover:bg-muted/50 border-border transition-colors relative overflow-hidden group-hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-10 group-hover:bg-amber-500/20 transition-colors" />
              <CardHeader>
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <GraduationCap className="w-6 h-6 text-amber-500" />
                </div>
                <CardTitle className="text-2xl font-heading mb-2">I want to learn development</CardTitle>
                <CardDescription className="text-base">
                  Join our mentorship tracks and master architecture, full-stack, or leadership skills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-amber-500 font-semibold mt-4">
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
