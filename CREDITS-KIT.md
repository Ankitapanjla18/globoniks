# "Built by Globoniks" — credits kit

A followed link from every live product and client site back to globoniks.com
is the cheapest, highest-leverage SEO move available: real backlinks from real
products, plus attribution where prospects already are. This kit is
paste-ready; the sites themselves live in other codebases.

**Ask first** on client-owned sites (Homekrafted, TricityMatch, EduMapping,
Tricity Life Insurance). On Globoniks-owned products (Schools, Jewellery,
FuzzBall Factory) just add it.

## Rules that keep the link worth having

- A normal, **followed** link (no `rel="nofollow"`, no `rel="sponsored"`).
- Link to the **www host**: `https://www.globoniks.com/`. The apex
  `globoniks.com` 301-redirects to www (checked 2026-10-04); a link that
  goes through a redirect still counts, but a direct one is cleaner.
- The `utm_*` parameters are for attribution only — the canonical tag on
  every page collapses them, so the backlink still counts for the page.
  They also show up in enquiries: the contact form adds "Found us via:
  <utm_source>" to the message.
- Visible text that says what it is: "Built by Globoniks". Not an icon alone.
- Footer placement is fine and conventional. One link per site is plenty.

## Text link (use anywhere)

```html
<a href="https://www.globoniks.com/?utm_source=SITE&utm_medium=footer&utm_campaign=credit">
  Built by Globoniks
</a>
```

Replace `SITE` per product:

| Site | utm_source |
|---|---|
| homekrafted.in | `homekrafted` |
| tricitymatch.com | `tricitymatch` |
| edumapping.com | `edumapping` |
| tricitylifeinsurance.com | `tricitylifeinsurance` |
| fuzzballfactory.com | `fuzzballfactory` |
| school.globoniks.com | `schools` |
| jewellery demo | `jewellery` |

## Badge (SVG, two variants)

Files in this repo, also served by the live site:

- `public/badge/built-by-globoniks-dark.svg` — for dark footers
- `public/badge/built-by-globoniks-light.svg` — for light footers

Copy the file into the other site (do not hotlink; a self-hosted asset never
breaks if globoniks.com changes). Then:

```html
<a href="https://www.globoniks.com/?utm_source=SITE&utm_medium=footer&utm_campaign=credit"
   aria-label="Built by Globoniks">
  <img src="/built-by-globoniks-light.svg" alt="Built by Globoniks" width="168" height="36">
</a>
```

## React / Next.js footer snippet

```tsx
<a
  href="https://www.globoniks.com/?utm_source=SITE&utm_medium=footer&utm_campaign=credit"
  className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100"
>
  Built by <span className="font-semibold">Globoniks</span>
</a>
```

## "Want one like this?" — FuzzBall Factory (and later, other own products)

A credit says who built the site. This goes further: it invites the
visitor who likes the shop to get one of their own, and sends them to a
page written for exactly that — what they are looking at, what it takes,
the steps, and what can be added: **https://www.globoniks.com/build/online-shop/**

It links to that page rather than the homepage on purpose: the visitor
has just seen the product, so the page that continues *that* thought
converts; a generic homepage makes them start over.

Put it in the fuzzballfactory.com footer, under the "Company" column or as
its own line beside "Made in India". Two variants:

**Footer line (always present)**

```tsx
<a
  href="https://www.globoniks.com/build/online-shop/?utm_source=fuzzballfactory&utm_medium=footer&utm_campaign=offer"
  className="text-sm opacity-80 hover:opacity-100"
>
  Want a shop like this? <span className="font-semibold underline">Built by Globoniks</span>
</a>
```

**About page block (optional, one paragraph under "Who is behind it")**

```tsx
<p>
  This shop was designed and built by{" "}
  <a href="https://www.globoniks.com/build/online-shop/?utm_source=fuzzballfactory&utm_medium=about&utm_campaign=offer">
    Globoniks
  </a>
  , a software studio in Mohali. If you sell something you make and want a
  shop that handles custom orders, lead times and shipping properly, they
  build these.
</p>
```

Rules for this one:

- **Followed link** — no `nofollow`, no `sponsored`. It is the owner's own
  site linking to the owner's own studio; that is an editorial link, not a
  paid one.
- **One mention in the footer is enough.** Do not add a banner, popup or
  checkout-page link: on a shop, anything between the customer and "Pay"
  costs sales, and the people this is for will find the footer.
- **Keep it out of `<head>` and structured data.** FuzzBall's Organization
  schema describes FuzzBall Factory, not Globoniks.
- `utm_medium` distinguishes the footer (`footer`) from the About page
  (`about`), so you can see which one sends enquiries.

When another own product gets an offer page (Schools, the jewellery
platform), add it to `src/data/offers.ts` — the page, sitemap entry,
llms.txt line and case-study link are generated — and add the same
footer line to that product.

## After adding — check it actually counts

**The most common mistake: shipping the credit as plain text.** "Developed by
Globoniks" in a `<span>` gives attribution and zero SEO value — a crawler
cannot follow text. It must be an `<a href>`. (This happened on Homekrafted
on 2026-08-30 and was caught on review.)

Check each site with one command:

```bash
curl -sL https://SITE | grep -o '<a[^>]*globoniks[^>]*>' | head
```

- **No output** → the credit is text only, or missing. Wrap the name in an
  anchor.
- **Output containing `nofollow`** → the link is there but explicitly
  discounted. Remove `nofollow` (keep `noopener`).
- **Output with a plain `href` to globoniks.com** → correct.

Then: open the site, click it, confirm it lands on globoniks.com. Once
Search Console is set up, the links appear under Links → Top linking sites
within a few weeks.

## Status

| Site | Credit | Linked |
|---|---|---|
| homekrafted.in | ✅ added 2026-08-30 | ✅ followed link, verified 2026-10-02 |
| tricitymatch.com | — | — |
| edumapping.com | — | — |
| tricitylifeinsurance.com | — | — |
| fuzzballfactory.com | ❌ none found 2026-10-02 — use the "Want one like this?" line above | — |
| school.globoniks.com | — | — |
| jewellery demo | — | — |
