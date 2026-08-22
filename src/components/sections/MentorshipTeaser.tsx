"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export function MentorshipTeaser() {
  return (
    <section className="py-24 bg-background overflow-hidden relative border-t border-border">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
          
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-500 font-medium mb-2">
              <Terminal className="w-4 h-4 mr-2" /> Cohort starting soon
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-foreground">
              Level up your engineering career.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stop watching generic tutorials. Join our rigorous, mentor-led programs in MERN stack, Mobile Dev, or Software Architecture. We teach you how to build production-grade systems.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/mentorship"
                className="inline-flex items-center justify-center brand-cta px-6 py-3 rounded-md text-base font-semibold shadow-lg shadow-purple-500/20"
              >
                View Mentorship Tracks
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ rotate: 2, y: 20, opacity: 0 }}
              whileInView={{ rotate: -2, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0A0A0A] border border-violet-500/20 rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-4 text-xs font-mono text-slate-400">~/globoniks/mentorship</div>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-green-400 mb-2">$ npx create-senior-dev</div>
                <div className="text-slate-300 mb-1">&gt; Initializing advanced curriculum...</div>
                <div className="text-slate-300 mb-1">&gt; Installing system design patterns...</div>
                <div className="text-slate-300 mb-4">&gt; Setting up 1-on-1 code reviews...</div>
                <div className="text-violet-400 font-semibold mb-1">✔ Setup Complete</div>
                <div className="text-slate-300">Run <span className="text-purple-400">`npm run start-career`</span> to begin.</div>
                <div className="mt-4 flex animate-pulse">
                  <div className="w-2 h-4 bg-slate-400"></div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
