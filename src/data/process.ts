/**
 * The five stages of a project, as stated on /how-we-work/. Shared with the
 * homepage process strip so the two can never disagree. Policy lines inside
 * (fixed-price discovery, weekly demos) are the owner's commitments -- see
 * NEEDS-INPUT 2.1g.
 */

export type Stage = {
  name: string;
  when: string;
  body: string;
  receive: string[];
};

export const STAGES: Stage[] = [
  {
    name: "First conversation",
    when: "Free · 30 minutes",
    body: "You describe what you are building and where it stands; we ask the questions that decide the shape of the work. No proposal theatre — you leave knowing whether we are the right fit and what the next step costs.",
    receive: ["A straight answer on fit", "A recommended next step and its fixed price"],
  },
  {
    name: "Discovery sprint",
    when: "Two weeks · fixed price",
    body: "A short, paid engagement that turns an idea into a plan you can act on — with us or with anyone else. We interview the people involved, map the system, and settle the architecture before a line of production code is written. Larger companies use it as the low-risk first step; so should you.",
    receive: [
      "A written scope: what is in, what is out, and why",
      "An architecture outline and the stack we recommend",
      "A milestone plan with an estimate for the full build",
      "A risk list — the things most likely to bite, and how we would handle them",
      "Where it helps, a clickable prototype of the core flow",
    ],
  },
  {
    name: "Build",
    when: "Milestones · weekly demos",
    body: "Work ships in milestones you can open, not slide decks you have to trust. Every week you get a demo on a staging environment and a short written update. Testing and CI/CD are part of the baseline, never an upsell.",
    receive: [
      "A staging environment you can open at any time",
      "A weekly demo and written progress note",
      "Automated tests and a deployment pipeline from the first milestone",
    ],
  },
  {
    name: "Launch and handover",
    when: "Deployment · documentation",
    body: "We deploy, we document, and we hand over — the code, the infrastructure access, and the runbook your team needs to operate it. Nothing is held hostage.",
    receive: ["Production deployment", "Handover documentation and runbooks", "Source code and access, per the agreement"],
  },
  {
    name: "After launch",
    when: "Maintenance plans",
    body: "Software is not finished at launch. Maintenance plans cover dependency and security updates, performance work, scaling, and the small changes every live product needs — from the people who built it.",
    receive: ["Scheduled updates and monitoring", "A named engineer who knows the codebase", "An agreed response window"],
  },
];
