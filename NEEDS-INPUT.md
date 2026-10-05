# NEEDS-INPUT

Everything on this list is content I could not supply without inventing it.
Nothing here has been filled with a plausible-sounding placeholder.

Ordered roughly by how much it blocks. Add answers inline under each item.

---

## 1. Blocking — content that is currently fabricated and still live

### 1.1 Blog -- removed entirely (2026-08-24)

Owner decision: blog section removed for now. All blog URLs 404; content
recoverable from git history. When real articles with real authors exist,
the section returns. Original concern kept below for the record.

### (was 1.1) The blog article was fabricated

**Update 2026-08-23:** the route is now bounded -- only
`/blog/abandoning-redux-for-zustand` exists (the one post with a body);
the three title-only stubs are unpublished in `src/data/posts.ts` and 404,
as does any other slug. The authenticity question below still stands for
the remaining article.

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

### 1.2 Team -- resolved 2026-08-27, Kapila added 2026-10-02

**Ankita — Founder & Director, Client Relations**, **Kapila — Director,
Operations** (remit chosen at owner's "operations, or whatever feels right")
and **Saksham Panjla — Lead Developer** (designation chosen at owner's "give
him any designation"). Still pending: photos for all three (cards show
initials) and LinkedIn URLs -- the last step of the credibility layer.

Confirm for Kapila: surname, if it should be shown (the card reads just
"Kapila", matching "Ankita"); and whether "operations" is right. Saksham was
left on the site as Lead Developer -- say so if that has changed.

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

### 1.5 Tricity Life Insurance and NEET College Predictor (added 2026-08-23)

**tricitylifeinsurance.com** -- verified live, in the portfolio.
Resolved (2026-08-23): client verified, naming and linking allowed -- the
case study now shows "Subhash Panjla — LIC Career Mentor" as the first
named client in the portfolio. Still useful: engagement scope, timeline,
and any measurable outcome (applications generated, etc.) with a source.

**NEET College Predictor** -- resolved in part (2026-08-23): it is an
internal tool, no public URL by design; the case study now says so. Still
useful:
- Actual stack, and what the prediction approach is (so the case study can
  say something concrete without overclaiming "AI")
- A screenshot with dummy data would prove it exists without exposing it

Note (2026-08-27): live-site screenshots were captured and then removed at
the owner's direction (sites under maintenance; logos used instead). When
maintenance ends, say the word and fresh screenshots go back in -- one
caution on file: the Homekrafted gifts grid publicly renders a vendor's
personal email address as a vendor name; any future capture must avoid or
mask it.

**Marketing co-founder tool** -- on the roadmap section as "Next on the
roadmap". When it has a name and a first shipped capability, send them and
it graduates from roadmap to portfolio. Do not announce features before
they exist.


### 1.6 Globoniks Schools (added 2026-08-29) -- on the Products page

Verified live at school.globoniks.com (React SPA on nginx; PWA). The public
site is a demo school tenant ("G Schools"); the case study and product card
say so. Copy uses only the modules and screens observed on the site. Need:
- **Logo -- interim one generated 2026-08-30** at your request: brand-violet
  mark with a mortarboard + stacked wordmark, in two variants in
  `public/logos/` (dark-site version, and `-light` for the app's own white
  UI). Regenerate with `python scripts/generate-schools-logo.py`; replace both
  files when a designed mark exists. The app's PWA icon is still the generic
  "ES" square -- swap it for the light variant when convenient.
- Backend / database / hosting stack (only React + nginx are stated).
- Origin: why it was built, and whether any real school runs on it yet.
- What "white-label" includes in practice: own domain? school branding/theme?
  the mobile install? Currently phrased as "your school's own tenant".
- Demo credentials, if prospects should be able to log in and click around.
- First school deployments, when live -- they replace "will be listed here".

### 1.7 Jewellery E-Commerce Platform (added 2026-08-29) -- on the Products page

Verified live at luxury-ecommerce-frontend.onrender.com (React SPA behind
Cloudflare on Render). It runs as a demo storefront under the placeholder
brand "ECOM Fine Jewelry"; the copy says so. Need:
- **A product name** -- it is listed under the descriptive title "Jewellery
  E-Commerce Platform" because none was given.
- **A proper domain** for the demo -- you confirmed (2026-08-30) both Schools
  and the jewellery demo are moving to a server + subdomain. When the new
  URLs exist, update `liveUrl` on both entries in `src/data/projects.ts`;
  nothing else needs touching. Until then the onrender.com URL stays (it
  spins down when idle, so first loads can take 30-60 s).
- Backend / payments: the demo shows cart, wishlist and accounts; whether a
  real payment gateway is integrated is not stated anywhere, so the copy
  does not claim it. Confirm and it goes in.
- Logo, if a product mark exists.

### 1.8 FuzzBall Factory (added 2026-10-02) -- in the portfolio

Verified live at fuzzballfactory.com (Next.js with ISR on nginx/Ubuntu;
Razorpay and Cloudinary named in its Content-Security-Policy). The case
study uses only what the site itself shows.

**Update 2026-10-04: Globoniks' own brand.** The card and case study now
read "Our own brand" where a client name would go, and the case study
links to the new offer page, **/build/online-shop/** ("Want a shop like
FuzzBall Factory?"): features as observed, what the customer must
provide, the five project stages, add-ons, FAQ. Copy in
src/data/offers.ts. Need:
- **The footer link on fuzzballfactory.com** -- paste-ready in
  CREDITS-KIT.md under "Want one like this?". Until it is on the shop,
  the offer page only gets traffic from globoniks.com itself.
- **Logo** -- the site exposes only a 64px favicon, so the card has no mark.
- Any outcome with a source (orders, work orders completed) -- the offer
  page would carry it well.
- **Confirm the requirements list** on the offer page, especially the
  Razorpay line ("PAN, a bank account and a business address; GST
  optional below the threshold") -- correct it if your onboarding
  experience differed.

**Three things on fuzzballfactory.com itself, found while reading it:**
1. **WhatsApp links are a placeholder number** -- every "Chat on WhatsApp"
   button points to `wa.me/910000000000`. Customers tapping it reach nobody.
2. **The About page still shows template text** -- "[Maker's name]",
   "[Maker photo]", "[The maker's story in their own words...]" and "Sample
   photo. The maker's own pictures go here." are live.
3. **No Globoniks credit** -- the word does not appear anywhere in the
   pages checked (home, about, shop, work orders, tracking). See
   CREDITS-KIT.md for the snippet; ask the client first.

Worth fixing 1 and 2 before pointing prospects at this case study: the
portfolio links straight to the live site.

---

## 2. Claims awaiting evidence

### 2.0 Incorporation as a private limited company (added 2026-10-02)

**Status 2026-10-04:** GST documents in process (owner). Nothing on the
site changes until the new GSTIN is issued.

The site now names the entity as **Globoniks Technologies Private Limited**
(name confirmed by the owner): footer copyright, About, the How-we-work
registration FAQ, and `legalName` in the Organization schema. Values live
in `BUSINESS` in `src/lib/site.ts`. Need:

- **CIN and date of incorporation.** Not published anywhere yet. A company is
  required to show its name, CIN and registered office on its business
  letters and website; send them and they go in the footer and the schema.
- **Registered office address**, if it differs from the Sector 68 office.
- **GSTIN -- check this one.** The published GSTIN (03CZQPA4795R1ZJ) was
  issued before incorporation and is built on an individual's PAN (fourth
  PAN character "P"). The company gets its own PAN and its own GST
  registration. The number is still shown on contact, How-we-work and in
  the schema, attached to the brand "Globoniks" rather than to the company
  name. Send the company's GSTIN when it is issued, or say if the old
  registration has been cancelled and it should come down in the meantime.
- **ISO 9001 certificate** (2.1) was issued before incorporation. Ask QRO
  whether it needs reissuing in the company's name.

### 2.1 ISO 9001:2015 -- RESOLVED 2026-08-30

Certificate supplied by the owner and wired in. This was the oldest open
item on the list: the claim had been on the site since the archived version
with nothing behind it.

| Field | Value |
|---|---|
| Standard | ISO 9001:2015 Quality Management System |
| Certificate number | 305026031682Q |
| Registrar | QRO Certification LLP |
| Certified | 16 March 2026 |
| Expires | 15 March 2029 |
| Surveillance audits due | 15 March 2027, 15 March 2028 |
| Verify | www.qrocert.org |

Live in the footer (every page), on the contact page with the verify link,
in the How-we-work FAQ, and in the Organization schema as `hasCertification`
plus a certificate-number `identifier`. Values live in `ISO` in
`src/lib/site.ts`.

**Two things to keep an eye on:**
1. **Surveillance audit due 15 March 2027.** The certificate states it is
   suspended or withdrawn if the audit is not completed within 365 days of
   the audit date. Put it in a calendar; the site asserts active
   certification.
2. **Optional:** drop the certificate PDF at `public/iso-9001-certificate.pdf`
   and say the word -- I will link it from the contact page. A buyer who can
   open the certificate trusts it faster than one who has to search a
   registrar site.

Note the certified scope is broader than the site's current positioning:
digital marketing, web development, content development and creation,
digital brand management and promotion, software and applications
development. Worth knowing if you ever take on marketing work.

### 2.1b Compliance specifics ("we follow compliance and everything")

The Operations & Compliance service page currently claims only what is
verifiable: batch tracking / audit trails / regulatory reporting delivered in
the pharma system, and GST registration. To say more, name the frameworks:
which regulations did the pharma build satisfy (e.g. specific GxP / audit
requirements)? Any data-protection posture worth stating (DPDP Act)? Send
specifics and I will state them; without specifics the site stays general
rather than inventing certifications.

### 2.1d Client reviews for EduMapping and Homekrafted (offered 2026-08-23)

You offered reviews/feedback from both clients. The site already renders an
attributed quote on each case study the moment the data exists -- nothing
needs building. What decides whether a quote builds trust or reads as
filler is the attribution and the specificity. Send, for each:

1. **The quote, verbatim, in the client's words** -- unpolished beats
   polished. One concrete detail ("the placement cell stopped using
   spreadsheets", "vendors onboard themselves now") is worth more than any
   amount of "great team, highly recommended".
2. **Name, role, company** -- all three. A quote without a person attached
   is decoration, not evidence.
3. **Their permission to publish** -- a one-line WhatsApp/email reply from
   them saying "fine to publish" is enough; keep it on file.

Stronger variants, if the relationship allows (in order of impact):
- **A LinkedIn recommendation or post** mentioning Globoniks -- publicly
  verifiable by anyone, which no on-site quote can be. Link it from the
  case study.
- **A Google review** on a Globoniks Business Profile -- third-party
  verifiable AND feeds the Mohali local-search ranking. (Requires the
  Google Business Profile from 3.1 -- worth setting up first.)
- **A 30-second phone video** of the client saying the same thing.

One caution: review stars will NOT appear in Google results for
testimonials on your own site -- Google dropped "self-serving" review rich
results in 2019. So we will not add Review/aggregateRating schema; quotes
go in as visible content, where the humans who matter actually read them.

Once real quotes exist, I would also surface one on the homepage (replacing
nothing -- adding a short attributed line under the featured work). Only
with real quotes; never before.

### 2.1e Pharma white-label -- ownership confirmed 2026-08-29

You confirmed Globoniks owns the pharma platform codebase. It is presented as
"White-label planned" (muted pill, "Planned as a white-label platform for
pharmaceutical manufacturers", "Register interest" link) -- never as
available, and the pitch never mentions the client. When you are ready to
take enquiries, flip `stage: "planned"` to `"offered"` in projects.ts and
every surface updates. Reminder: the NDA outcome line still applies.

### 2.1f Capabilities list -- trim or extend (added 2026-08-29)

The services page now has "What we build -- at a glance": 14 capability
pills in src/data/capabilities.ts, framed explicitly as things we build,
not case studies. Nine link to a shipped project as proof; five are plain
offers you said you can deliver (chatbots & conversational assistants,
automated reporting & dashboards, B2B workflow automation, mobile apps,
plus the general WhatsApp item). Remove anything you would not want a
prospect to ask for tomorrow; add anything missing.

### 2.1g How-we-work page: two policy lines to confirm (added 2026-08-30)

The new /how-we-work/ page states two sensible defaults that are policy,
not observed fact. Confirm or correct them:
- **Ownership**: "for custom builds, normally the code is yours on final
  payment; white-label products stay ours, you get your own instance and
  your data."
- **NDAs**: "Yes -- send yours, or ask for ours, before the first detailed
  conversation."
Also states: the discovery sprint is two weeks at a fixed price quoted after
the first call (no number published); calls scheduled in the client's hours.

### 2.1k Added in the consistency audit -- confirm or correct (2026-10-04)

The audit removed every claim it could not trace to the data files or to
something you confirmed. A few lines stay on the site as reasonable
defaults; correct any that are wrong:

- **Mentorship reply time: "within one working day"** (was "48 hours",
  which nothing supported). Same promise as the contact form.
- **"Monthly retainer"** as an engagement model on /how-we-work/ -- keep
  only if you will sell engineering days per month.
- **"For custom builds, your data can live in your own cloud account and
  region."** Keep only if that is how you deploy custom work.
- **Removed**, tell me if any should come back with specifics: income
  share agreements (ISA) on the mentorship page; "senior architects";
  "Elite"; "Indian clients are covered under the DPDP Act"; "Every live
  product on this site runs [tests and CI/CD]"; "No juniors learning on
  your project"; "most software agencies produce unmaintainable code".
- **Mentorship track outcomes** are now one list per track, written from
  each track's own description (src/data/mentorship.ts `outcomes`).
  Replace them with the real syllabus when you have it.
- **Live sites vs demos.** The site now counts 5 live sites (Homekrafted,
  TricityMatch, EduMapping, Tricity Life Insurance, FuzzBall Factory) and
  2 live demos (Globoniks Schools, the jewellery store), from a `demo`
  flag in projects.ts. When a real school or jeweller goes live on a
  platform, add it as its own entry -- that is the first live customer
  of the product, and worth its own case study.

### 2.1j How-we-work for overseas clients -- defaults to confirm (added 2026-10-04)

The rewritten /how-we-work/ page targets clients abroad as well as in
India. These lines are sensible defaults, not confirmed facts. Correct any
that are wrong; each lives in one place in src/app/how-we-work/page.tsx
(OFFICE_START/OFFICE_END in src/components/sections/OfficeHours.tsx).

- **Office hours: 10:00–19:00 IST, Monday to Friday.** Shown on the page
  and converted to the visitor's own time zone.
- **Invoicing in INR, USD, GBP or EUR by international bank transfer,
  milestone billing.** If you only invoice in INR, or use Wise/Payoneer/
  PayPal, say so.
- **"Exports of services are invoiced without Indian GST."** True only
  if the company files a **Letter of Undertaking (LUT)** on the GST
  portal each financial year; without one, IGST is charged and refunded
  later. File the LUT under the company's own GSTIN (see 2.0 -- the
  published one predates incorporation) or tell me to soften the line.
- **"A data-processing agreement for EU and UK clients on request,
  aligned with GDPR."** Only keep this if you will actually sign one; a
  template DPA is a short document and worth having before the first
  European enquiry.
- **Communication channel options include Slack.** Remove it if you do
  not use Slack.
- **"A short drive from Chandigarh International Airport."** Fine as
  worded; I deliberately did not state a time.

### 2.1h Client quotes -- three requests ready to send (added 2026-08-30)

TESTIMONIAL-REQUESTS.md has ready-to-send messages for Subhash Panjla,
EduMapping and Homekrafted. When a reply arrives, paste it verbatim into
the project's `quote` field; the homepage "In their words" section and the
case study render it automatically. Nothing is shown until then.

### 2.1i "Built by Globoniks" credits (added 2026-08-30)

CREDITS-KIT.md + public/badge/ carry paste-ready snippets and badge SVGs for
all six live sites, plus a one-line curl check and a per-site status table.

**Homekrafted: added 2026-08-30, but as plain text.** The footer reads
"Developed by Globoniks" inside a span with no anchor -- verified, zero `<a>`
tags to globoniks.com on the page. It gives attribution and no backlink, and
the backlink is the whole value of the item. Wrap the name in a followed
`<a href>` (no `nofollow`). Run the same check before ticking off the other
five sites.

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

### 2.2b Contact response time -- resolved 2026-08-30

Owner committed to "within one working day". Stated in the contact intro,
the meta description and the post-send note. Keep it true.

### 2.3 Do you actually offer 24/7 support?

This is a service commitment rather than a statistic, so I softened rather than
deleted it. If you genuinely staff 24/7, say so and I will restore it with the
real terms. If it is really business hours with an emergency escalation path,
tell me the actual SLA and I will state that instead.

### 2.4 Mentorship cohort dates

Every track page said "Next Cohort: Starts in 3 weeks" — a static string that
has never been updated. Replaced with "Dates on application". Give me real
cohort dates and I will show them.

### 2.5 Mentorship track durations -- resolved 2026-08-23

Track detail pages now show the per-track durations from the listing
(12/10/8 weeks) via src/data/mentorship.ts. If those listing values were
themselves wrong, correct them there.

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

### 3.2 Forms -- honest interim shipped (2026-08-24), backend still wanted

The fake success states are gone. Submit now composes the message into the
visitor's own email app (mailto to info@globoniks.com), with a WhatsApp
option on the contact form. This genuinely delivers, but a real backend or
form service (API route, Formspree, Web3Forms, or CRM) would capture
submissions without depending on the visitor's mail client -- decision
still yours.

**WhatsApp number -- confirmed 2026-10-05.** +91-9988-909-556 is on
WhatsApp (owner). It is used by the phone action bar on every page, the
contact form's WhatsApp button and the contact page.

(The blog newsletter question is moot -- the blog is removed.)

### 3.3 Analytics and verification (Phase 3)

- Google Analytics 4 measurement ID, or agreement to use Plausible instead
- Google Search Console verification token
- Bing Webmaster Tools verification token

### 3.4 Canonical host -- switched to www 2026-10-04

The live host redirects the other way from what the site assumed: the apex
`globoniks.com` 301s to `www.globoniks.com` (Cloudflare). Every canonical,
sitemap URL, og:url and schema `@id` said the apex -- each one pointing at
a redirect, which search engines treat as no canonical at all. `SITE_URL`
in src/lib/site.ts is now `https://www.globoniks.com` to match reality. If
you would rather the apex be canonical, flip the redirect at Cloudflare
(www -> apex) and change that one constant back; nothing else needs
touching.

### 3.4b Host behaviour that only you can fix (found 2026-10-04)

Checked against the live host with curl; neither can be changed from the
repo, both are in Render's Redirects/Rewrites (or Cloudflare rules):

1. **Soft 404s.** `https://www.globoniks.com/anything-made-up/` returns the
   404 page with HTTP **200**. Search engines then index junk URLs and
   treat the site's real 404s as thin content. The static export ships
   `out/404.html`; the host must serve it with a 404 status. Look for a
   catch-all rewrite (`/* -> /404.html` or `/index.html`) and remove it.
   Test: `curl -sI https://www.globoniks.com/nope/ | head -1` should say
   `404`.
2. **No trailing-slash redirect.** `https://www.globoniks.com/services`
   (no slash) returns the 404 page, status 200, instead of redirecting to
   `/services/`. Every internal link carries the slash, but any external
   link or typed URL without it lands on "This page doesn't exist". Add a
   301 rule `/:path -> /:path/` for paths without a file extension, or
   enable the host's trailing-slash option. Test: `curl -sI
   https://www.globoniks.com/services | head -1` should say `301`.

Also noticed: the deployed HTML dates from 30 August (`last-modified`
header). Everything since -- ISO details, incorporation, FuzzBall Factory,
this SEO pass -- is not live until the next deploy.

### 3.4c Off-site SEO, in order of return (2026-10-04)

Nothing below is a repo change. Each is a signal the site cannot give
itself, and together they outweigh any further on-page work:

1. **Google Search Console** -- verify `www.globoniks.com` (DNS record is
   simplest, covers both hosts), submit `/sitemap.xml`. Without this there
   is no way to see what Google indexes or which queries bring visitors.
   Bing Webmaster Tools takes the same sitemap and feeds Copilot/ChatGPT
   search.
2. **Google Business Profile** for Globoniks Technologies Private Limited
   at the Sector 68 address, category "Software company". This is the
   single largest factor for "software company in Mohali" searches and the
   map pack; the site's LocalBusiness schema is already consistent with it
   (same name, address, phone -- keep them identical).
3. **Backlinks from the products** -- CREDITS-KIT.md. Homekrafted now
   links (verified); the other six do not. Six followed links from real,
   indexed sites is more authority than this domain has today.
4. **One LinkedIn company page + founder profiles** with the exact legal
   and brand names, linked from the site once they exist (`sameAs` in the
   schema is waiting for verified URLs).
5. **Client reviews on Google and Clutch** rather than on-site quotes --
   third-party verifiable, and Google reads them.
6. **Original content with evidence** -- one case-study-depth post per
   quarter on a real engineering decision (the Homekrafted ISR setup, the
   TricityMatch verification pipeline, the FuzzBall work-order flow).
   Search and AI answer engines both now reward first-hand, specific
   pages and ignore generic "top 10 benefits of" posts. The blog route
   returns when the first real article exists.

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

- **Per-page titles/descriptions/canonicals: done as of 2026-08-23** on every
  route, verified against a running server.
- **Dynamic routes: all bounded as of 2026-08-23.** projects, services,
  mentorship tracks and blog all enumerate from src/data/* and 404 unknown
  slugs. The blog additionally publishes only the one post that has a body.
- **No images anywhere.** No `<img>` or `<Image>` element exists on the site.
  Project cards and case studies now lead with type/layout instead of a grey
  box reading `Image: edumapping-thumb.jpg`, which is a real improvement, but
  a screenshot slot still needs wiring in once real images exist.
- **sitemap.xml and robots.txt: done as of 2026-08-23** via native
  app/sitemap.ts / app/robots.ts; next-sitemap/next-seo removed.
- **`/mentorship/apply` split: done as of 2026-08-23** (client form extracted,
  page carries metadata, marked noindex). Its track options also now match the
  real track routes.
- **Framer Motion sets `opacity:0` inline in the SSR HTML** on the hero,
  featured projects and mentorship teaser. Text is indexable, but a JS-disabled
  or JS-failed render shows those blocks blank.
