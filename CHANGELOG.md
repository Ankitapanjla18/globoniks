# Changelog

## Phase 1 — Critical fixes

Branch: `phase1-foundation`.

Context worth recording: the repository contained **two** sites. The archived
single-file site in `old-site-archive/index.html` was the only thing tracked in
git; a Next.js 14 App Router rewrite existed in `src/` but had **never been
committed**. The Phase 1 defect list was written against the archived site, so
each item below notes whether it was still present in the rewrite, already gone,
or had regressed into something different.

---

### Build was broken before any of this

The rewrite did not compile. Two blockers, both fixed first so that everything
after could be verified against a real build:

- `src/app/layout.tsx` began with the literal characters `cpu` prepended to the
  first import — a syntax error in the root layout.
- `src/app/blog/page.tsx` passed an `onSubmit` handler from a Server Component,
  which Next 14 rejects at build time.

Six lint errors also blocked the build. Two of them were placeholder strings
rendering to visitors as literal source comments, so they are recorded under
content removals below rather than as housekeeping.

---

### 1.1 Navigation and dead links

Already fixed in the rewrite: the archived site's `href="#"` + `showPage()`
navigation was gone, and both nav and footer pointed at real routes. Three dead
links remained and were removed:

| Link | Where | Why removed |
|---|---|---|
| `/privacy` | Footer, every page | Route does not exist — sitewide 404 |
| `/terms` | Footer, every page | Route does not exist — sitewide 404 |
| `Live Application` → `#` | Every case study | Dead link presented as real client work |
| `Architecture Repo` → `#` | Every case study | Same |

The privacy and terms links were removed rather than pointed at invented legal
copy; real pages are a Phase 4 item and are flagged in `NEEDS-INPUT.md`.

**No `href="#"` remains anywhere in `src/`.**

### 1.2 Social share images

The archived site pointed `og:image` and `twitter:image` at
`https://globoniks.com/full%20logo.svg` — an SVG (not rendered as a share card
by Facebook, LinkedIn, WhatsApp, X or Slack), with a space in the filename, and
a square logo declared as 1200×630. Every shared link produced a blank card.

The rewrite had regressed further: no OG or Twitter tags at all, and the one
image reference in dead code pointed at an `og-image.jpg` that did not exist —
there was no `public/` directory in the project.

Fixed:

- Created `public/`, which the project had been missing entirely.
- Added `public/og-card.png` — a real 1200×630 PNG designed as a share card:
  brand rule, wordmark, one-line positioning, location and domain. No spaces in
  the filename. Regenerable via `python scripts/generate-og-card.py`.
- Wired into `og:image` (with `width`, `height`, `alt`) and `twitter:image`
  with `twitter:card=summary_large_image`.

Implementation note: this was first built as `src/app/opengraph-image.tsx` using
Next's `ImageResponse`, which is the more idiomatic approach. It was abandoned
because `@vercel/og` fails to prerender on Windows — `fileURLToPath` throws
`TypeError: Invalid URL` on the bundled font's path. A committed static PNG has
no build-time dependency and works everywhere.

Also migrated the real logo assets out of `old-site-archive/`, where they were
stranded, into `public/` with clean filenames: `logo.svg`, `logo.png`,
`icon.svg`. Added the missing `public/noise.svg`, which the hero section had
been requesting — and 404ing on — on every page load.

### 1.3 Fake geo metadata

The archived site declared `geo.position 39.50;-98.35` and
`ICBM 39.50, -98.35` — the geographic centre of the continental United States,
a placeholder — with `geo.region US`, `geo.placename United States` and
`og:locale en_US`. The real office is in Mohali, Punjab.

The rewrite had dropped all geo metadata without replacing it.

Now set to the real values, sourced from `src/lib/site.ts`:

```
geo.region     IN-PB
geo.placename  Mohali
geo.position   30.6831026;76.7254957
ICBM           30.6831026, 76.7254957
og:locale      en_IN
<html lang>    en-IN
```

### 1.4 Placeholder Google Maps embed

The archived embed URL contained fabricated tokens
(`!1d3429.1234567890123`, `4v1234567890123`) and rendered an error frame. The
rewrite had no map at all.

Rather than reinstate an iframe, the contact page now carries a **directions
link** built from the real coordinates. This was the recommended option in the
brief: it does the same job for a visitor and avoids a third-party iframe's cost
to Core Web Vitals entirely.

### 1.5 Accessibility — pinch-zoom

The archived viewport tag carried `maximum-scale=1.0, user-scalable=no`, a
WCAG 2.1 (1.4.4 Resize Text) failure. Already gone in the rewrite, which had no
viewport declaration at all and fell back to Next's default.

Now declared explicitly via `export const viewport` so the default cannot drift,
with a comment recording *why* `maximumScale` and `userScalable` are absent.

### 1.6 Keyword stuffing

All confirmed already removed by the rewrite, and verified absent from the
rendered HTML:

- The `<meta name="keywords">` tag — ~1,780 characters, ~57 phrases, built by
  repeating the brand name and then repeating the whole list again spelled as
  the misspelling "globonics".
- The **"Looking for GLOBONIKS?"** section. Worth noting what this actually was:
  in the archived site it sat inside `<section class="seo-content">` with
  `display:none` and `aria-hidden="true"` — cloaked text, not merely thin text.
- The closing `sr-only` footer paragraph telling visitors that if they searched
  "globonics" they had found the correct spelling.

The misspelling is now handled the supported way: `globonics` and `Globonics`
are declared as schema.org `alternateName` on the Organization node in
`src/lib/site.ts`. No doorway text.

### 1.7 Title

Before (98 characters, truncates in SERPs, unverifiable claim, stuffed domain):

```
GLOBONIKS - #1 Software Development Company | MERN Stack Experts | Tech Mentorship | globoniks.com
```

After (49 characters), chosen from three options:

```
Globoniks — Software Development Studio in Mohali
```

A title template (`%s | Globoniks`) is in place so Phase 2 can add per-page
titles without touching the root.

### 1.8 Unverifiable statistics

Decision taken: remove every figure that cannot be tied to a named client or a
documented measurement. Where the surrounding qualitative claim was defensible,
only the number was removed and the sentence rewritten.

Removed from the rewrite:

| Claim | Location |
|---|---|
| "over 100k student records daily with zero downtime" | EduMapping card (2 files) |
| "500+ rural artisans" | Artisan Marketplace card (2 files) |
| "100k+ MAU" / "100k Monthly Active Users" | Blog excerpt and body |
| "achieve 99.99% uptime" | Blog excerpt |
| "reduce our boilerplate by 60%" | Blog body |
| "ship features 30% faster" | Blog body |
| "Current Acceptance Rate: 12%" | Mentorship |
| "cohorts strictly limited to 10 developers" | Mentorship |
| "24/7 dedicated engineering support" | Services — softened, see below |

Two judgement calls:

- **"24/7 dedicated engineering support"** is a service commitment, not a
  measurement, so it was softened rather than deleted and flagged for a decision
  on real SLAs. If 24/7 staffing is real it should go back.
- **"100% Remote / Part-time"** on the mentorship tracks was **kept** — it
  describes the delivery format, not performance.

Also removed as simply **factually wrong**, not merely unsourced:

- Every mentorship track page displayed **"12 Weeks"**, although the tracks run
  12, 10 and 8 weeks. Removed rather than corrected, because the correct
  per-track value needs the Phase 2 data layer.
- Every track page displayed **"Next Cohort: Starts in 3 weeks"** — a static
  string that has never been updated and cannot stay true. Replaced with
  "Dates on application".

For reference, these archived-site claims were **already** absent from the
rewrite and were not reintroduced: 100% client satisfaction (four variants),
100% job placement rate, 3× average salary increase, 2 weeks average job hunt,
95% satisfaction rating, 35% production cost reduction, 15+ projects delivered,
50+ technologies mastered.

Every removal is listed in `NEEDS-INPUT.md` §2.2 with what evidence would be
needed to restore it.

### 1.9 ISO 9001:2015

**Retained at your direction**, pending certificate number and issuing
registrar, which are logged in `NEEDS-INPUT.md` §2.1. Nothing was silently
deleted.

GSTIN normalised from lowercase `03czqpa4795r1zj` to `03CZQPA4795R1ZJ` in both
places it appeared, and moved into `src/lib/site.ts` so it has one definition.

---

### Additional content removals

Three placeholder strings were shipping to visitors as visible page text:

| Text rendered to visitors | Location |
|---|---|
| `// TODO: Google Reviews Embed Placeholder` | Contact page |
| `// TODO: Add LinkedIn URL` | Every team card |
| `Clutch.co Widget Placeholder` | Footer, every page |

All three removed. The Clutch question is logged in `NEEDS-INPUT.md` §3.5.

### Structural groundwork

- **`src/lib/site.ts`** added as the single source of truth for business facts —
  address, coordinates, phone, email, GSTIN, founding year, alternate names —
  plus the Organization/ProfessionalService JSON-LD builder. These values had
  been hardcoded in several places and disagreed with each other. The file
  carries an explicit rule in its header: a value that is not known belongs in
  `NEEDS-INPUT.md`, not in this file as a guess.

  `sameAs` is deliberately **omitted**. The archived site asserted LinkedIn, X
  and GitHub profile URLs that have not been verified to exist; asserting
  unverified profiles in structured data is worse than omitting them.

- **`src/components/seo/SeoHead.tsx` deleted.** It was a Pages Router
  `next/head` pattern used without `next/head`, so in the App Router its tags
  never reliably reached `<head>` and the root layout's metadata overrode them.
  Its job is now done properly by the `metadata` export.

- Contact page details now read from `site.ts`, the address is wrapped in an
  `<address>` element, and phone and email are actionable `tel:` and `mailto:`
  links — both were inert `<span>`s on the archived site. Heading levels
  corrected from `h4` to `h2` so the page has no skipped levels.

---

### Verification

`next build` passes clean — 13 routes, no errors, no lint failures.

Rendered HTML checked against a running production server (`next start`), with
JavaScript never executed:

| Route | HTTP | Bytes | Visible text | `<h1>` |
|---|---|---|---|---|
| `/` | 200 | 51,584 | 2,418 chars | We build what others only pitch. |
| `/contact` | 200 | 31,904 | 1,355 chars | Let's talk architecture. |
| `/projects` | 200 | 35,971 | 1,720 chars | Our Engineering Portfolio. |

Head tags confirmed in the served HTML:

```html
<title>Globoniks — Software Development Studio in Mohali</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="geo.region" content="IN-PB"/>
<meta name="geo.placename" content="Mohali"/>
<meta name="geo.position" content="30.6831026;76.7254957"/>
<meta name="ICBM" content="30.6831026, 76.7254957"/>
<link rel="canonical" href="https://globoniks.com"/>
<meta property="og:locale" content="en_IN"/>
<meta property="og:image" content="https://globoniks.com/og-card.png"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:image" content="https://globoniks.com/og-card.png"/>
```

`<meta name="keywords">` count in rendered HTML: **0**.
Assets `og-card.png` (200, image/png, 25,569 B), `noise.svg` (200) and
`logo.png` (200) all serve correctly.

**Not verified, and cannot be from here:** card debuggers (LinkedIn, WhatsApp,
X), Google's Rich Results Test, and production Lighthouse all require a
deployed public URL. These need re-checking after deploy.

---

## Portfolio rebuild (2026-08-23)

Two live projects supplied — homekrafted.in and tricitymatch.com — and the
projects section rebuilt around a data layer.

- **`src/data/projects.ts`** is now the single source for portfolio data. The
  project list had been copy-pasted byte-identically into two components. Its
  rule mirrors `site.ts`: unknown fields are omitted, never guessed, and the
  pages render without them.
- **Case studies are per-project.** `/projects/[slug]` previously rendered one
  generic "Challenge/Solution" template for every project, with a hardcoded
  stack and "Timeline: 4 Months" for all four. Each project now renders only
  its own verified content; timeline is simply absent until a real one is
  supplied.
- **Bogus slugs 404.** `generateStaticParams` + `dynamicParams = false` mean
  the five real slugs prerender and anything else is a 404. Previously
  `/projects/total-nonsense-slug` returned HTTP 200 with a case study titled
  "Total Nonsense Slug Architecture".
- **`/projects` can now carry metadata.** The page was a whole-page client
  component for the sake of three filter buttons, which blocked it from
  exporting `metadata`. The filter moved to `ProjectFilter.tsx` (client child);
  the page is a Server Component with its own title, description and canonical.
- **Filter is now honest.** "Enterprise Scale / Startup Velocity" required
  assigning each project an invented category; the filter is now "All / Live
  sites", which is verifiable.
- **"Artisan Marketplace" removed** at your direction as a duplicate of
  homekrafted.in.
- **Added Homekrafted and TricityMatch** with live links. Both URLs verified
  reachable before adding. TricityMatch's case-study copy deliberately makes no
  SEO/indexability claims (see NEEDS-INPUT.md 1.4 for the caveat) and does not
  repeat the site's own "most trusted" superlative.
- **SocialProofBar reworked.** "Trusted by teams at" listed project labels as
  if they were client names ("Pharma Enterprise", "SaaS Direct Sales"), which
  proved nothing. It now shows "Live products we've built" — only the three
  clickable live sites.
- Homepage featured section now shows the three live projects from the shared
  data source instead of its own copy-pasted list.

Verification: build clean (17 routes, 5 project pages prerendered as SSG),
lint clean. Confirmed against a running server: `/projects/total-nonsense-slug`
→ 404; `/projects/homekrafted` → 200 with per-page title "Homekrafted — case
study | Globoniks" and 1,275 chars of visible no-JS text.

---

## Brand theme restored (2026-08-23)

The interim rewrite had replaced the original brand theme with a
navy/indigo/amber scheme. Restored the theme from the archived site's own CSS
variables (`old-site-archive/index.html`, `:root` at line 270):

| Token | Old site (restored) | Interim rewrite (removed) |
|---|---|---|
| Background | Black `#000` / `#0A0A0A` / `#111` | Navy `#0A0F1E` |
| Primary accent | `#8B5CF6` (violet-500) | Indigo `#4F46E5` |
| Secondary accent | `#A855F7` (purple-500) | Amber `#F59E0B` |
| Muted text | `#b3b3b3` | Slate blue-grey |
| Card borders | Purple glass `rgba(139,92,246,.2)` | Grey |
| CTA | Purple gradient pill + glow | Amber rectangle |
| Hero H1 | Animated white→purple gradient text | Plain |

Notes:

- The old brand purples are exactly Tailwind's stock `violet-500` and
  `purple-500`, so no custom color scale was needed; the interim
  `navy`/`indigo`/`amber` config overrides were removed instead.
- Amber was never part of the old brand — its only appearance in the archived
  CSS is a form-button "Sending…" loading state. All amber accents became the
  secondary brand purple; all indigo became the primary brand violet
  (mechanical sweep, 25 files).
- `.amber-cta` became `.brand-cta`: the old `.cta-button` style — 45°
  `#8B5CF6→#A855F7` gradient pill, purple glow shadow, hover lift, uppercase.
- Hero H1 got the old animated foreground→purple→white gradient text
  (`.gradient-text-hero`), built on the foreground token so it stays legible
  in light mode; disabled under `prefers-reduced-motion`.
- The hero's `animate-blob` classes had no keyframes defined anywhere — the
  background mesh was static. Added a slow drift, also reduced-motion-guarded.
- Light mode never existed on the old site; the light palette was re-tinted to
  violet-600 accents (4.5:1 on white) so a future theme toggle stays on brand.
- Dark radius/glass carried centrally through the CSS variables (`--card`,
  `--border`, `--radius: 1rem`), so all `bg-card border-border` components
  picked up the theme without per-component edits.

This also satisfies the overhaul brief's Phase 5 constraint: "Keep the
existing brand colour (#8b5cf6)".

Verification: build clean (17 routes), lint clean. Served CSS confirmed to
carry the restored dark palette and `.brand-cta` gradient; rendered homepage
has 43 violet-class occurrences and zero amber/indigo/navy remnants.

---

## Visual identity + SEO foundation (2026-08-23)

### Old-site identity, restored as-is

Each item ported verbatim from old-site-archive/index.html, not approximated:

- **Logo** -- the real full-logo SVG in navbar and footer with the old purple
  drop-shadow glow. The interim site had no logo anywhere; the brand was text.
- **Font** -- Inter only, as the old site had it. Bricolage Grotesque removed.
- **Floating stars** -- the old particle system (3px purple dots, 0 0 10px
  glow, 30 mobile / 60 desktop, randomized 4-8s float cycles) ported as
  FloatingParticles.tsx with the original keyframes; generated post-mount
  (no hydration mismatch), stilled under prefers-reduced-motion.
- **Header** -- always-on glassmorphism (95% black, 20px blur, purple-glass
  border) instead of transparent-until-scroll.
- Page wrappers/sections dropped redundant solid backgrounds so the star
  layer shows through, as on the old site. Cards/forms/menus stay solid.

### SEO foundation (document sections 2, 3.1, 3.2)

- **Every route now has its own title, description and canonical.** Before
  this, one title served all pages. Verified per-route against a running
  server.
- **All dynamic routes bounded.** services/[service], mentorship/[track] and
  blog/[slug] join projects/[slug]: enumerated from src/data/*, prerendered,
  dynamicParams=false. Any unknown slug 404s. Previously every one of these
  returned 200 with content synthesised from the URL string.
- **Data layer completed** -- services.ts, mentorship.ts, posts.ts join
  projects.ts. Copy migrated, not invented. Mentorship track pages now show
  their real per-track durations (12/10/8 weeks) from the listing data.
- **Blog bounded to reality.** Only the one post with an actual body is
  published; the three title-only stubs are kept in data as published:false
  instead of serving copies of an unrelated article. Article JSON-LD
  attributes authorship to the organization, NOT the unverified "Alex Vance"
  byline (still visible, still flagged in NEEDS-INPUT 1.1).
- **/sitemap.xml + /robots.txt** via native app/sitemap.ts / app/robots.ts,
  enumerated from the same data files that gate the routes. Removed
  next-sitemap and next-seo (installed but never ran) and their config.
- **Structured data extended** -- Service on each service page,
  BreadcrumbList on all detail pages, Article on the blog post.
- /mentorship/apply split (client form into MentorshipApplyForm.tsx) so the
  route could carry metadata; marked noindex. Its track options fixed to
  match the real routes (mern-track/mobile-track, were mern-stack/mobile-app).
- not-found.tsx added for the newly bounded routes.
- BlogCard no longer renders "Image: zustand-guide.jpg" as visible text for
  images that never existed; three decorative share buttons that did nothing
  on click were removed from the article header.

### Verification (all against next start, JavaScript never executed)

27 routes, all prerendered (zero on-demand). Each of the 12 checked routes:
HTTP 200, exactly one h1, unique title, unique canonical, 1,100-2,300 chars
of visible no-JS text. /projects/fake-x, /blog/fake-x, /mentorship/fake-x,
/services/fake-x and the unpublished /blog/resilient-microservices all 404.
robots.txt references the sitemap; the sitemap lists exactly the 20
indexable URLs (apply page correctly excluded). Build and lint clean.

Still requiring a deployed URL: Rich Results Test, share-card debuggers,
production Lighthouse, and the www-to-apex 301 (host-level).

---

## Personal touch + use-case repositioning (2026-08-23)

### Family-run story (facts from the owner)

- About: the three fabricated team cards ("[Founder Name]" plus two "[Name]"
  cards with invented roles) are gone. In their place, the confirmed story:
  family-run, the founder working side by side with their brother, founded
  2024 in Mohali. No names shown yet at the owner's choice; no headcount or
  other unconfirmed claims.
- Contact: one line above the form -- messages land directly with a founder,
  no sales layer.

### Services repositioned: use-case based, proof-led (owner directive)

"Remove MERN altogether; curate services according to the projects we've
already handled; make solutions use-case based; expertise should be visible."

- **MERN branding removed sitewide** -- hero subhead, about, contact, footer,
  audience split, mentorship teaser, both forms' options, three meta
  descriptions, and the mentorship track itself (now "Full-Stack Web
  Mastery" at /mentorship/fullstack-track; the old mern-track URL 404s).
  Technology names (React, Node, MongoDB) remain where they are facts; only
  the stack-first acronym positioning is gone. Zero MERN occurrences in
  rendered output, verified across six pages.
- **New service catalog** (src/data/services.ts), each anchored to delivered
  work via proofSlugs into the portfolio data:
  | Service | Proof |
  |---|---|
  | Marketplace & E-Commerce Platforms | Homekrafted (live) |
  | SaaS & Multi-Tenant Platforms | TricityMatch (live), Direct Sales SaaS |
  | Operations & Compliance Systems | Pharma Supply Chain, EduMapping (live) |
  | Mobile App Development | TricityMatch + Homekrafted apps (final testing) |
  | Maintenance & Long-Term Support | the live platforms staying live |
- **Service pages rebuilt**: use cases ("Built for"), deliverables ("What you
  receive"), and a "Proof -- work we can show you" section that renders the
  cited projects with live links and case-study links from the same data
  that drives the work page, so proof cannot drift from the portfolio.
- **Compliance made visible honestly**: the Operations & Compliance page
  carries a compliance note grounded in what was actually delivered (batch
  tracking, audit trails, regulatory reporting) plus the verifiable
  GST registration. No certifications invented; see NEEDS-INPUT for making
  the "we follow compliance" claim more specific.
- **Services index reframed**: "We sell what we've already shipped."
- **New fact recorded** (owner, 2026-08-23): companion mobile apps for
  TricityMatch and Homekrafted are in final testing ahead of launch. Added
  to both case studies and cited as the proof for the mobile service.
- Contact form's service dropdown now matches the real catalog.

Verification: build and lint clean; all 27 routes prerender. New service
and track URLs return 200 with correct titles; old mern-stack/mern-track
slugs 404; proof links and compliance note confirmed in rendered HTML;
sitemap carries exactly the new URL set.

---

## Two more projects + future direction (2026-08-23)

- **Tricity Life Insurance** (tricitylifeinsurance.com) added to the
  portfolio -- verified live before adding: Next.js self-hosted on
  nginx/Ubuntu, fully prerendered (10,200 chars of no-JS HTML). A mentor-led
  LIC recruitment platform for the Chandigarh Tricity with a WhatsApp-first
  application flow. Fourth live, clickable project; appears automatically in
  the live pills, the work page and the sitemap.
- **NEET College Predictor** added: estimates medical college admission
  chances from previous years' rank-to-admission data. The studio's first
  shipped data-prediction product. No URL or stack supplied yet -- listed
  without them rather than guessed (see NEEDS-INPUT); the empty stack is
  hidden rather than rendered as an empty box (guard added to ProjectCard
  and the case-study sidebar).
- **"Where we're headed" section** on the services page, deliberately
  SEPARATE from the proof-led services so unshipped work is never presented
  as a delivered capability. Three items with explicit status labels:
  applied ML & prediction products ("First product shipped", linking the
  predictor), the marketing co-founder tool ("Next on the roadmap" --
  automated social media and digital marketing across multiple domains and
  businesses), and B2B workflow automation ("Open for projects").

Verification: build and lint clean, 30 routes prerendered, both new case
studies return 200 with correct titles, roadmap section confirmed in
rendered HTML, sitemap now 23 URLs.

---

## First real imagery: live-site screenshots (2026-08-23)

The site previously contained zero images. It now carries real screenshots
of the four live products -- captured directly from the running sites with
headless Edge (Homekrafted via DevTools protocol, to dismiss its location
modal through the site's own "Skip for now" control first; EduMapping
retaken to catch its carousel between transitions).

- public/screenshots/*.webp -- 1200x750 WebP, 35-87 KB each.
- Project cards lead with the screenshot (work page + homepage featured);
  case-study pages show it full width where the old build rendered a fake
  "System Dashboard Screenshot" placeholder box.
- Rendered through next/image with explicit width/height (no layout shift)
  and lazy loading below the fold, per the document's Core Web Vitals
  requirements. Descriptive alt text on every image.
- NDA projects and the internal predictor remain type-led -- no fake
  imagery.

Verification: build and lint clean; /projects serves all four shots with
width/height attributes and lazy loading; homepage featured cards carry
three; WebP served as image/webp.

---

## Publish readiness (2026-08-24)

### Blog removed

Owner decision. One article under an unverified byline plus three stubs --
routes, data, links and sitemap entries all removed; every blog URL 404s.
Recoverable from git history when real articles exist.

### Forms made honest -- the last publish blocker

Both forms previously FAKED success: a 1.5s timer, then "Request Received
-- we will respond within 24 hours", while the message was silently
discarded. There is still no backend (owner decision pending, NEEDS-INPUT
3.2), so submit now composes the message into the visitor's own email app
(info@globoniks.com is real and monitored), with a WhatsApp alternative on
the contact form -- the alternative path the overhaul brief asks for. The
status text says exactly what happened ("it reaches us once you hit send
there"). noscript fallbacks added. Swaps to a real POST when a backend is
chosen, without touching the markup.

### Final audit fixes

- Heading hierarchy: card titles rendered h3 directly under the page h1 on
  four index pages; added section-level h2s (visually hidden where the
  design has no room for one). The roadmap section also referenced
  aria-labelledby="roadmap" with no such id -- its badge is now a real h2.
  Lighthouse accessibility: 100 on every page tested.
- Project case studies were missing BreadcrumbList JSON-LD; added.
- "Cohort starting soon" (a static string that cannot stay true) is now
  "Applications open".
- TeamMemberCard deleted -- unused since the placeholder team cards were
  replaced by the family-run story.
- package.json renamed from the scaffold's "temp-app" to
  "globoniks-website"; README rewritten from create-next-app boilerplate;
  sharp installed for production image optimization under next start.

### Audit results (against next start, JS never executed)

- 22 routes: every one returns 200 with exactly one h1, a canonical, a
  unique title, and 900-2,700 chars of visible no-JS text. All prerendered.
- 404s verified: /blog and all post URLs, all bogus slugs, the old
  mern-stack/mern-track URLs, /privacy, /terms.
- Sitemap: 21 URLs (apply page correctly noindexed and excluded), no blog.
  robots.txt references it.
- Rendered-output greps: zero MERN, zero placeholder strings, zero dead
  links, zero fabricated-stat strings, zero "Alex Vance".
- JSON-LD: ProfessionalService (home, contact), Service + BreadcrumbList
  (service pages), BreadcrumbList (case studies, tracks).
- Images: every one has alt text and explicit dimensions; screenshots lazy
  load; WebP 35-87 KB.
- Lighthouse (local, mobile, headless Edge): accessibility 100,
  best-practices 100, SEO 100 on every page tested. Performance swung
  74-98 across runs of the SAME build on this development machine --
  local perf numbers are noise; measure on the production host. The two
  flags that recur locally: LCP ~3s and 270-550ms total blocking time
  (hydration + motion). If production scores land below 90, the first
  levers are reducing the particle count and deferring framer-motion.

### Deploy checklist (the parts only the host can do)

1. Deploy: npm run build && npm start behind nginx (sharp is installed),
   or any Node host. Every route is static -- CDN-cacheable.
2. 301 www.globoniks.com -> globoniks.com at the DNS/host level.
   Canonicals already point at the apex.
3. After DNS: verify Search Console + Bing (tokens pending, NEEDS-INPUT
   3.3), submit /sitemap.xml.
4. Validate share cards against the live URL: LinkedIn Post Inspector,
   an actual WhatsApp share, X card validator.
5. Google Rich Results Test on /, /contact, one service page.
6. Lighthouse on the production URL -- the number that actually counts.
7. Analytics: still uninstalled pending the GA4-vs-Plausible decision
   (NEEDS-INPUT 3.3). The acceptance-criteria item "analytics installed
   and verified" is deliberately unmet until you choose.

---

## Team named (2026-08-27)

Owner supplied the names: Ankita Panjla (Founder & Director -- owner's
wording "director/sole prop") and Saksham Panjla. About page story now
names both; a two-card team grid replaces the anonymous story-only
treatment; the Organization schema gains its founder. Saksham's card
deliberately shows no role -- none was stated, and an invented title is how
the old site ended up with a "Mentorship Director" who didn't exist.
Photos and LinkedIn URLs still pending (NEEDS-INPUT 1.2).

---

## Detailed case studies, logos, name corrections (2026-08-27)

Owner directives in this pass: display name is "Ankita" (not Ankita
Panjla); Ankita handles client relations, Saksham handles development
(designation chosen as directed: Lead Developer); no articles for now (blog
stays removed); contact emails where useful; detailed SEO-friendly case
studies for every project; product logos instead of UI screenshots, since
the live sites are under maintenance and screenshots would go stale.

- **Names**: About story and team cards now read Ankita (Founder &
  Director — Client Relations) and Saksham Panjla (Lead Developer), with
  the split stated plainly: "Ankita owns every client relationship, Saksham
  owns the code." Founder in the Organization schema updated to "Ankita".
- **Footer** gains actionable mailto/tel contact links on every page.
- **Case studies**: every one of the seven projects now has a full
  problem / what-we-built / outcome case study (case-study pages now carry
  1,700-2,600 chars of no-JS text, up from ~900-1,300). Sections support
  multiple paragraphs. Sources: features observed directly on the live
  sites, the archived site's own descriptions, and owner-stated facts --
  no invented metrics, no invented client words. NDA projects state
  plainly that client details are published only with client sign-off.
- **Logos replace screenshots**: real brand SVGs pulled from the live
  sites for Homekrafted, EduMapping and TricityMatch (the three the owner
  named), previewed on the dark theme before wiring. Cards show a logo
  band; case-study sidebars show the mark. The screenshot files and their
  wiring are removed (one capture had exposed a vendor's personal email
  address in a product grid -- worth remembering if screenshots return
  after maintenance ends). Tricity Life Insurance has no logo asset on its
  site and stays type-led.

Verification: build and lint clean; all five checked case studies render
the three sections with no-JS text; logos serve on cards and sidebars;
zero screenshot references; names and footer links confirmed in rendered
HTML.

---

## Static export for Render (2026-08-27)

The site deploys on the existing Render Static Site service -- which was
still serving old-site-archive and cannot run a Node server. Since every
route is prerendered anyway, the app now builds as a static export
(output: 'export'): `next build` emits `out/` with one directory-plus-
index.html per route, robots.txt and sitemap.xml included.

- `trailingSlash: true` so every static host serves the routes without
  pretty-URL support; canonicals, og:urls, the sitemap and breadcrumb
  schema all updated to the same trailing-slash URLs (done now, before any
  Search Console submission, so nothing is ever indexed under a different
  form). Root stays `https://globoniks.com`.
- Images unoptimized (the optimizer endpoint needs a server; all assets
  are pre-sized SVG/WebP/PNG).
- Fixed a stale Organization-schema image pointing at the removed
  /opengraph-image route; now /og-card.png.

Verified against a plain `python -m http.server` on `out/`: all routes
serve with matching canonicals, sitemap has 21 trailing-slash URLs,
robots.txt references it.

### Render dashboard settings (the answer to "what needs to change")

| Field | Old (archived site) | New |
|---|---|---|
| Branch | main | main (unchanged) |
| Root Directory | old-site-archive | **(empty -- clear it)** |
| Build Command | (none) | **npm ci && npm run build** |
| Publish Directory | old-site-archive/. | **out** |

Also in Render: add env var NODE_VERSION=20 (build needs modern Node);
custom domains globoniks.com (primary) + www.globoniks.com -- Render then
301s www to the primary, which closes the canonical-host item; a rewrite
rule /* -> /404.html (404 type) keeps unknown paths on the branded page.

---

## Products section: white-label platforms (2026-08-29)

Owner asked for a separate section for Globoniks-owned platforms available
for white-labelling, distinct from client case studies, and confirmed
Globoniks owns the pharma codebase (white-label planned, not offered).

- **Two new products, both verified live before adding**: Globoniks Schools
  (school.globoniks.com -- multi-tenant school management, running as a demo
  school tenant) and the Jewellery E-Commerce Platform (a demo storefront on
  Render). Case studies written only from observed screens and modules; the
  demo-tenant / demo-storefront framing is stated in the copy. No logos: the
  Schools PWA icon is a generic placeholder and jewellery has none.
- **Data model**: `whiteLabel?: { stage: "offered" | "planned", audience,
  pitch, modules? }` on Project. Presence is the claim "we offer this"; the
  stage exists so intent (pharma) never renders like availability (Schools,
  Jewellery). Flipping the stage updates every surface.
- **/products/** page (own metadata, breadcrumb schema): offered products,
  an "On the roadmap" group for planned ones, and a CTA. Product cards link
  to the case study as the detail page -- no duplicate product URLs. Added
  to nav, footer and sitemap.
- **Case-study pages**: violet white-label callout (heading by stage, pitch,
  module pills, contact link), "Offered as" sidebar row, and -- for all
  projects -- a bottom CTA, which case studies had never had.
- **Cards**: stage-aware `WhiteLabelPill` on project cards and on service
  proof cards, alongside the existing LIVE / Case study state.
- **Homepage**: new "Our products, under your name" strip after the featured
  client work; the featured client row is unchanged. The live-products bar
  gains the new live entries automatically.
- **Capabilities** (owner asked whether listing features like WhatsApp
  automation and chatbots helps skimmers -- yes, if honest): "What we build
  -- at a glance" on /services, 14 pills from src/data/capabilities.ts,
  framed explicitly as capabilities not case studies; nine link to the
  shipped proof, five are plain offers. Owner trims (NEEDS-INPUT 2.1f).
- **Pharma**: `whiteLabel` with stage "planned"; every other field
  byte-identical. Pitch's subject is Globoniks and the platform it built;
  the client is never mentioned; no "licensed"/"resold" wording anywhere.
- **Contact form** gains a "White-Label Product" option.
- **Fixed a leftover defect**: the footer still linked /services/mobile-app
  and /services/custom-software -- slugs retired in the repositioning, so
  both were 404s on every page. Footer now lists the real five services.
- `/projects` meta description capped to the first three live titles (a
  sixth live project would have pushed it past SERP truncation).

Verification against the static export served by a plain http.server:
all nine checked routes 200 with exactly one h1 and a matching
trailing-slash canonical; `/products/nope/` 404s; the Schools case study
carries the callout, module pills, sidebar row and CTA in no-JS HTML;
pharma renders the planned heading and muted pill with no client mention
in the pitch; the products page shows the offered cards and the roadmap
group; capabilities render with proof links; nav/footer carry Products;
the dead footer slugs are gone; sitemap lists /products/ and both new case
studies; zero hits for licens/resold/TODO/placeholder across out/.

---

## Globoniks Schools logo (2026-08-30)

Interim logo generated at the owner's request so the product is not the
only one without a mark: brand-violet rounded square with a mortarboard,
stacked "Globoniks / SCHOOLS" wordmark. Two variants from
scripts/generate-schools-logo.py -- the dark-site version wired into the
product card, homepage strip and case-study sidebar, and a light-background
version for the app's own UI. Replace both files when a designed mark
exists. Jewellery keeps its onrender.com URL until the owner moves both
products to a server + subdomain (NEEDS-INPUT 1.7).

---

## Audit pass: Work page merge, calmer contact (2026-08-30)

Owner asked for an inconsistency audit, for Products to be clubbed into
one section with client projects (a separate grid of logo-less product
cards read thin), and for a less pushy contact section in line with
current practice.

### Work page: one page, two strips
- /products/ removed; /projects/ ("Our work") now carries two strips:
  **Client projects** (the card grid, logos where they exist) and **Our
  products, under your name** (single-column rows -- rows give the copy and
  module pills room a card would waste on an empty image band). The
  planned pharma product stays in the client strip where its case study
  belongs, with its "White-label planned" pill; the products strip points
  to it under "Planned next", so no row appears twice.
- Homepage products strip uses the same rows and links to /projects/#products.
- The All/Live filter is retired (six client cards do not need one; the LIVE
  badge already says it) -- the page is now a pure Server Component.
- Nav: Products removed, "Projects" is now "Work"; footer "Work -- projects &
  products", "Contact & Quote" is now "Contact". Sitemap back to 23 URLs.

### Contact: shorter, calmer
- Headline "Tell us what you're building." with a plain intro: you hear
  back from Ankita, not a sales team.
- Form cut to four fields -- name, email, what you're looking for (with a
  "not sure yet" option), a few lines -- one solid "Send message" button,
  WhatsApp as a text-link alternative. The required budget dropdown with
  dollar bands, the company field and all "quote" language are gone.
- Sidebar reorganised: message channels first (WhatsApp, email, call),
  then office + directions, then registration.
- The mentorship application keeps its fields but gets the same calm
  button. Still no backend: submission composes into the visitor's own
  email/WhatsApp app (NEEDS-INPUT 3.2).

### Consistency fixes from the audit
- CTA language unified: "Request a Technical Quote" (services, case
  studies) and "Get a Quote" (nav) become "Talk to us" / "Let's talk".
  Uppercase gradient pill kept for the nav and hero only; forms use a
  calm solid button.
- "Read the case study" / "Case study" unified to "Case study".
- Verified every internal link on the homepage resolves to a built page
  (the retired-slug footer links found last pass stay fixed).

Verification: static export served locally -- nine routes 200 with one h1
and matching canonicals, /products/ 404s as intended, /projects/ heading
order h1 > h2 > h3 across both strips, contact page carries the new form
and no budget/quote wording, zero stale CTA strings across out/, sitemap
23 URLs.

---

## Contact response time (2026-08-30)

Owner confirmed a reply within one working day. Stated in the contact
intro, the contact meta description and the post-send note -- the
response-time expectation the overhaul brief asked for, now with a real
commitment behind it.
