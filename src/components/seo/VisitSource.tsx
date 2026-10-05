"use client";

import { useEffect } from "react";

/**
 * Remembers which site sent this visit, for the length of the tab session.
 *
 * Links from our own products carry `utm_source` (CREDITS-KIT.md). The
 * visitor usually lands on a page other than /contact/ -- the shop offer
 * page, a case study -- so the parameter is gone by the time they write
 * to us. This stores it once, on landing, and the contact form adds it to
 * the message as "Found us via". First touch wins: a later internal link
 * does not overwrite it.
 *
 * sessionStorage only: nothing leaves the browser except inside the message
 * the visitor chooses to send. Wrapped in try/catch because storage can be
 * unavailable (private windows, blocked site data).
 */
const KEY = "globoniks:via";

export function readVisitSource(): string | null {
  try {
    return window.sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function VisitSource() {
  useEffect(() => {
    try {
      const source = new URLSearchParams(window.location.search).get("utm_source");
      if (source && !window.sessionStorage.getItem(KEY)) {
        window.sessionStorage.setItem(KEY, source.slice(0, 60));
      }
    } catch {
      /* storage unavailable: attribution is a nicety, never a requirement */
    }
  }, []);
  return null;
}
