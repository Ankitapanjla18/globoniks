"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { BUSINESS } from "@/lib/site";
import { tracks } from "@/data/mentorship";
import { PageHeader } from "@/components/ui/page";

/*
 * Honest no-backend submission, same approach as ContactForm: the previous
 * version faked an "Application Received" state on a timer while discarding
 * the data. Submit now composes the application into the applicant's email
 * app. Swaps to a real POST once a backend is chosen (NEEDS-INPUT 3.2).
 *
 * Track options come from src/data/mentorship.ts, and `?track=<slug>` (the
 * track cards link here with it) preselects one. Before 2026-10-04 the
 * options were typed out by hand and the parameter was ignored.
 */
export function MentorshipApplyForm() {
  const [handedOff, setHandedOff] = useState(false);
  const [track, setTrack] = useState("");

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("track");
    const match = tracks.find((t) => t.slug === slug);
    if (match) setTrack(match.title);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const body = [
      `Name: ${get("firstName")} ${get("lastName")}`,
      `Email: ${get("email")}`,
      `GitHub / portfolio: ${get("github")}`,
      `Track: ${get("track")}`,
      `Experience: ${get("experience")}`,
      "",
      "Goals:",
      get("goals"),
    ].join("\n");
    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
      `Mentorship application — ${get("track")}`
    )}&body=${encodeURIComponent(body)}`;
    setHandedOff(true);
  };

  const field =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500";
  const lbl = "mb-2 block text-sm font-medium text-foreground";

  return (
    <div className="min-h-screen pb-24 pt-32 md:pt-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          back={{ href: "/mentorship/", label: "All tracks" }}
          eyebrow="Mentorship"
          title="Apply for"
          accent="a track."
          lead="Tell us your current stack, your experience, and what you want to be able to build when the track ends. Every application gets a reply within one working day."
        />

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 rounded-3xl border rule bg-card/60 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={lbl}>First name</label>
              <input required type="text" id="firstName" name="firstName" autoComplete="given-name" className={field} placeholder="First name" />
            </div>
            <div>
              <label htmlFor="lastName" className={lbl}>Last name</label>
              <input required type="text" id="lastName" name="lastName" autoComplete="family-name" className={field} placeholder="Last name" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={lbl}>Email</label>
            <input required type="email" id="email" name="email" autoComplete="email" className={field} placeholder="you@example.com" />
          </div>

          <div>
            <label htmlFor="github" className={lbl}>GitHub profile or portfolio</label>
            <input required type="url" id="github" name="github" className={field} placeholder="https://github.com/username" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="track" className={lbl}>Track</label>
              <select required id="track" name="track" value={track} onChange={(e) => setTrack(e.target.value)} className={field}>
                <option value="" disabled>Choose a track</option>
                {tracks.map((t) => (
                  <option key={t.slug} value={t.title}>
                    {t.title} · {t.duration}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="experience" className={lbl}>Experience</label>
              <select required id="experience" name="experience" defaultValue="" className={field}>
                <option value="" disabled>Choose one</option>
                <option value="Beginner (1-2 projects)">Beginner (1–2 projects)</option>
                <option value="Intermediate (1-3 years)">Intermediate (1–3 years)</option>
                <option value="Advanced (3+ years)">Advanced (3+ years)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="goals" className={lbl}>What do you want to be able to build?</label>
            <textarea
              required
              id="goals"
              name="goals"
              rows={5}
              className={`${field} min-h-[140px]`}
              placeholder="A few lines on where you are now and where you want to get to."
            />
          </div>

          <button type="submit" className="brand-cta inline-flex w-full items-center justify-center px-7 py-3.5 text-base font-medium">
            <Mail className="mr-2 h-4 w-4" /> Send application by email
          </button>

          <p className="text-xs text-muted-foreground">
            Sending opens your email app with the application ready to go — it
            reaches us when you hit send there. Tuition and cohort dates come
            with our reply.
          </p>

          {handedOff && (
            <p className="text-sm text-muted-foreground" role="status">
              Your email app should have opened with the application ready. We
              reply within one working day. If nothing opened, write to{" "}
              {BUSINESS.email}.
            </p>
          )}

          <noscript>
            <p className="text-sm text-muted-foreground">
              This form needs JavaScript. Without it, email your application
              to {BUSINESS.email}.
            </p>
          </noscript>
        </form>
      </div>
    </div>
  );
}
