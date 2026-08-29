"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Mentorship", href: "/mentorship" },
    { name: "Work", href: "/projects" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-2xl tracking-tighter text-foreground">
              <Image
                src="/logo.svg"
                alt=""
                width={48}
                height={48}
                priority
                className="h-12 w-12 [filter:drop-shadow(0_0_8px_rgba(139,92,246,0.6))]"
              />
              GLOBONIKS
            </Link>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="brand-cta px-5 py-2.5 rounded-md text-sm font-semibold inline-flex items-center justify-center"
            >
              Let&apos;s talk
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-foreground"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-foreground hover:bg-muted rounded-md"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 w-full text-center brand-cta px-5 py-3 rounded-md text-base font-semibold"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
