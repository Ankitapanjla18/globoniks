"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-triggered reveals for any element marked `data-reveal`. Add
 * `data-reveal-stagger` to reveal its children one after another instead.
 *
 * Progressive enhancement, in this order of priority:
 * - The server HTML ships `data-reveal=""`, which has no styles: without
 *   JavaScript, or before it runs, everything is visible.
 * - On mount, only elements still *below* the fold are hidden ("pending").
 *   Anything already on screen is marked "done" and never flickers.
 * - Pending elements reveal as they enter the viewport ("in"), then settle
 *   to "done", which drops the reveal transition so the element's own hover
 *   transitions work normally again.
 * - prefers-reduced-motion, or no IntersectionObserver: nothing is hidden.
 * Re-runs on client-side navigation.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const timers: number[] = [];
    const settle = (el: HTMLElement) => {
      el.dataset.reveal = "in";
      const n = el.hasAttribute("data-reveal-stagger") ? Math.min(el.children.length, 9) : 1;
      timers.push(window.setTimeout(() => (el.dataset.reveal = "done"), 900 + n * 80));
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          settle(e.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );

    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.dataset.reveal === "done" || el.dataset.reveal === "in") return;
      if (el.getBoundingClientRect().top < vh * 0.94) {
        el.dataset.reveal = "done";
        return;
      }
      if (el.hasAttribute("data-reveal-stagger")) {
        Array.from(el.children).forEach((c, i) =>
          (c as HTMLElement).style.setProperty("--ri", String(Math.min(i, 8)))
        );
      }
      el.dataset.reveal = "pending";
      io.observe(el);
    });

    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
}
