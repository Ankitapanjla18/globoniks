"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  headline: string;
  subhead: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export function HeroSection({
  headline,
  subhead,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 w-full h-full bg-background -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 bg-violet-600 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[30vw] h-[30vw] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 bg-purple-500 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-1/4 left-1/3 w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 bg-violet-500 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="gradient-text-hero text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black tracking-tight mb-6 max-w-5xl mx-auto leading-tight pb-1"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          {subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={primaryCtaLink}
            className="w-full sm:w-auto text-center brand-cta px-8 py-4 rounded-full text-base font-semibold shadow-lg shadow-purple-500/20"
          >
            {primaryCtaText}
          </Link>
          <Link
            href={secondaryCtaLink}
            className="w-full sm:w-auto text-center group inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold bg-transparent border border-border text-foreground hover:bg-muted transition-all"
          >
            {secondaryCtaText}{" "}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
