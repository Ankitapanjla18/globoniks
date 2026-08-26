"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/site";

const WHATSAPP_DIGITS = BUSINESS.telephone.replace(/[^\d]/g, "");

/*
 * Honest no-backend submission. The previous version faked success: a 1.5s
 * timer, then "Request Received -- we will respond within 24 hours", while
 * the message was silently discarded. There is still no server endpoint
 * (NEEDS-INPUT 3.2), so submit now composes the enquiry into the visitor's
 * own email app (the address is real and monitored) with WhatsApp as the
 * alternative path -- the "alternative email/WhatsApp path" the overhaul
 * brief asks for. When a backend or form service is chosen, this swaps to a
 * real POST without touching the markup.
 */

function readForm(form: HTMLFormElement) {
  const data = new FormData(form);
  const get = (key: string) => String(data.get(key) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    service: get("service"),
    budget: get("budget"),
    message: get("message"),
  };
}

function composeBody(v: ReturnType<typeof readForm>) {
  return [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.company && `Company: ${v.company}`,
    `Service: ${v.service}`,
    `Budget: ${v.budget}`,
    "",
    v.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export function ContactForm() {
  const [handedOff, setHandedOff] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = readForm(e.currentTarget);
    const subject = `Project enquiry — ${v.service || "general"}`;
    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(composeBody(v))}`;
    setHandedOff(true);
  };

  const handleWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    const v = readForm(form);
    window.open(
      `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(
        `Project enquiry — ${v.service || "general"}\n\n${composeBody(v)}`
      )}`,
      "_blank",
      "noopener"
    );
    setHandedOff(true);
  };

  const inputCls =
    "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl p-8 lg:p-10 space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
          <input required type="text" id="name" name="name" className={inputCls} placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Work Email</label>
          <input required type="email" id="email" name="email" className={inputCls} placeholder="you@company.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium text-foreground">Company Name</label>
          <input type="text" id="company" name="company" className={inputCls} placeholder="Your company" />
        </div>
        <div className="space-y-2">
          <label htmlFor="service" className="text-sm font-medium text-foreground">Service Required</label>
          <select required id="service" name="service" className={inputCls}>
            <option value="">Select a service...</option>
            <option value="Marketplace / E-Commerce Platform">Marketplace / E-Commerce Platform</option>
            <option value="SaaS / Multi-Tenant Platform">SaaS / Multi-Tenant Platform</option>
            <option value="Operations & Compliance System">Operations &amp; Compliance System</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Maintenance & Support">Maintenance &amp; Support</option>
            <option value="Other">Other Inquiry</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="budget" className="text-sm font-medium text-foreground">Project Budget Range</label>
        <select required id="budget" name="budget" className={inputCls}>
          <option value="">Select a range...</option>
          <option value="$5k - $10k">$5k - $10k</option>
          <option value="$10k - $50k">$10k - $50k</option>
          <option value="$50k+">$50k+</option>
          <option value="Just Consulting">Just Consulting</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Project Details</label>
        <textarea required id="message" name="message" rows={5} className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" placeholder="Describe your requirements and goals..."></textarea>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="submit"
          className="brand-cta px-8 py-3 rounded-full text-base font-semibold flex items-center justify-center"
        >
          <Mail className="w-5 h-5 mr-2" /> Send via Email
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="px-8 py-3 rounded-full text-base font-semibold border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-center"
        >
          <MessageCircle className="w-5 h-5 mr-2" /> Send via WhatsApp
        </button>
      </div>

      {handedOff && (
        <p className="text-sm text-muted-foreground text-center" role="status">
          Your email or WhatsApp app should have opened with the message ready
          to send — it reaches us once you hit send there. If nothing opened,
          write to {BUSINESS.email} directly.
        </p>
      )}

      <noscript>
        <p className="text-sm text-muted-foreground text-center">
          This form needs JavaScript. Without it, email us at {BUSINESS.email}{" "}
          or call {BUSINESS.telephone}.
        </p>
      </noscript>
    </form>
  );
}
