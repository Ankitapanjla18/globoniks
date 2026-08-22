"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 text-center h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold font-heading text-foreground mb-4">Request Received</h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. A senior engineer will review your requirements and respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 lg:p-10 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
          <input required type="text" id="name" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Work Email</label>
          <input required type="email" id="email" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" placeholder="jane@company.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium text-foreground">Company Name</label>
          <input type="text" id="company" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" placeholder="Acme Corp" />
        </div>
        <div className="space-y-2">
          <label htmlFor="service" className="text-sm font-medium text-foreground">Service Required</label>
          <select required id="service" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            <option value="">Select a service...</option>
            <option value="mern">MERN Stack Development</option>
            <option value="mobile">Mobile App Development</option>
            <option value="custom">Custom Software Architecture</option>
            <option value="maintenance">Maintenance & Support</option>
            <option value="other">Other Inquiry</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="budget" className="text-sm font-medium text-foreground">Project Budget Range</label>
        <select required id="budget" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            <option value="">Select a range...</option>
            <option value="5k-10k">$5k - $10k</option>
            <option value="10k-50k">$10k - $50k</option>
            <option value="50k+">$50k+</option>
            <option value="consulting">Just Consulting</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Project Details</label>
        <textarea required id="message" rows={5} className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" placeholder="Describe your architecture requirements and goals..."></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full amber-cta px-8 py-3 rounded-md text-base font-semibold shadow-lg shadow-amber-500/20 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</>
        ) : "Request Technical Quote"}
      </button>
    </form>
  );
}
