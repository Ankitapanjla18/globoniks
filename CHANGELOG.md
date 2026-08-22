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
