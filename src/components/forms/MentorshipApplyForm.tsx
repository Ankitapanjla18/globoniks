"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { BUSINESS } from "@/lib/site";

/*
 * Honest no-backend submission, same approach as ContactForm: the previous
 * version faked an "Application Received" state on a timer while discarding
 * the data. Submit now composes the application into the applicant's email
 * app. Swaps to a real POST once a backend is chosen (NEEDS-INPUT 3.2).
 */
export function MentorshipApplyForm() {
  const [handedOff, setHandedOff] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const track = get("track");
    const body = [
      `Name: ${get("firstName")} ${get("lastName")}`,
      `Email: ${get("email")}`,
      `GitHub / Portfolio: ${get("github")}`,
      `Track: ${track}`,
      `Experience: ${get("experience")}`,
      "",
      "Goals:",
      get("goals"),
    ].join("\n");
    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
      `Mentorship application — ${track}`
    )}&body=${encodeURIComponent(body)}`;
    setHandedOff(true);
  };

  const inputCls =
    "w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500";

  return (
    <div className="min-h-screen pt-32 pb-24">
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
              <input required type="text" id="firstName" name="firstName" className={inputCls} placeholder="Jane" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
              <input required type="text" id="lastName" name="lastName" className={inputCls} placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
            <input required type="email" id="email" name="email" className={inputCls} placeholder="jane@example.com" />
          </div>

          <div className="space-y-2">
            <label htmlFor="github" className="text-sm font-medium text-foreground">GitHub Profile (or Portfolio URL)</label>
            <input required type="url" id="github" name="github" className={inputCls} placeholder="https://github.com/janedoe" />
          </div>

          <div className="space-y-2">
            <label htmlFor="track" className="text-sm font-medium text-foreground">Desired Track</label>
            <select required id="track" name="track" className={inputCls}>
              <option value="">Select a mentorship track...</option>
              <option value="Full-Stack Web Mastery">Full-Stack Web Mastery</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Leadership & Architecture">Leadership &amp; Architecture</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="experience" className="text-sm font-medium text-foreground">Current Experience Level</label>
            <select required id="experience" name="experience" className={inputCls}>
              <option value="">Select your experience...</option>
              <option value="Beginner (1-2 projects)">Beginner (1-2 projects)</option>
              <option value="Intermediate (1-3 years)">Intermediate (1-3 years)</option>
              <option value="Advanced (3+ years)">Advanced (3+ years)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="goals" className="text-sm font-medium text-foreground">What do you want to achieve?</label>
            <textarea required id="goals" name="goals" rows={4} className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" placeholder="Briefly describe your technical goals..."></textarea>
          </div>

          <button
            type="submit"
            className="w-full brand-cta px-8 py-3 rounded-full text-base font-semibold flex items-center justify-center"
          >
            <Mail className="w-5 h-5 mr-2" /> Send Application via Email
          </button>

          {handedOff && (
            <p className="text-sm text-muted-foreground text-center" role="status">
              Your email app should have opened with the application ready to
              send — it reaches us once you hit send there. We respond within
              48 hours. If nothing opened, write to {BUSINESS.email}.
            </p>
          )}

          <noscript>
            <p className="text-sm text-center text-muted-foreground">
              This form needs JavaScript. Without it, email your application
              to {BUSINESS.email}.
            </p>
          </noscript>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Pricing details will be sent upon review.
          </p>
        </form>
      </div>
    </div>
  );
}
