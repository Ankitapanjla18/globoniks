"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-background flex flex-col items-center justify-center">
        <div className="bg-card border border-border rounded-2xl p-12 max-w-lg w-full text-center mx-4">
          <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Application Received</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for applying to the Globoniks Mentorship program. Our engineering team will review your application and respond within 48 hours.
          </p>
          <Link href="/mentorship" className="text-violet-500 font-medium hover:text-violet-400 transition-colors">
            Return to Mentorship Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <Link 
          href="/mentorship" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to mentorship
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-heading font-black tracking-tight text-foreground mb-4">
            Mentorship Application
          </h1>
          <p className="text-lg text-muted-foreground">
            Tell us about your current stack, experience level, and what you hope to achieve during the cohort.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border p-8 rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
              <input required type="text" id="firstName" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50" placeholder="John" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
              <input required type="text" id="lastName" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
            <input required type="email" id="email" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <label htmlFor="github" className="text-sm font-medium text-foreground">GitHub Profile (or Portfolio URL)</label>
            <input required type="url" id="github" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" placeholder="https://github.com/johndoe" />
          </div>

          <div className="space-y-2">
            <label htmlFor="track" className="text-sm font-medium text-foreground">Desired Track</label>
            <select required id="track" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
              <option value="">Select a mentorship track...</option>
              <option value="mern-stack">MERN Stack Mastery</option>
              <option value="mobile-app">Mobile Development</option>
              <option value="leadership">Leadership & Architecture</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="experience" className="text-sm font-medium text-foreground">Current Experience Level</label>
            <select required id="experience" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
               <option value="">Select your experience...</option>
              <option value="beginner">Beginner (1-2 projects)</option>
              <option value="intermediate">Intermediate (1-3 years)</option>
              <option value="advanced">Advanced (3+ years)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="goals" className="text-sm font-medium text-foreground">What do you want to achieve?</label>
            <textarea required id="goals" rows={4} className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" placeholder="Briefly describe your technical goals..."></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full brand-cta px-8 py-3 rounded-md text-base font-semibold shadow-lg shadow-purple-500/20 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
            ) : "Submit Application"}
          </button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            By applying, you agree to our application terms. Pricing details will be sent upon review.
          </p>
        </form>
      </div>
    </div>
  );
}
