/**
 * "Want something like this?" offers.
 *
 * Each offer is a landing page at /build/<slug>/ for a visitor who has seen
 * one of our live products and wants their own. The product's own site
 * links here ("Want a shop like this? Built by Globoniks"), so the page
 * must answer, in order: what they are looking at, what it would take from
 * them, how it happens, and what else could be added.
 *
 * Rules, same as the rest of the site:
 * - `features` are things the example product actually does. Every line is
 *   observed on the live site. Nothing aspirational goes here.
 * - `addOns` are things we can build. Where we have shipped one already,
 *   `proofSlug` names the project; the rest are offers and are labelled as
 *   such on the page. No add-on claims a metric.
 * - No prices. The discovery sprint is fixed-price, quoted after the first
 *   conversation (NEEDS-INPUT 2.1g).
 */

export type FeatureGroup = { title: string; items: string[] };

export type AddOn = {
  name: string;
  what: string;
  /** Slug into src/data/projects.ts where this already runs. */
  proofSlug?: string;
};

export type Offer = {
  slug: string;
  /** What the visitor wants, in their words, before the example's name:
   *  "a shop like" -> "Want a shop like FuzzBall Factory?" */
  want: string;
  title: string;
  description: string;
  /** Slug of the live product that is the worked example. */
  exampleSlug: string;
  /** Who this is for. Plain nouns. */
  audience: string[];
  intro: string;
  features: FeatureGroup[];
  /** What we need from the customer. Honest and short. */
  requirements: { item: string; note?: string }[];
  addOns: { title: string; items: AddOn[] }[];
  faq: { q: string; a: string }[];
};

export const offers: Offer[] = [
  {
    slug: "online-shop",
    want: "a shop like",
    title: "Want a shop like FuzzBall Factory?",
    description:
      "Get an online shop like FuzzBall Factory, built by Globoniks: made-to-order products, custom work orders, UPI and cards, worldwide shipping. What it takes.",
    exampleSlug: "fuzzball-factory",
    audience: [
      "Makers and small brands selling their own products",
      "Home businesses moving off Instagram DMs and WhatsApp",
      "Studios taking custom commissions",
      "Anyone outgrowing a marketplace listing",
    ],
    intro:
      "FuzzBall Factory is our own brand, and we built its shop the way we would build yours: a complete storefront for a one-person business, with the parts marketplaces and page builders get wrong for handmade work — lead times, custom orders, honest shipping. Everything below is live on fuzzballfactory.com; open it and click around before you read on.",
    features: [
      {
        title: "The shop",
        items: [
          "Catalogue by category — plushies, bouquets, keychains, wearables, home — with a single “everything” view",
          "Ready-to-ship and made-to-order pieces, with the lead time stated on the product page, in the cart and at checkout",
          "Product pages that carry the details buyers ask about: material, size in cm, care, colour notes",
          "Drops: limited batches announced on their own page",
          "Wishlist and customer accounts; order tracking works without one",
        ],
      },
      {
        title: "Custom work orders",
        items: [
          "A work-order form: describe the piece, attach reference photos, pick colours, set a budget",
          "You reply with a quote and a timeline; the customer accepts, counters or declines",
          "50% deposit to start, progress photos, approval of the finished piece, balance before dispatch",
          "Rules you set — for example, original designs only, no licensed characters",
        ],
      },
      {
        title: "Orders, payments and shipping",
        items: [
          "UPI, cards and netbanking through Razorpay; cash on delivery limited to ready-to-ship pieces up to a cap you choose",
          "Flat-rate shipping in India with a free-shipping threshold; worldwide shipping priced by region and shown before payment",
          "Gift wrap and a handwritten note as a paid option",
          "Order tracking by order number and phone or email — no account needed",
        ],
      },
      {
        title: "Trust and compliance",
        items: [
          "Shipping, returns and refunds, terms, privacy and grievance-officer pages, as Indian consumer-protection rules expect of an online seller",
          "Honest copy by design: no reviews, counts or press the shop does not have; real reviews appear when customers write them",
          "WhatsApp and Instagram links where customers already are",
        ],
      },
      {
        title: "Under the hood",
        items: [
          "Server-rendered pages (Next.js) so every product is indexable by Google and loads fast on a phone",
          "Product, breadcrumb and organisation structured data; a sitemap; a robots policy that keeps cart and account pages out of search",
          "A strict Content-Security-Policy and HTTPS-only; images served through Cloudinary",
          "Runs on a plain Linux server with nginx — no platform fees, no per-transaction cut beyond the payment gateway's",
        ],
      },
    ],
    requirements: [
      { item: "Your brand", note: "A name, a logo if you have one (we can make an interim mark), and a domain or permission to buy one." },
      { item: "Your products", note: "Names, photos, prices, sizes and materials, and which are ready-to-ship versus made-to-order with their lead times. A spreadsheet is fine." },
      { item: "A Razorpay account", note: "Needs PAN, a bank account and a business address; GST registration is optional below the threshold. We walk you through it." },
      { item: "Shipping rules", note: "Which courier, what you charge in India, whether you ship abroad, and what you will not ship." },
      { item: "Your policies, in plain words", note: "Returns, cancellations, custom-order rules. We draft the pages; you confirm them." },
      { item: "A WhatsApp number and Instagram handle", note: "Shown on the site. The number must be the one you actually answer." },
      { item: "Thirty minutes to start", note: "The first conversation is free and decides the scope." },
    ],
    addOns: [
      {
        title: "Selling more",
        items: [
          { name: "Discount codes and gift cards", what: "Percentage, fixed and first-order codes; gift cards redeemable at checkout." },
          { name: "Bundles and pre-orders", what: "Sell a set at one price; take orders for a drop before it is made, with a waitlist when it sells out." },
          { name: "Subscriptions", what: "A recurring box or plan billed monthly.", proofSlug: "homekrafted" },
          { name: "Reviews with photos", what: "Verified-buyer reviews collected after delivery and shown on the product." },
          { name: "Abandoned-cart recovery", what: "A WhatsApp or email nudge when a cart is left behind, with the customer's consent." },
        ],
      },
      {
        title: "Running the shop",
        items: [
          { name: "Admin dashboard", what: "Orders, stock, work orders and customers in one place, with low-stock alerts.", proofSlug: "homekrafted" },
          { name: "Courier integration", what: "Shiprocket or Delhivery: labels, pickups and tracking pushed to the customer automatically." },
          { name: "GST invoices", what: "Tax invoices generated per order, numbered and downloadable." },
          { name: "Returns portal", what: "Customers raise a return against an order; you approve, refund and restock from the dashboard." },
          { name: "Installable app", what: "The shop on the customer's home screen as a progressive web app, no app store needed.", proofSlug: "globoniks-schools" },
        ],
      },
      {
        title: "Reaching customers",
        items: [
          { name: "WhatsApp ordering and updates", what: "Order on WhatsApp; order and dispatch updates sent there.", proofSlug: "homekrafted" },
          { name: "Instagram and Google Shopping feeds", what: "Your catalogue synced to Meta's shop and Google Merchant Center so products appear where people already browse." },
          { name: "Newsletter and launch alerts", what: "Collect emails, announce drops, with unsubscribe handled properly." },
          { name: "Analytics", what: "Google Analytics 4 or Plausible, with purchases and work orders tracked as conversions." },
          { name: "A journal", what: "Behind-the-scenes posts and making-of pages that bring search traffic to the shop." },
        ],
      },
      {
        title: "Growing beyond one maker",
        items: [
          { name: "Multiple sellers", what: "Other makers list under their own name on your storefront, with commissions and payouts.", proofSlug: "homekrafted" },
          { name: "Multi-currency", what: "Prices shown and charged in the buyer's currency for overseas customers." },
          { name: "Wholesale and corporate orders", what: "A quote-based bulk-order flow alongside the retail shop.", proofSlug: "homekrafted" },
          { name: "Workshops and bookings", what: "Sell seats for classes with dates, capacity and reminders." },
        ],
      },
    ],
    faq: [
      {
        q: "Is this a template?",
        a: "No. FuzzBall Factory is a custom build and yours would be too. What you are buying is the same team and the same decisions, applied to your products, your rules and your brand — not a copy with the colours changed.",
      },
      {
        q: "What does it cost?",
        a: "A fixed price, quoted after the first conversation once we know the scale: how many products, whether you need custom work orders, which add-ons. We do not publish a number because a twenty-product shop and a two-hundred-product shop with subscriptions are different builds.",
      },
      {
        q: "Who owns it when it is done?",
        a: "You do. For custom builds, ownership of the deliverables is written into the agreement before work starts — normally the code is yours on final payment, along with the domain, the hosting account and the data.",
      },
      {
        q: "Can I move from Shopify, Instagram or a marketplace?",
        a: "Yes. We import your products and, where possible, your order history and customers, and keep your old links redirecting so you do not lose search traffic.",
      },
      {
        q: "Who runs it after launch?",
        a: "You add products and handle orders from the admin side. Updates, security patches, monitoring and changes come under a maintenance plan with the people who built it, and an agreed response window.",
      },
    ],
  },
];

export function getOffer(slug: string): Offer | undefined {
  return offers.find((o) => o.slug === slug);
}

/** The offer that uses a given project as its example, if any. */
export function offerForProject(projectSlug: string): Offer | undefined {
  return offers.find((o) => o.exampleSlug === projectSlug);
}
