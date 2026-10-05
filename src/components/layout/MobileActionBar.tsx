"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BUSINESS } from "@/lib/site";
import { ABOUT_TO_INTEREST } from "@/lib/interests";
import { readVisitSource } from "@/components/seo/VisitSource";

const WHATSAPP_DIGITS = BUSINESS.telephone.replace(/[^\d]/g, "");

/**
 * Phones only: a floating bar at thumb height with the two ways to start
 * -- WhatsApp, where most Indian enquiries begin, and the project form.
 *
 * It slides in once the hero (and its own CTAs) has scrolled away, and out
 * again near the footer, so it never covers the page's own calls to action
 * or the footer's contact details. Not shown on /contact/ or the mentorship
 * application, which are the form already. On an offer page the form link
 * carries `?about=` and the WhatsApp text names the offer.
 *
 * Hidden with `visibility` as well as a transform, so while off screen it is
 * out of the tab order and the accessibility tree.
 */
export function MobileActionBar() {
  const pathname = usePathname() ?? "/";
  const [show, setShow] = useState(false);
  const [via, setVia] = useState<string | null>(null);

  useEffect(() => {
    setVia(readVisitSource());
    // At most once per frame: reading scrollHeight forces layout, and
    // scroll events can fire several times per frame on a phone.
    let queued = 0;
    const measure = () => {
      queued = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const H = document.documentElement.scrollHeight;
      setShow(y > vh * 0.7 && y + vh < H - 360);
    };
    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(queued);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  if (pathname.startsWith("/contact") || pathname.startsWith("/mentorship/apply")) return null;

  const offer = pathname.match(/^\/build\/([^/]+)/)?.[1];
  const interest = offer ? ABOUT_TO_INTEREST[offer] : undefined;
  const formHref = offer ? `/contact/?about=${offer}` : "/contact/";
  const text = [
    interest
      ? `Hi Globoniks, I'm interested in ${interest.charAt(0).toLowerCase()}${interest.slice(1)}.`
      : "Hi Globoniks, I'd like to talk about a project.",
    via ? `(Found you via ${via}.)` : "",
  ]
    .filter(Boolean)
    .join(" ");
  const waHref = `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(text)}`;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-[transform,visibility] duration-300 ease-out md:hidden ${
        show ? "visible translate-y-0" : "invisible translate-y-[130%]"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 flex gap-2 rounded-full border border-[hsl(var(--hairline))] bg-background/80 p-1.5 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="ghost-cta inline-flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current text-[hsl(var(--live))]">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" />
          </svg>
          WhatsApp
        </a>
        <Link
          href={formHref}
          className="brand-cta inline-flex flex-[1.35] items-center justify-center px-4 py-3 text-sm font-medium"
        >
          Start a project
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
