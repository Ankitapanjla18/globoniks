# NEEDS-INPUT

Everything on this list is content I could not supply without inventing it.
Nothing here has been filled with a plausible-sounding placeholder.

Ordered roughly by how much it blocks. Add answers inline under each item.

---

## 1. Blocking — content that is currently fabricated and still live

### 1.1 The entire blog is fabricated

`src/app/blog/[slug]/page.tsx` serves **one hardcoded article to every blog
URL**. `/blog/anything-at-all` returns HTTP 200 with that same article under a
title derived from the slug.

The article is written in the first person as Globoniks' own engineering
experience, and is bylined:

> **Alex Vance, Lead Architect @ Globoniks** — Oct 12, 2024

**Does Alex Vance exist?** The name appears nowhere else in the codebase or the
archived site. If this is not a real person, the byline is a fabricated
attribution on fabricated technical claims about your infrastructure.

I need one of:
- **(a)** Real article bodies + real author names, or
- **(b)** Approval to delete `/blog` and `/blog/[slug]` entirely until you have
  something to publish. An empty blog is neutral; a fabricated one is a
  liability if a prospect reads it closely.

The four listed post titles and dates (Aug–Oct 2024) are also placeholders and
are now roughly two years stale.

### 1.2 Team members are literal placeholders

`src/app/about/page.tsx` renders these to visitors exactly as written:

| Displayed name | Role |
|---|---|
| `[Founder Name]` | Founder & Lead Architect |
| `[Name]` | Head of Mobile Dev |
| `[Name]` | Mentorship Director |

Need per person: **real name, role, photo, LinkedIn URL**. Square-bracket
placeholders are currently visible in production HTML.

### 1.3 Case studies — now real pages, but thin on detail

**Update 2026-08-23: rebuilt.** `/projects` and `/projects/[slug]` no longer
share one generic template. Portfolio data now lives in `src/data/projects.ts`;
each project renders only the fields it actually has, `generateStaticParams`
enumerates the five real slugs, and any other slug 404s (was: 200 with
fabricated content synthesised from the URL). "Artisan Marketplace" was
removed per your confirmation that it duplicated homekrafted.in.

Portfolio is now: **Homekrafted, TricityMatch, EduMapping** (all live) plus
**Pharmaceutical Supply Chain** and **Direct Sales Agent Management** (no
link, no client name yet).

Still missing per project — nothing below is filled with a guess, the case
study pages are just shorter than they should be without it:

- **Client name**, or `confidential — [industry], [region]` if under NDA
- **The problem**, ideally in the client's words (`challenge` field, currently unset on all five)
- **Outcome** — a real number if one exists, an honest qualitative outcome if not (`outcome` field, currently unset on all five)
- **Confirmed stack** — `stackVerified: false` on EduMapping, Pharma, and Direct Sales in `projects.ts`; their listed stacks are carried over from the archived site and unconfirmed against the actual build
- **Timeline** — no project currently has one (previously all four wrongly said "4 Months"; now correctly blank rather than wrong)
- **Screenshots** — still zero images on the entire site
- **Client quote** — name, role, company, if obtainable

Note: the archived site's EduMapping case study does not match the meta
description on edumapping.com itself. Worth checking that the live site is
still the one you built.

### 1.4 Homekrafted and TricityMatch — now on the site

Supplied 2026-08-23, added to the portfolio the same day. Confirmed: these are
**not** the same project as the removed "Artisan Marketplace" entry — two
separate builds.

**homekrafted.in** — multi-vendor marketplace for homemade food and
handcrafted gifts across Tricity. Next.js, self-hosted on nginx/Ubuntu, ISR
enabled (`x-nextjs-prerender: 1`, 300s stale time), 174 KB of server-rendered
HTML. Categories, gift hampers, meal subscriptions, corporate/bulk ordering,
WhatsApp ordering. Named vendors are public on the site: Dadi's Recipe
(Zirakpur), Home Batch (Sector 15), Cocoa Homemade (Sector 22).

This is currently the strongest provable project in the portfolio. Still need:
- Whether the client can be **named**
- Whether the public vendor names may be cited as proof
- Real timeline and team size
- Any outcome that can be measured (orders, vendors onboarded, GMV) — with a source
- A quote from the client, if obtainable

**tricitymatch.com** — matrimonial platform for Chandigarh, Mohali and
Panchkula. "Photo-verified, human-reviewed profiles." Client-rendered React
SPA behind Cloudflare. Has a full OG tag set and its own og-card.png.

**Before featuring this one more prominently, read the caveat.** The server
returns a 9 KB shell; the `<h1>` a crawler receives is literally "JavaScript
Required". The site is not indexable — the same defect Phase 1 just fixed on
globoniks.com. It is on the site now (product merit, real live link), but a
technically literate prospect can check in ten seconds and find it isn't
crawlable. Either fix its rendering (which makes it a *better* case study) or
keep it as-is and don't make any SEO claim about it.

Its own copy claims "the most trusted matrimonial platform". Do not repeat
that claim in the Globoniks case study; it is an unsourced superlative of the
same kind removed from the Globoniks title in Phase 1. The current case-study
copy avoids it.

Need: same list as homekrafted, plus a decision on the rendering caveat.


---

## 2. Claims awaiting evidence

### 2.1 ISO 9001:2015 — retained at your request

Currently displayed in the footer on every page and on the contact page:

> ISO 9001:2015 Certified Company

**Need: certificate number + issuing registrar.** Once supplied I will render
it as `ISO 9001:2015 — Cert [number], issued by [registrar]` and add it to the
Organization schema as an `identifier`. Until then the claim is unverifiable to
a reader, which for a serious buyer is worse than making no claim.

GSTIN `03CZQPA4795R1ZJ` is fine and needs nothing — normalised to uppercase.

### 2.2 Statistics removed — restore any you can source

Removed per your decision. Each is listed with what would be needed to bring it
back. See `CHANGELOG.md` for the full before/after.

| Claim | Was on | To restore, need |
|---|---|---|
| 100k student records daily, zero downtime | EduMapping card | Monitoring export or client confirmation |
| 500+ rural artisans | Artisan Marketplace card | Platform vendor count + as-of date |
| 100k+ MAU / 100k Monthly Active Users | Blog | Analytics screenshot; also which app |
| 99.99% uptime | Blog | Uptime monitor report + measurement window |
| 60% boilerplate reduction | Blog | Before/after LOC |
| 12% acceptance rate | Mentorship | Applications received vs. offers made |
| Cohorts limited to 10 developers | Mentorship | Confirm the real cap |
| 24/7 dedicated engineering support | Services | **Is this real?** See 2.3 |

Also removed from the archived site and **not** carried into the rewrite:
100% client satisfaction (×4 variants), 100% job placement rate, 3× average
salary increase, 2 weeks average job hunt, 95% satisfaction rating, 30% faster
delivery, 35% production cost reduction, 15+ projects delivered (only 4 are
shown), 50+ technologies mastered.

### 2.3 Do you actually offer 24/7 support?

This is a service commitment rather than a statistic, so I softened rather than
deleted it. If you genuinely staff 24/7, say so and I will restore it with the
real terms. If it is really business hours with an emergency escalation path,
tell me the actual SLA and I will state that instead.

### 2.4 Mentorship cohort dates

Every track page said "Next Cohort: Starts in 3 weeks" — a static string that
has never been updated. Replaced with "Dates on application". Give me real
cohort dates and I will show them.

### 2.5 Mentorship track durations

Track pages hardcoded "12 Weeks" for every track, but the listing says MERN
Stack Mastery is 12 weeks, Mobile Development 10, Leadership & Architecture 8.
Confirm the three durations and I will wire them per track in Phase 2.

---

## 3. Missing infrastructure and accounts

### 3.1 Social profiles — `sameAs` is deliberately empty

The archived site's structured data asserted these. I have **not** included
them because I cannot verify they exist:

- `https://www.linkedin.com/company/globoniks`
- `https://twitter.com/globoniks` (and the `@globoniks` handle)
- `https://github.com/globoniks`

Confirm which are real, and send any others (Instagram, Clutch, Google Business
Profile). A Google Business Profile in particular matters a lot for the Mohali
local search you are targeting.

### 3.2 Both forms submit nowhere

Neither the contact form nor the mentorship application form has a backend.
There is no API route in the app. Submissions are silently lost today.

Need a decision: an API route emailing `info@globoniks.com`, or a third-party
form service (Formspree, Web3Forms), or a CRM endpoint.

The newsletter signup on `/blog` has no mailing-list provider either — same
question, or approval to remove it.

### 3.3 Analytics and verification (Phase 3)

- Google Analytics 4 measurement ID, or agreement to use Plausible instead
- Google Search Console verification token
- Bing Webmaster Tools verification token

### 3.4 Canonical host

I have set canonicals to `https://globoniks.com` (no `www`), matching the
archived site. Both hosts currently resolve — a 301 from `www` to the apex
needs configuring at your DNS/host, which I cannot do from the repo.

### 3.5 Clutch.co

The footer had a "Clutch.co Widget Placeholder". Removed. Do you have a real
Clutch profile to embed?

---

## 4. Content with no home

Flagged rather than deleted, per your rule.

- **`/privacy` and `/terms`** — the footer linked to both; neither route exists,
  so both were sitewide 404s. I removed the links rather than write invented
  legal copy. These need real content (Phase 4). Their absence is noticed by
  serious buyers.
- **`old-site-archive/feedapp/`** — five images (`lilac_ig.jpg`,
  `lilac_confec.jpg`, `screens.png`, `OFFICE EMPLOYEE.png`, a WhatsApp export)
  referenced nowhere by the old site. Are these screenshots of the Artisan
  Marketplace project? If so they are the only real project imagery that exists
  and should be used.
- **`temp-app/`** — a stray untouched `create-next-app` scaffold with its own
  `node_modules`. Gitignored, never committed. Safe to delete; confirm and I
  will.
- **`old-site-archive/sitemap.xml`** still lists the old hash URLs
  (`/#services`, `/#about`) which no longer exist.

---

## 5. Known defects deferred to Phase 2/3

Recorded here so they are not forgotten. No input needed.

- **Every page shares one `<title>` and description.** No page exports
  `metadata`; no canonicals except the root. This is the single largest
  remaining SEO problem.
- **Dynamic routes are unbounded — fixed for `/projects/[slug]`, still open for
  blog and mentorship.** `/projects/<anything>` now 404s via
  `generateStaticParams` + `dynamicParams = false`. `/blog/<anything>` and
  `/mentorship/<anything>` still return 200 with synthesised content — same
  fix needed there.
- **No images anywhere.** No `<img>` or `<Image>` element exists on the site.
  Project cards and case studies now lead with type/layout instead of a grey
  box reading `Image: edumapping-thumb.jpg`, which is a real improvement, but
  a screenshot slot still needs wiring in once real images exist.
- **No `sitemap.xml` or `robots.txt`.** `next-sitemap` is installed but never
  runs. I plan to drop it for Next's native `app/sitemap.ts` and `app/robots.ts`.
- **`/mentorship/apply` is a whole-page client component** for a small
  interactive bit, which structurally prevents it from exporting metadata.
  `/projects` was the same issue and is now fixed — the filter lives in
  `ProjectFilter.tsx`, a client child, while the page itself is a Server
  Component with its own metadata. Same pattern applies here.
- **Mentorship apply form track values don't match the track routes**
  (`mern-stack` vs `mern-track`, `mobile-app` vs `mobile-track`).
- **Framer Motion sets `opacity:0` inline in the SSR HTML** on the hero,
  featured projects and mentorship teaser. Text is indexable, but a JS-disabled
  or JS-failed render shows those blocks blank.
