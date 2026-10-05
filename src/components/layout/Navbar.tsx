"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { triggerRipple } from "@/components/sections/Starfield";
import { BUSINESS } from "@/lib/site";

const navLinks = [
  { name: "Services", href: "/services/" },
  { name: "Work", href: "/projects/" },
  { name: "How we work", href: "/how-we-work/" },
  { name: "Mentorship", href: "/mentorship/" },
  { name: "About", href: "/about/" },
];

/*
 * Transparent over the hero, hairline + blur once scrolled. The wordmark is
 * set in the display serif; nav items in the mono instrument voice. The
 * current section is marked with a small violet point.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Phone menu is a full-screen sheet: lock the page behind it and let
  // Escape close it.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <>
    <header
      className={`fixed top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b rule bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          <Link
            href="/"
            onClick={(e) => triggerRipple(e.clientX, e.clientY)}
            className="flex items-center gap-3 text-foreground"
          >
            <Image
              src="/logo.svg"
              alt=""
              width={36}
              height={36}
              priority
              className="h-9 w-9 [filter:drop-shadow(0_0_10px_rgba(139,92,246,0.55))]"
            />
            <span className="font-heading text-[1.65rem] leading-none tracking-tight">Globoniks</span>
          </Link>

          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative font-mono text-[12px] uppercase tracking-[0.14em] transition-colors hover:text-foreground ${
                        active ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {link.name}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-400"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact/"
              className="brand-cta inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium"
            >
              Start a project
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="-mr-2 rounded-full p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

    </header>

      {/* Outside <header> on purpose: the header's backdrop-filter makes it
          the containing block for fixed descendants, which squeezed this
          full-screen sheet into the 72px bar. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t rule bg-background/95 backdrop-blur-xl md:hidden"
        >
          <nav className="flex min-h-full flex-col px-5 pb-8 pt-4" aria-label="Primary">
            <ul className="reveal divide-y divide-[hsl(var(--hairline))]">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <li key={link.name} style={{ "--i": i } as React.CSSProperties}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="w-6 font-mono text-[11px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-heading text-[2.1rem] leading-none ${active ? "ink" : "text-foreground"}`}>
                        {link.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="reveal mt-auto pt-10">
              <div style={{ "--i": navLinks.length } as React.CSSProperties}>
                <Link
                  href="/contact/"
                  className="brand-cta flex w-full items-center justify-center px-5 py-4 text-base font-medium"
                >
                  Start a project
                </Link>
                <ul className="mt-6 space-y-1 font-mono text-xs text-muted-foreground">
                  <li>
                    <a href={`mailto:${BUSINESS.email}`} className="inline-block py-1.5">
                      {BUSINESS.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${BUSINESS.telephone.replace(/[^+\d]/g, "")}`} className="inline-block py-1.5">
                      {BUSINESS.telephone}
                    </a>
                  </li>
                  <li className="pt-1">{BUSINESS.locality}, {BUSINESS.region} · IST (UTC+5:30)</li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
