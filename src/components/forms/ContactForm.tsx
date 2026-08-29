"use client";

import { useState } from "react";
import { BUSINESS } from "@/lib/site";

const WHATSAPP_DIGITS = BUSINESS.telephone.replace(/[^\d]/g, "");

/*
 * Four fields, one primary action. No budget gate, no "quote" language:
 * the owner found the previous form pushy, and current practice favours a
 * short, conversational first contact. Submission composes the message
 * into the visitor's own email app (no backend yet -- NEEDS-INPUT 3.2);
 * WhatsApp is offered as a plain alternative, not a competing button.
 */

const INTERESTS = [
  "A marketplace or e-commerce platform",
  "A SaaS / multi-tenant platform",
  "An operations or compliance system",
  "A mobile app",
  "A white-label product (Schools, Jewellery)",
  "Maintenance for an existing system",
  "Not sure yet — just exploring",
];

function readForm(form: HTMLFormElement) {
  const data = new FormData(form);
  const get = (k: string) => String(data.get(k) ?? "").trim();
  return { name: get("name"), email: get("email"), interest: get("interest"), message: get("message") };
}

function compose(v: ReturnType<typeof readForm>) {
  return [`Name: ${v.name}`, `Email: ${v.email}`, `Looking for: ${v.interest}`, "", v.message].join("\n");
}

export function ContactForm() {
  const [handedOff, setHandedOff] = useState<"email" | "whatsapp" | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = readForm(e.currentTarget);
    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
      `Hello from ${v.name || "the website"}`
    )}&body=${encodeURIComponent(compose(v))}`;
    setHandedOff("email");
  };

  const handleWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    window.open(
      `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(compose(readForm(form)))}`,
      "_blank",
      "noopener"
    );
    setHandedOff("whatsapp");
  };

  const field =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500";
  const lbl = "mb-2 block text-sm font-medium text-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={lbl}>Name</label>
          <input required type="text" id="name" name="name" autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={lbl}>Email</label>
          <input required type="email" id="email" name="email" autoComplete="email" className={field} placeholder="you@company.com" />
        </div>
      </div>

      <div>
        <label htmlFor="interest" className={lbl}>What are you looking for?</label>
        <select required id="interest" name="interest" defaultValue="" className={field}>
          <option value="" disabled>Choose one</option>
          {INTERESTS.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={lbl}>A few lines about it</label>
        <textarea
          required
          id="message"
          name="message"
          rows={5}
          className={`${field} min-h-[140px]`}
          placeholder="What it is, who it's for, and where you are with it. Rough is fine."
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-violet-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Send message
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          or send it on WhatsApp
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        Sending opens your email app with the message ready to go — it reaches
        us when you hit send there.
      </p>

      {handedOff && (
        <p className="text-sm text-muted-foreground" role="status">
          {handedOff === "email" ? "Your email app" : "WhatsApp"} should have
          opened with the message ready. We reply within one working day.
          If nothing opened, write to {BUSINESS.email} directly.
        </p>
      )}

      <noscript>
        <p className="text-sm text-muted-foreground">
          This form needs JavaScript. Without it, email {BUSINESS.email} or
          call {BUSINESS.telephone}.
        </p>
      </noscript>
    </form>
  );
}
