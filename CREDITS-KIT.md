# "Built by Globoniks" — credits kit

A followed link from every live product and client site back to globoniks.com
is the cheapest, highest-leverage SEO move available: real backlinks from real
products, plus attribution where prospects already are. This kit is
paste-ready; the sites themselves live in other codebases.

**Ask first** on client-owned sites (Homekrafted, TricityMatch, EduMapping,
Tricity Life Insurance). On Globoniks-owned products (Schools, Jewellery) just
add it.

## Rules that keep the link worth having

- A normal, **followed** link (no `rel="nofollow"`, no `rel="sponsored"`).
- Link to the **root**: `https://globoniks.com/`. The `utm_*` parameters
  below are for your analytics only — the canonical tag on globoniks.com
  collapses them, so the backlink still counts for the root.
- Visible text that says what it is: "Built by Globoniks". Not an icon alone.
- Footer placement is fine and conventional. One link per site is plenty.

## Text link (use anywhere)

```html
<a href="https://globoniks.com/?utm_source=SITE&utm_medium=footer&utm_campaign=credit">
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
| school.globoniks.com | `schools` |
| jewellery demo | `jewellery` |

## Badge (SVG, two variants)

Files in this repo, also served by the live site:

- `public/badge/built-by-globoniks-dark.svg` — for dark footers
- `public/badge/built-by-globoniks-light.svg` — for light footers

Copy the file into the other site (do not hotlink; a self-hosted asset never
breaks if globoniks.com changes). Then:

```html
<a href="https://globoniks.com/?utm_source=SITE&utm_medium=footer&utm_campaign=credit"
   aria-label="Built by Globoniks">
  <img src="/built-by-globoniks-light.svg" alt="Built by Globoniks" width="168" height="36">
</a>
```

## React / Next.js footer snippet

```tsx
<a
  href="https://globoniks.com/?utm_source=SITE&utm_medium=footer&utm_campaign=credit"
  className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100"
>
  Built by <span className="font-semibold">Globoniks</span>
</a>
```

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
| homekrafted.in | ✅ added 2026-08-30 | ❌ plain text — needs the anchor |
| tricitymatch.com | — | — |
| edumapping.com | — | — |
| tricitylifeinsurance.com | — | — |
| school.globoniks.com | — | — |
| jewellery demo | — | — |
