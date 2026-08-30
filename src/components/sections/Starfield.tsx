"use client";

import { useEffect, useRef } from "react";

/**
 * The site's signature element: the old site's floating stars, grown up.
 *
 * - Ambient: a drifting, twinkling field of brand-purple stars (one canvas
 *   replaces sixty animated DOM spans).
 * - Constellations: stars near the cursor link up with faint lines and lean
 *   gently toward it.
 * - The surprise: clicking the logo (or pressing "g") sends a shockwave
 *   through the field -- an expanding ring that throws the stars outward
 *   before they settle back into drift.
 *
 * Performance policy (a perpetual canvas loop is the classic way to wreck
 * Core Web Vitals, and the first cut did exactly that):
 * - Nothing is painted until the page has loaded and gone idle; the field
 *   then fades in. First paint and hydration never compete with it.
 * - Phones (< 768px): a static field, drawn once. A tap anywhere fires the
 *   ripple from the fingertip -- touch has no hover, so the tap is the
 *   discoverable interaction there.
 * - Tablets (touch, >= 768px): slow ambient drift at 10 fps, tap ripple,
 *   no constellations (there is no cursor to draw them around).
 * - Mouse/trackpad: DPR 1, stars as pre-rendered sprites (drawImage, not
 *   path fills), 10 fps at rest and 30 fps only while the pointer moves or
 *   a ripple runs, paused when scrolled away or the tab is hidden.
 * - prefers-reduced-motion: a static field, no constellations, no ripple.
 * aria-hidden and pointer-events: none -- page content never depends on it.
 */

const RIPPLE_EVENT = "globoniks:ripple";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  tone: 0 | 1;
};

/** Fire the ripple from a point (defaults to the viewport centre). */
export function triggerRipple(x?: number, y?: number) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(RIPPLE_EVENT, {
      detail: { x: x ?? window.innerWidth / 2, y: y ?? window.innerHeight / 3 },
    })
  );
}

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const isStatic = reduce || window.innerWidth < 768;
    const TONES = ["139, 92, 246", "168, 85, 247"]; // #8B5CF6, #A855F7
    const SPRITE = 24;
    const sprites = TONES.map((rgb) => {
      const c = document.createElement("canvas");
      c.width = SPRITE;
      c.height = SPRITE;
      const g = c.getContext("2d")!;
      const r = SPRITE / 2;
      const grad = g.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0, `rgba(${rgb}, 1)`);
      grad.addColorStop(0.18, `rgba(${rgb}, 0.9)`);
      grad.addColorStop(0.4, `rgba(${rgb}, 0.28)`);
      grad.addColorStop(1, `rgba(${rgb}, 0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, SPRITE, SPRITE);
      return c;
    });

    let w = 0;
    let h = 0;
    let raf = 0;
    let lastFrame = 0;
    let lastMove = -1e9;
    let running = false;
    let paused = false;
    const stars: Star[] = [];
    const mouse = { x: -1e4, y: -1e4, on: false };
    const ripple = { x: 0, y: 0, start: -1e9 };
    const RIPPLE_MS = 1600;
    const RIPPLE_SPEED = 1.1; // px per ms

    const rippling = (t: number) => t - ripple.start < RIPPLE_MS;
    const frameMs = (t: number) =>
      rippling(t) || t - lastMove < 1500 ? 1000 / 30 : 1000 / 10;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
    }

    function seed() {
      stars.length = 0;
      const n = isStatic
        ? Math.min(140, Math.max(90, Math.floor((w * h) / 4500)))
        : Math.min(500, Math.max(200, Math.floor((w * h) / 2800)));
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: -0.03 - Math.random() * 0.1,
          r: 0.7 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          tone: Math.random() < 0.6 ? 0 : 1,
        });
      }
    }

    function step(t: number) {
      const wave = rippling(t) ? (t - ripple.start) * RIPPLE_SPEED : -1;
      for (const s of stars) {
        s.vx *= 0.985;
        s.vy = s.vy * 0.985 - 0.0002;
        if (wave >= 0) {
          // push stars the wavefront is passing through, outward from the origin
          const dx = s.x - ripple.x;
          const dy = s.y - ripple.y;
          const d = Math.hypot(dx, dy) || 1;
          const gap = Math.abs(d - wave);
          if (gap < 70) {
            const k = (1 - gap / 70) * 1.1;
            s.vx += (dx / d) * k;
            s.vy += (dy / d) * k;
          }
        }
        s.x += s.vx;
        s.y += s.vy;
        if (mouse.on) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          if (dx * dx + dy * dy < 160 * 160) {
            s.x += dx * 0.004;
            s.y += dy * 0.004;
          }
        }
        if (s.x < -10) s.x = w + 10;
        else if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        else if (s.y > h + 10) s.y = -10;
      }
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);

      if (!isStatic && mouse.on && !rippling(t)) {
        const R = 160;
        const near: Star[] = [];
        for (const s of stars) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          if (dx * dx + dy * dy < R * R) near.push(s);
        }
        ctx!.lineWidth = 1;
        for (let i = 0; i < near.length; i++) {
          const a = near[i];
          const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y) / R;
          for (let j = i + 1; j < near.length; j++) {
            const b = near[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 90) {
              ctx!.strokeStyle = `rgba(167, 139, 250, ${(1 - d / 90) * (1 - dm) * 0.45})`;
              ctx!.beginPath();
              ctx!.moveTo(a.x, a.y);
              ctx!.lineTo(b.x, b.y);
              ctx!.stroke();
            }
          }
        }
      }

      if (rippling(t)) {
        const p = (t - ripple.start) / RIPPLE_MS;
        const radius = (t - ripple.start) * RIPPLE_SPEED;
        ctx!.lineWidth = 2;
        ctx!.strokeStyle = `rgba(167, 139, 250, ${0.5 * (1 - p)})`;
        ctx!.beginPath();
        ctx!.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        ctx!.stroke();
      }

      for (const s of stars) {
        ctx!.globalAlpha = 0.7 * (isStatic ? 0.6 : 0.45 + 0.35 * Math.sin(t / 900 + s.phase));
        const d = SPRITE * (s.r / 1.4);
        ctx!.drawImage(sprites[s.tone], s.x - d / 2, s.y - d / 2, d, d);
      }
      ctx!.globalAlpha = 1;
    }

    const wantsLoop = (t: number) => !isStatic && (!paused || rippling(t));

    function frame(t: number) {
      raf = 0;
      if (t - lastFrame < frameMs(t)) {
        raf = requestAnimationFrame(frame);
        return;
      }
      lastFrame = t;
      step(t);
      draw(t);
      if (wantsLoop(t)) raf = requestAnimationFrame(frame);
      else running = false;
    }

    function ensureLoop() {
      if (!running && wantsLoop(performance.now())) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    }

    function startRipple(x: number, y: number) {
      if (reduce) return;
      ripple.x = x;
      ripple.y = y;
      ripple.start = performance.now();
      if (isStatic) {
        // touch/small screens have no loop: play the ripple as a short burst
        running = true;
        raf = requestAnimationFrame(function burst(t) {
          step(t);
          draw(t);
          if (rippling(t)) raf = requestAnimationFrame(burst);
          else running = false;
        });
        return;
      }
      ensureLoop();
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.on = !isStatic;
      lastMove = performance.now();
      ensureLoop();
    };
    const onLeave = () => {
      mouse.on = false;
    };
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "g" || e.key === "G") startRipple(w / 2, h / 3);
    };
    const onRipple = (e: Event) => {
      const d = (e as CustomEvent<{ x: number; y: number }>).detail;
      startRipple(d?.x ?? w / 2, d?.y ?? h / 3);
    };
    let lastTap = -1e9;
    const onTap = (e: MouseEvent) => {
      if (!touch) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const now = performance.now();
      if (now - lastTap < 800) return;
      lastTap = now;
      startRipple(e.clientX, e.clientY);
    };
    const onScroll = () => {
      paused = window.scrollY > window.innerHeight * 1.5;
      if (!paused) ensureLoop();
    };
    const onVisibility = () => {
      paused = document.hidden || window.scrollY > window.innerHeight * 1.5;
      if (!paused) ensureLoop();
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        seed();
        draw(performance.now());
        ensureLoop();
      }, 150);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onTap);
    window.addEventListener(RIPPLE_EVENT, onRipple);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    // Nothing is painted at mount. The field is drawn and faded in only
    // after load + idle, so it never competes with first paint or hydration.
    let startTimer = 0;
    const go = () => {
      resize();
      seed();
      draw(performance.now());
      canvas!.style.opacity = "1";
      ensureLoop();
    };
    const begin = () => {
      const ric = (
        window as Window & {
          requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
        }
      ).requestIdleCallback;
      if (typeof ric === "function") ric(go, { timeout: 2500 });
      else startTimer = window.setTimeout(go, 1000);
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(startTimer);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onTap);
      window.removeEventListener(RIPPLE_EVENT, onRipple);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", begin);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0, transition: "opacity 1.4s ease" }}
    />
  );
}
