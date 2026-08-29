# Growth roadmap — international clients and larger companies

Prepared 2026-08-30. A working list, not a strategy deck: what larger and
international buyers actually check, what the site and the business are
missing against that checklist, and the concrete moves per project that
improve visibility. Everything here builds on what is verified and live today.

Effort: **S** (hours) · **M** (days) · **L** (weeks). Impact: **High / Med**.

---

## 1. The buyer's checklist

What a CTO, founder or procurement lead at a larger or overseas company checks
before shortlisting a small studio — and where Globoniks stands.

| Check | Now | Move | Effort | Impact |
|---|---|---|---|---|
| Named clients and quotes | 1 named (Tricity Life Insurance); 0 quotes | Get the EduMapping and Homekrafted reviews you offered; ask Subhash Panjla for two sentences | S | **High** |
| Outcomes with numbers | None sourced | One measured number per live project, with the source (orders, placements, applications) | M | **High** |
| Faces behind the studio | Names + roles; no photos, no LinkedIn | Photos and LinkedIn links on About; founder LinkedIn active | S | **High** |
| How you work | Not stated anywhere | `/how-we-work` page: discovery → build → handover, weekly demos, comms channels, time-zone overlap | M | **High** |
| Engagement models and pricing signals | None | Fixed-scope, retainer, and a **2-week paid discovery sprint** as the low-risk entry for bigger companies | M | **High** |
| Legal pages | None (removed rather than faked) | Privacy, Terms; NDA- and MSA-ready; IP assignment stated (matters more now that you sell white-label products) | M | **High** |
| Security & data posture | ISO claim without certificate; nothing on data | Certificate number + registrar or drop the claim; a `/security` page: access control, backups, incident handling, DPDP/GDPR data-processing statement | M | **High** |
| Third-party proof | No Clutch/GoodFirms, no Google Business Profile | Clutch + GoodFirms profiles; Google Business Profile with reviews | S | **High** |
| Product demos | Demo tenants exist; no credentials offered | "Try the demo" with sandbox logins for Schools and Jewellery; 60-90 s walkthrough videos | M | **High** |
| International payments & contracts | Not addressed | USD/GBP/EUR invoicing via Stripe or Wise; SOW template; payment schedule | S | Med |
| Reachability for overseas buyers | WhatsApp-first, phone in IST | Add a booking link (Calendly/Cal.com) with overlap hours; keep WhatsApp for India | S | Med |
| Measurement | No analytics or Search Console | GA4 (or Plausible), Search Console, Bing, contact-event tracking — still open from the original brief | S | Med |
| Reliability signals | Products on free-tier/demo URLs | Products on real subdomains (in progress); public status page; uptime monitoring | M | Med |

---

## 2. Site and business features to build — prioritised

### P0 — Foundation (next 4 weeks)

1. **Client reviews live** — EduMapping, Homekrafted, Tricity Life Insurance. Verbatim, attributed, with permission. Surface one on the homepage. *(S, High)*
2. **Team credibility** — photos, LinkedIn, one line each on what you personally own. *(S, High)*
3. **`/how-we-work`** — process, cadence, tools, what a client receives at each stage, time-zone overlap, who they talk to. This page alone answers most first-call questions from larger companies. *(M, High)*
4. **Engagement models + discovery sprint** — a `/pricing` or "ways to work with us" section: fixed scope, monthly retainer, maintenance plans, and a paid discovery sprint with a defined deliverable. Larger companies buy a small first step, not a big bet. *(M, High)*
5. **Privacy, Terms, Security** — real pages, drafted with a template you review. IP ownership and white-label licensing terms stated plainly. *(M, High)*
6. **Analytics + Search Console + Bing + contact conversions** — you cannot improve what you do not measure. *(S, Med)*
7. **Products on real subdomains** — schools.globoniks.com is fine; jewellery needs one. Kills the 30-60 s cold start and the "demo" feel. *(S, High)*

### P1 — Credibility (1–2 months)

8. **Demo access** — sandbox credentials for Schools and Jewellery, with a "reset nightly" note; short walkthrough videos on each product row. *(M, High)*
9. **Case-study depth** — one sourced metric each; architecture diagram; screenshots once maintenance ends; client quote. *(M, High)*
10. **Clutch, GoodFirms, Google Business Profile** — set up, then route every happy client to leave a review there (verifiable, and GBP feeds Mohali local search). *(S, High)*
11. **Blog relaunch as dev-logs** — real authored posts only: "How we built a multi-tenant school platform", "Verification workflows in a matrimonial product", "Batch tracking for pharma compliance". Each is a search landing page for a service. *(M, Med)*
12. **Booking link + international contact path** — Cal.com/Calendly embed, overlap hours listed (e.g. UK/EU mornings, US East early). *(S, Med)*
13. **Founder LinkedIn cadence** — one post a week from Ankita on client work and product progress; Saksham on engineering. Larger buyers check the founders' feeds. *(S, Med)*

### P2 — Scale (this quarter and next)

14. **Product pages with plans** — per white-label product: audience, modules, plans, demo, FAQ, `Product`/`Offer` schema. *(L, High)*
15. **Public status page + uptime monitoring** for products (e.g. Better Stack, UptimeRobot). Seriousness signal for buyers considering white-label. *(S, Med)*
16. **Partner / reseller programme page** for white-label — schools consultants, jewellery retail networks. *(M, Med)*
17. **Free technical audit offer** as the lead magnet for Maintenance & Support — a written report in 5 working days. *(M, Med)*
18. **Accessibility statement** + WCAG 2.1 AA conformance note (the site already scores well). *(S, Med)*
19. **Newsletter via a real provider**, only once there is a dev-log cadence to feed it. *(S, Low)*

---

## 3. Project-by-project: features and changes for better visibility

### Homekrafted (live · marketplace)
- **Fix the vendor personal-email exposure** on the gifts grid — a real PII issue on a live site, and a trust risk if a prospect notices. *(S, High)*
- "Built by Globoniks" credit link in the footer — a backlink from a live product, the cheapest SEO win available. *(S, High)*
- One sourced metric: vendors onboarded or monthly orders. *(S, High)*
- Screenshots once maintenance ends; app-store links when the app launches. *(S, Med)*
- `Product`/`Offer` schema on product pages; per-category meta descriptions; a Google Business Profile for the marketplace itself. *(M, Med)*

### TricityMatch (live · matrimonial)
- **Server-render or prerender the marketing pages** — crawlers currently receive "JavaScript Required". Until fixed, it cannot rank and cannot be cited as an SEO success. *(M, High)*
- Drop "the most trusted matrimonial platform" from its own copy, or source it. *(S, Med)*
- Credit link; app-store links at launch; a verification metric with source (profiles verified per month). *(S, Med)*
- `Organization` + `WebSite` schema; a short "how verification works" page — it is the product's differentiator and a search term. *(M, Med)*

### EduMapping (live · placement platform)
- Confirm the live site is still your build and the stack (`stackVerified: false`). *(S, High)*
- Institution logos or a placement-cell quote, with permission. *(S, High)*
- Credit link; dashboard screenshots with demo data; highlight the public demo. *(S, Med)*

### Tricity Life Insurance (live · named client)
- **Ask Subhash Panjla for a quote** — the one named client, the easiest testimonial to get. *(S, High)*
- Applications-generated metric with source; credit link. *(S, Med)*

### Globoniks Schools (live · product)
- Real domain (in progress); replace the "ES" PWA icon with the new mark. *(S, High)*
- Demo credentials + 60 s walkthrough; dashboard screenshots with dummy data. *(M, High)*
- First pilot school — even one, named, with a quote — turns "offered" into "in use". *(L, High)*
- Product page with plans; SEO landing pages ("school management system" + city/state); an honest comparison page. *(M, Med)*

### Jewellery E-Commerce Platform (live demo · product)
- Give it a name; move to a subdomain. *(S, High)*
- Replace AI-generated stock imagery with real or clearly labelled placeholder product shots. *(S, Med)*
- Confirm payment-gateway integration (the copy claims cart and accounts only). *(S, Med)*
- Demo credentials, product page, plans. *(M, Med)*

### Pharmaceutical Supply Chain (delivered · white-label planned)
- Name the compliance frameworks the build satisfied (only if true) — the single most valuable line for regulated-industry buyers. *(S, High)*
- Sanitised screenshots with dummy data; one outcome number with client sign-off. *(M, High)*
- White-label readiness plan: tenant model, deployment, support — then flip the stage to "offered". *(L, High)*
- Industry landing page: "operations platform for pharma manufacturers". *(M, Med)*

### Direct Sales Agent Management (delivered)
- Industry/region label under confidentiality; one outcome; dummy-data screenshots. *(S, Med)*
- It is already multi-tenant — candidate for a third white-label product. *(L, Med)*

### NEET College Predictor (internal)
- Dummy-data screenshot and a method note (what data, how it maps). *(S, Med)*
- **Consider a public launch as a lead magnet** for the education vertical — it feeds both EduMapping and Schools conversations, and a free tool earns links. *(L, High)*

---

## 4. Cross-cutting visibility moves

- **"Built by Globoniks" on every live product and client site** (with permission) — backlinks plus attribution, the highest-leverage cheap move on this list.
- **Google Business Profile** for Globoniks (Mohali local search) and reviews routed there.
- **Structured data on the products themselves** (`Organization`, `Product`, `SoftwareApplication`) so the products and the studio connect as entities.
- **Consistent naming** everywhere: Globoniks (brand), product names, founder names — same spelling on LinkedIn, GBP, Clutch, product footers.
- **Screenshots return** when maintenance ends — real UI beats logos for depth, and the capture process is already documented.

---

## 5. Sequencing

**30 days** — reviews live, team photos/LinkedIn, `/how-we-work`, legal pages drafted, analytics installed, jewellery on a subdomain, Homekrafted email fix, "Built by Globoniks" credits, Subhash Panjla quote.

**60 days** — discovery-sprint offer, `/security`, demo credentials + videos, Clutch/GBP live, two dev-log posts, booking link, TricityMatch prerendering.

**90 days** — product pages with plans, first pilot school, status page, pharma compliance line + white-label readiness, predictor launch decision.
