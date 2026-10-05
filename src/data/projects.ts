/**
 * Portfolio data.
 *
 * Rule for this file: every field is optional except the ones that describe
 * what the project is. If a fact is not known, the field is left out and the
 * page renders without it. Nothing here may be a plausible-sounding guess --
 * that is how the previous site ended up claiming four different projects had
 * identical four-month timelines.
 *
 * Case-study copy sources: the live sites themselves (features observed
 * directly), the archived site's own project descriptions, and facts stated
 * by the owner. No invented metrics, no invented client words.
 *
 * Imagery: product logos only, at the owner's direction (2026-08-27) -- the
 * live sites are under maintenance, so UI screenshots would go stale.
 * Missing fields per project are tracked in NEEDS-INPUT.md.
 */

export type ProjectClient =
  | { kind: "named"; name: string }
  /** Under NDA. Rendered as "Confidential - {industry}, {region}". */
  | { kind: "confidential"; industry: string; region: string };

/** Multi-paragraph sections render one <p> per array entry. */
export type Prose = string | string[];

export type Project = {
  slug: string;
  title: string;
  /** One or two sentences. Shown on the card and as the case-study lead. */
  summary: string;
  /** Shown on the card as tech pills, and in the case-study sidebar. */
  stack: string[];
  /**
   * False when the stack is carried over from the previous site and has not
   * been confirmed against the actual build. Drives a NEEDS-INPUT entry
   * rather than any user-facing text.
   */
  stackVerified: boolean;
  liveUrl?: string;
  client?: ProjectClient;
  /**
   * A brand Globoniks owns and runs itself (not client work, not a
   * white-label platform). Rendered as "Our own brand" where a client name
   * would go. FuzzBall Factory: owner confirmed 2026-10-04.
   */
  ownBrand?: true;
  /**
   * The public URL is a demo deployment of a platform we offer, not a
   * business trading on it (Schools runs a demo school, the jewellery
   * platform a placeholder brand). Demos are counted and badged separately
   * from live sites everywhere -- before 2026-10-04 the hero counted one
   * demo as live and left the other out, so pages disagreed on the total.
   */
  demo?: true;
  /** The product's own brand mark, served from public/logos/. `mark` is an
   *  optional square-only variant for small tiles (rows), where a wide
   *  wordmark would be illegible. */
  logo?: { src: string; alt: string; mark?: string };
  /** Longer opening paragraph for the case-study page. */
  overview?: string;
  /** Case-study body. Omitted sections are not rendered at all. */
  challenge?: Prose;
  approach?: Prose;
  outcome?: Prose;
  timeline?: string;
  quote?: { text: string; name: string; role: string; company: string };
  /**
   * Set only on platforms Globoniks owns and can offer to new customers under
   * their own name. Presence IS the claim "we offer this" -- never set on
   * client work unless the studio has confirmed it holds the rights. Pharma:
   * ownership confirmed by the owner 2026-08-29; stage "planned".
   */
  whiteLabel?: {
    /** offered = built, running, enquiries open now. planned = stated intent. */
    stage: "offered" | "planned";
    /** Plural noun: "schools", "jewellers". Used in pills and CTA copy. */
    audience: string;
    /** One or two honest sentences matching the stage. Rendered verbatim. */
    pitch: string;
    /** Module names exactly as observed on the product. Rendered as pills. */
    modules?: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "homekrafted",
    title: "Homekrafted",
    summary:
      "A multi-vendor marketplace for homemade food and handcrafted gifts, connecting home kitchens across Tricity with customers nationwide.",
    stack: ["Next.js", "React", "Nginx"],
    stackVerified: true,
    liveUrl: "https://homekrafted.in",
    logo: { src: "/logos/homekrafted.svg", alt: "Homekrafted logo" },
    overview:
      "Homekrafted brings independent home kitchens and makers onto a single storefront. Vendors keep their own identity and location on the platform, while customers browse by category or occasion, order gift hampers, subscribe to meal plans, or place corporate and bulk orders.",
    challenge: [
      "Home kitchens and independent makers had no storefront of their own. Food marketplaces are built for restaurants — commercial listings, commission structures and delivery assumptions that do not fit someone cooking from a home kitchen. And homemade food carries a constraint ordinary e-commerce ignores: it only travels as far as the kitchen can deliver, while handcrafted gifts can ship across the country.",
      "The platform had to hold both models at once — hyper-local, made-the-same-morning food and nationwide gift shipping — across many independent vendors, without burying any one of them.",
    ],
    approach: [
      "Homekrafted is a multi-vendor marketplace where each home kitchen and maker keeps its own name, location and catalogue. Customers browse by category or occasion, order gift hampers packed and priced by a single kitchen, subscribe to daily meal plans, or place corporate and bulk orders quoted by a person. A location picker keeps the food catalogue honest: it only shows food that can actually reach the customer, while gifts ship anywhere in India.",
      "The storefront is server-rendered and incrementally regenerated — category and product pages arrive as static HTML for search engines and stay fast under load while vendors update their listings. Ordering also runs over WhatsApp, where much of the customer base already is, and a companion mobile app is in final testing ahead of launch.",
    ],
    outcome:
      "Homekrafted is live at homekrafted.in and taking orders across Chandigarh, Mohali, Panchkula and Zirakpur, with independent vendors selling under their own names, gift shipping nationwide, and the mobile app nearing launch.",
  },
  {
    slug: "tricitymatch",
    title: "TricityMatch",
    summary:
      "A matrimonial platform for Chandigarh, Mohali and Panchkula, built around photo-verified and human-reviewed profiles.",
    stack: ["React", "Cloudflare"],
    stackVerified: true,
    liveUrl: "https://tricitymatch.com",
    logo: { src: "/logos/tricitymatch.svg", alt: "TricityMatch logo" },
    overview:
      "TricityMatch is a regional matrimonial platform focused on the Chandigarh, Mohali and Panchkula area. Its distinguishing feature is verification: profiles are photo-verified and reviewed by a person rather than published automatically. A companion mobile app is in final testing ahead of launch.",
    challenge:
      "Matrimonial platforms have a trust problem: unverified profiles, recycled photos, and members who may not be who they claim. For families in the Tricity, the national platforms add a second problem — matches scattered across the country, when what many families actually want is someone close enough to meet this week.",
    approach: [
      "TricityMatch treats verification as the product. Every profile earns its badge through a live selfie check matched by human review — no uploads, no shortcuts — and flagged profiles go to a safety team rather than an algorithm. Matching weighs values, lifestyle and family expectations alongside the usual criteria, and the platform deliberately serves only Chandigarh, Mohali and Panchkula.",
      "Privacy is engineered in rather than promised: conversations are encrypted in transit, phone numbers are never shared between members, and incognito browsing lets a member appear only to people they have already expressed interest in.",
    ],
    outcome:
      "TricityMatch is live at tricitymatch.com and accepting founding members, with the verification pipeline in operation and the companion mobile app nearing launch.",
  },
  {
    slug: "edumapping",
    title: "EduMapping",
    summary:
      "A placement management platform for colleges and universities, covering the full lifecycle from job posting through candidate selection.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    stackVerified: false,
    liveUrl: "https://edumapping.com",
    logo: { src: "/logos/edumapping.svg", alt: "EduMapping logo" },
    overview:
      "EduMapping connects students with employers through their institution. It handles job posting, candidate matching, interview scheduling and placement reporting in one system, so a placement cell can run a hiring cycle without spreadsheets.",
    challenge:
      "Campus placement mostly runs on spreadsheets, phone calls and notice boards. Placement cells juggle employer relationships by hand, students miss deadlines they never saw, and recruiters have no clean way to reach verified candidates across institutions — so every hiring season, the same coordination work starts again from zero.",
    approach: [
      "EduMapping puts the whole placement lifecycle into one system, with a portal for each side of the market. Placement cells manage employers, drives and candidate pipelines. Students hold verified profiles and resumes. Recruiters get a dedicated dashboard with real-time stats, filters by institution and geography, eligibility rules such as minimum CGPA, bulk application actions, and a pipeline view that tracks candidates from applied through screening, shortlist, interview and selection.",
      "The platform serves both colleges and schools, with employability workshops and career-guidance programmes running alongside the placement machinery — so institutions use it through the year, not only in hiring season.",
    ],
    outcome:
      "EduMapping is live at edumapping.com with a public demo, serving educational institutions with placement management and recruiter access.",
  },
  {
    slug: "tricity-life-insurance",
    title: "Tricity Life Insurance",
    summary:
      "A mentor-led recruitment platform for LIC insurance careers in the Chandigarh Tricity — guided application paths for agents, development officers and Bima Sakhi.",
    stack: ["Next.js", "React", "Nginx"],
    stackVerified: true,
    // Apex, not www: it is the host the site's own canonical tags declare.
    liveUrl: "https://tricitylifeinsurance.com",
    // Owner confirmed (2026-08-23): client verified, naming and linking allowed.
    client: { kind: "named", name: "Subhash Panjla — LIC Career Mentor" },
    overview:
      "Tricity Life Insurance guides people into LIC careers under a named mentor. The platform presents each career path — agent, development officer, and the women-first Bima Sakhi programme — with the guidance content up front and a WhatsApp-first application flow, meeting applicants where they already are.",
    challenge:
      "Insurance careers are usually found by word of mouth. A prospective LIC agent or Bima Sakhi has to know the right person, piece together the paths and paperwork, and decide — often with no structured guidance at all. The information exists but is scattered; the mentor exists, but only if you already know where to look.",
    approach: [
      "The platform puts a named mentor at the centre of the recruitment funnel. Each career path gets its own guided page — the story first, then the steps — including the women-first Bima Sakhi programme presented with a watch-the-story-before-you-decide flow. The application itself runs WhatsApp-first rather than behind a long form, keeping friction as low as the audience expects.",
      "The site is fully server-rendered: every career-path page arrives as complete HTML, which matters for a lead-generation platform that lives or dies on search visibility.",
    ],
    outcome:
      "The platform is live at tricitylifeinsurance.com with the guided career paths and WhatsApp application flow in operation.",
  },
  {
    slug: "fuzzball-factory",
    title: "FuzzBall Factory",
    summary:
      "Globoniks' own handmade-crochet brand: an online shop with ready-to-ship and made-to-order pieces, custom work orders with a quote-and-deposit flow, and order tracking without an account.",
    // Observed 2026-10-02: Next.js with ISR behind nginx; Razorpay and
    // Cloudinary are named in the site's own Content-Security-Policy.
    // Globoniks' own brand (owner, 2026-10-04). Logo and timeline pending --
    // NEEDS-INPUT 1.8. The "want a shop like this" offer page is
    // /build/online-shop/ (src/data/offers.ts).
    stack: ["Next.js", "React", "Nginx", "Razorpay", "Cloudinary"],
    stackVerified: true,
    liveUrl: "https://fuzzballfactory.com",
    ownBrand: true,
    overview:
      "FuzzBall Factory is Globoniks' own handmade-crochet brand — whale keychains, plushies, bouquets, wearables and home pieces, made by a single maker in India — and the studio built and runs its shop. The site is the whole business: a catalogue split into ready-to-ship and made-to-order pieces, a work-order flow for custom commissions, shipping across India and worldwide, and order tracking by order number.",
    challenge: [
      "A handmade shop does not behave like ordinary e-commerce. Some pieces are on the shelf and leave in a day or two; others are only crocheted after the order, and take four to ten days. Custom requests are not products at all — they are a conversation about an idea, a price and a date.",
      "A standard storefront template hides all of that behind one “add to cart” button, and the customer finds out about the wait after paying. The shop needed to state the lead time before checkout, and to give custom work a proper process instead of a chat thread.",
    ],
    approach: [
      "The catalogue separates ready-to-ship from made-to-order, and shows the lead time on the product page, in the cart and at checkout. Custom commissions run as work orders: the customer describes the piece with reference photos, colours and a budget; the maker replies with a quote and a timeline; the customer accepts, counters or declines, pays half to start, follows progress photos, and pays the balance before dispatch.",
      "Checkout takes UPI, cards and netbanking through Razorpay, with cash on delivery limited to ready-to-ship pieces. Shipping is a flat rate within India and priced by region worldwide, shown before payment, with gift wrap and a handwritten note as an option. Orders are tracked by order number and phone or email, with no account needed.",
      "The storefront is server-rendered and incrementally regenerated — pages arrive as complete HTML and stay fast while the catalogue changes — and ships with a strict Content-Security-Policy and HSTS.",
    ],
    outcome:
      "FuzzBall Factory is live at fuzzballfactory.com with the shop, custom work orders, worldwide shipping and order tracking in place.",
  },
  {
    slug: "globoniks-schools",
    title: "Globoniks Schools",
    summary:
      "Our own multi-tenant school management system for students, teachers and parents — attendance, fees, exams, notices and portals — built to be offered to schools under their own name.",
    // Observed: React SPA served by nginx. Backend/hosting pending -- NEEDS-INPUT 1.6.
    stack: ["React", "Nginx"],
    stackVerified: true,
    liveUrl: "https://school.globoniks.com",
    demo: true,
    // Own product: no client. Interim logo generated 2026-08-30
    // (scripts/generate-schools-logo.py); replace when a designed mark exists.
    logo: {
      src: "/logos/globoniks-schools.png",
      alt: "Globoniks Schools logo",
      mark: "/logos/globoniks-schools-mark.png",
    },
    overview:
      "Globoniks Schools is the studio's own school management platform. The public site runs as a demo school tenant — “G Schools” — showing the system exactly as a school would present it: a news ticker, quick access to Admissions, the Student Portal, the Parent Portal and Notices, a Latest News section, and a login for every role. It is the platform we offer to schools under their own name.",
    challenge:
      "A school has three audiences — students, teachers and parents — and the systems that serve them usually live in separate tools: attendance in one place, fees in another, exam results in a third, announcements on a notice board. Every school needs the same set of modules, which is exactly the case for building the platform once, multi-tenant, and giving each school its own instance rather than its own project.",
    approach: [
      "The platform covers the modules a school actually runs on: Student Management, Teacher Management, Attendance Tracking, Fee Management, Exams & Marks, Homework & Assignments, and Communication — school-wide announcements and direct messaging between parents and teachers — alongside Admissions, Notices and school news. Access is role-based across Admin, Teacher, Parent and Student, and each school operates as its own tenant on shared infrastructure.",
      "It ships as a React single-page application served by nginx, installable on a phone as a progressive web app from the site's own install prompt — no app-store release needed for a school to put it on parents' home screens.",
    ],
    outcome:
      "Built and running at school.globoniks.com as a demo school tenant with the modules above in place. It is the platform we offer to schools under their own name; the first school deployments will be listed here once they are live.",
    whiteLabel: {
      stage: "offered",
      audience: "schools",
      pitch:
        "Globoniks Schools is built and running. We offer it to schools under their own name — your school's own tenant on the platform, with the student, teacher and parent portals and the modules below, deployed and supported by the team that built it.",
      modules: [
        "Student Management",
        "Teacher Management",
        "Attendance Tracking",
        "Fee Management",
        "Exams & Marks",
        "Homework & Assignments",
        "Communication",
        "Role-Based Access",
        "Admissions",
        "Notices",
        "Student Portal",
        "Parent Portal",
      ],
    },
  },
  {
    slug: "jewellery-ecommerce",
    title: "Jewellery E-Commerce Platform",
    summary:
      "A fine-jewellery storefront platform — catalogue by category, collections, wishlist, cart and accounts, with an editorial homepage — built to be offered to jewellers under their own brand.",
    // Observed: React single-page app. Backend/hosting pending -- NEEDS-INPUT 1.7.
    stack: ["React"],
    stackVerified: true,
    // Demo storefront deployment; a proper domain is pending (NEEDS-INPUT 1.7).
    liveUrl: "https://luxury-ecommerce-frontend.onrender.com",
    demo: true,
    overview:
      "A jewellery e-commerce platform running as a demo storefront under the demo brand “ECOM Fine Jewelry”. The demo shows the full shopper journey a jeweller would get under their own name: an editorial homepage, curated departments, collections filtered by category, product pages, wishlist, cart and customer login, plus a bespoke-commissions section.",
    challenge:
      "Fine jewellery sells on presentation as much as on product: a storefront has to feel like a maison, not a marketplace, while still doing the unglamorous work — categories, collections, wishlists, carts, accounts. Most jewellers face a choice between a generic template that undersells the pieces and a from-scratch build they cannot justify.",
    approach: [
      "The platform gives a jeweller the editorial storefront and the commerce machinery together. Shoppers browse departments and collections — rings, necklaces, earrings, bracelets — filter by category, open product pages, save pieces to a wishlist, and check out through a cart with a customer account. A bespoke section handles concierge-led commissions, and the homepage is built as an editorial layer over the catalogue rather than a grid of products.",
      "It is a React single-page application, deployed here as a demo storefront so the whole journey can be walked through before a jeweller commits to their own instance.",
    ],
    outcome:
      "Built and running as a demo storefront. It is the platform we offer to jewellers under their own brand; the first branded deployments will be listed here once they are live.",
    whiteLabel: {
      stage: "offered",
      audience: "jewellers",
      pitch:
        "The storefront is built and running as a demo. We offer it to jewellers under their own brand — your catalogue, your name, the same shopper journey — deployed and supported by the team that built it.",
      modules: [
        "Editorial homepage",
        "Departments & collections",
        "Category filtering",
        "Product pages",
        "Wishlist",
        "Cart & checkout",
        "Customer accounts",
        "Bespoke commissions",
      ],
    },
  },
  {
    slug: "pharma-supply",
    title: "Pharmaceutical Supply Chain",
    summary:
      "An order-to-delivery platform for pharmaceutical manufacturing, covering inventory, production scheduling, quality control and batch tracking.",
    stack: ["React Native", "Express", "MongoDB"],
    stackVerified: false,
    overview:
      "An enterprise system managing the full order-to-delivery lifecycle for a pharmaceutical manufacturer: order placement, inventory, production scheduling, quality control, packaging workflows and reporting, with the batch tracking that regulatory compliance requires.",
    challenge:
      "Pharmaceutical manufacturing cannot run on generic tooling. Every batch must be traceable end to end, quality control has to leave an audit trail rather than a checkbox, and production scheduling must respect compliance constraints that ordinary ERP systems treat as afterthoughts.",
    approach:
      "The system manages the complete order-to-delivery lifecycle — order placement, inventory, production scheduling, quality-control workflows, packaging and reporting — with batch tracking designed in from the schema up, so that a compliance review queries records instead of reconstructing them.",
    outcome:
      "Delivered as an enterprise system for a pharmaceutical manufacturer. The client is under confidentiality; scale and measured outcomes are published only with client sign-off.",
    // Owner confirmed 2026-08-29 that Globoniks owns this codebase.
    whiteLabel: {
      stage: "planned",
      audience: "pharmaceutical manufacturers",
      pitch:
        "The order-to-delivery platform Globoniks built here — batch tracking, quality-control workflows, production scheduling and reporting — is one we plan to offer to other pharmaceutical manufacturers under their own name. That offer is on our roadmap rather than ready today; if it is relevant to you, tell us and we will say exactly where it stands.",
    },
  },
  {
    slug: "saas-direct-sales",
    title: "Direct Sales Agent Management",
    summary:
      "A multi-tenant SaaS platform for direct sales organisations, handling lead management, commission calculation and team reporting.",
    stack: ["React", "Express", "AWS Lambda"],
    stackVerified: false,
    overview:
      "A cloud platform for direct sales organisations and independent agents. It covers lead management, customer relationship tracking, commission calculation, performance reporting and team collaboration across multiple tenants.",
    challenge:
      "Direct sales organisations run on people and spreadsheets: leads tracked by hand, commissions computed at month-end with the disputes to match, and no shared picture of how agents or teams are actually performing.",
    approach:
      "A multi-tenant SaaS platform where each organisation operates in isolation on shared infrastructure: lead management, customer relationship tracking, automated commission calculation, performance reporting and team collaboration, with role-based access separating agents, team leads and administrators.",
    outcome:
      "Delivered as a multi-tenant platform for direct sales organisations. Client details are under confidentiality.",
  },
  {
    slug: "neet-college-predictor",
    title: "NEET College Predictor",
    summary:
      "An internal data-prediction tool that estimates medical college admission chances from previous years' NEET ranks and cutoffs.",
    // Internal tool (owner, 2026-08-23) -- deliberately no public URL.
    // Stack still pending; see NEEDS-INPUT.md.
    stack: [],
    stackVerified: false,
    overview:
      "A prediction tool for NEET aspirants: given a rank, it estimates realistic college options based on how previous years' ranks mapped to actual admissions. Built and used as an internal tool, so it is not publicly linked — it is the studio's first shipped data-prediction product and the base for its move into applied ML.",
    challenge:
      "A NEET rank tells a student where they stand — not where they can get in. The rank-to-college mapping shifts every year with cutoffs, categories and seat matrices, and most aspirants navigate it on rumour and coaching-centre folklore.",
    approach:
      "The predictor maps a rank against how previous years' ranks actually converted into admissions, producing a realistic set of college options rather than a wishlist.",
    outcome: "In internal use as a decision-support tool.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projects a prospect can click through to and verify for themselves. */
export const liveProjects = projects.filter((p) => p.liveUrl);

/** Live sites with a real business on them -- the number the site quotes. */
export const liveSites = liveProjects.filter((p) => !p.demo);

/** Live demo deployments of our own platforms. */
export const liveDemos = liveProjects.filter((p) => p.demo);

/** Badge text for a project's public URL. */
export function liveLabel(p: { liveUrl?: string; demo?: true }): string | null {
  if (!p.liveUrl) return null;
  return p.demo ? "Live demo" : "Live";
}

/** Platforms the studio can put under a customer's own name (the Products section). */
export const whiteLabelProjects = projects.filter((p) => p.whiteLabel);

export function whiteLabelLabel(stage: "offered" | "planned"): string {
  return stage === "offered" ? "White-label" : "White-label planned";
}

/** Renders a client as display text, or null when we cannot name one. */
export function clientLabel(client?: ProjectClient, ownBrand?: true): string | null {
  if (ownBrand) return "Our own brand";
  if (!client) return null;
  return client.kind === "named"
    ? client.name
    : `Confidential — ${client.industry}, ${client.region}`;
}
