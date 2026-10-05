/**
 * Offer slug -> what the visitor is after, in their words. Shared by the
 * contact form (preselects its "What are you looking for?" option from
 * `?about=<slug>`) and the phone action bar (prefills the WhatsApp text).
 * Kept apart from src/data/offers.ts so client components can use it
 * without shipping the offer pages' copy in the bundle.
 */
export const ABOUT_TO_INTEREST: Record<string, string> = {
  "online-shop": "An online shop like FuzzBall Factory",
};
