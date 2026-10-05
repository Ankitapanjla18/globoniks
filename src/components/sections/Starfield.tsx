"use client";

import { useEffect, useRef } from "react";

/**
 * The site's signature element: the old site's floating stars, grown up.
 *
 * - Ambient: a drifting, twinkling field of brand-purple stars, faintly
 *   linked into constellations, with the occasional shooting star.
 * - Depth: as the page scrolls, stars slide against it at different speeds
 *   by size -- a parallax that makes the field feel like space rather than
 *   wallpaper. This is the main motion on phones, where scrolling is most
 *   of what a visitor does.
 * - Presence: links and stars light up and lean toward the cursor, or on a
 *   touch screen toward the finger -- including while it scrolls the page.
 * - The surprise: clicking the logo, tapping anywhere on a touch screen, or
 *   pressing "g" sends a shockwave ring through the field.
 *
 * Links are found with a uniform spatial grid (each cell checks only its
 * forward neighbours), so the whole field is linked every frame without an
 * O(n^2) scan.
 *
 * Performance policy (a perpetual canvas loop is the classic way to wreck
 * Core Web Vitals):
 * - Nothing is painted until the page has loaded and gone idle; the field
 *   then fades in. First paint, LCP and hydration never compete with it.
 * - Frame budget by activity: 30 fps while the pointer, finger or page is
 *   moving or a ripple runs; 24 fps ambient; 12 fps after 30 s untouched.
 *   Stopped entirely while the tab is hidden.
 * - Phones and tablets: animated (they were a static field until
 *   2026-10-04 -- most first visits from search are on a phone, and a
 *   frozen field read as a broken one). Fewer stars, canvas at up to 2x
 *   device pixels so lines stay crisp on high-density screens.
 * - Low-end devices (<= 4 cores or <= 3 GB memory): fewer stars, 1x pixels,
 *   lower frame rates.
 * - The canvas is sized to the *large* viewport (100lvh), so a phone's
 *   address bar sliding in and out never resizes or reseeds the field.
 *   Only a width change (rotation) reseeds.
 * - prefers-reduced-motion or Data Saver: a still, linked field. No drift,
 *   parallax, shooting stars or ripple.
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

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(nav.connection?.saveData);
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const lowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 3;
    const isStatic = reduce || saveData;
    // Crisp lines on high-density phone screens; desktop stays at 1x, where
    // the canvas is several times larger and the glow hides the softness.
    const dpr = touch && !lowEnd ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    const ACTIVE_MS = 1000 / (lowEnd ? 24 : 30);
    const AMBIENT_MS = 1000 / (lowEnd ? 15 : 24);
    const RESTING_MS = 1000 / 12;

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
    let lastActivity = performance.now();
    let running = false;
    let hidden = document.hidden;
    let lastScrollY = window.scrollY;
    const stars: Star[] = [];
    // `presence` eases toward 1 while a cursor or finger is on the field and
    // back to 0 after it leaves, so the glow fades rather than snapping off.
    const pointer = { x: -1e4, y: -1e4, on: false, presence: 0 };
    const ripple = { x: 0, y: 0, start: -1e9 };
    const RIPPLE_MS = 1600;
    const RIPPLE_SPEED = 1.1; // px per ms
    const shoot = { start: -1e9, x: 0, y: 0, vx: 0, vy: 0, next: performance.now() + 6000 };
    const SHOOT_MS = 900;

    // Link distances. LINK is the longest line ever drawn; NEAR_R is the
    // radius in which links brighten and stars lean toward the pointer.
    const LINK = 110;
    const NEAR_R = touch ? 200 : 240;
    const CELL = LINK;

    const rippling = (t: number) => t - ripple.start < RIPPLE_MS;
    const frameMs = (t: number) => {
      const idle = t - lastActivity;
      if (rippling(t) || idle < 1500 || pointer.presence > 0.02) return ACTIVE_MS;
      return idle > 30000 ? RESTING_MS : AMBIENT_MS;
    };
    const touchActivity = () => {
      lastActivity = performance.now();
    };

    /** Sizes the backing store to the canvas's CSS box (100vw x 100lvh). */
    function measure() {
      const rect = canvas!.getBoundingClientRect();
      return { nw: Math.round(rect.width), nh: Math.round(rect.height) };
    }

    function applySize(nw: number, nh: number) {
      w = nw;
      h = nh;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      stars.length = 0;
      const area = w * h;
      const n = isStatic
        ? Math.min(160, Math.max(90, Math.floor(area / 4200)))
        : touch
          ? lowEnd
            ? Math.min(110, Math.max(70, Math.floor(area / 3600)))
            : Math.min(190, Math.max(110, Math.floor(area / 2600)))
          : Math.min(500, Math.max(200, Math.floor(area / 2800)));
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
      // Scroll parallax: stars slide against the page, bigger ones faster.
      const sy = window.scrollY;
      let dy = sy - lastScrollY;
      lastScrollY = sy;
      if (dy > 140) dy = 140;
      else if (dy < -140) dy = -140;

      pointer.presence += ((pointer.on ? 1 : 0) - pointer.presence) * 0.18;
      const near = pointer.presence > 0.02;
      const wave = rippling(t) ? (t - ripple.start) * RIPPLE_SPEED : -1;

      for (const s of stars) {
        s.vx *= 0.985;
        s.vy = s.vy * 0.985 - 0.0002;
        if (wave >= 0) {
          // push stars the wavefront is passing through, outward from the origin
          const dx = s.x - ripple.x;
          const dy2 = s.y - ripple.y;
          const d = Math.hypot(dx, dy2) || 1;
          const gap = Math.abs(d - wave);
          if (gap < 70) {
            const k = (1 - gap / 70) * 1.1;
            s.vx += (dx / d) * k;
            s.vy += (dy2 / d) * k;
          }
        }
        s.x += s.vx;
        s.y += s.vy;
        if (dy) s.y -= dy * (0.05 + s.r * 0.06);
        if (near) {
          const dx = pointer.x - s.x;
          const dy2 = pointer.y - s.y;
          if (dx * dx + dy2 * dy2 < NEAR_R * NEAR_R) {
            const k = 0.005 * pointer.presence;
            s.x += dx * k;
            s.y += dy2 * k;
          }
        }
        if (s.x < -10) s.x = w + 10;
        else if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        else if (s.y > h + 10) s.y = -10;
      }

      if (!isStatic && t > shoot.next && t - shoot.start > SHOOT_MS) {
        // A shooting star every 7-15 s, from the upper part of the field,
        // travelling down and across.
        const dir = Math.random() < 0.5 ? -1 : 1;
        const speed = (touch ? 0.55 : 0.8) + Math.random() * 0.35; // px per ms
        const angle = (Math.PI / 180) * (18 + Math.random() * 22);
        shoot.start = t;
        shoot.x = dir > 0 ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5;
        shoot.y = Math.random() * h * 0.45;
        shoot.vx = Math.cos(angle) * speed * dir;
        shoot.vy = Math.sin(angle) * speed;
        shoot.next = t + 7000 + Math.random() * 8000;
      }
    }

    /*
     * Link batching. Stroking each line separately -- ~700 beginPath/stroke
     * calls and as many colour strings per frame -- cost 50-130 ms a frame
     * on a phone CPU slowed 4x. Instead every segment is dropped into one of
     * BUCKETS alpha bands and each band is stroked once. Bands are spaced on
     * a square-root curve so the faint ambient links, where banding would
     * show, get most of the resolution. The grid and band arrays are reused
     * across frames, so the hot loop allocates nothing.
     */
    const BUCKETS = 16;
    const MAX_ALPHA = 0.72;
    const bandStyle = Array.from({ length: BUCKETS }, (_, b) => {
      const mid = ((b + 0.5) / BUCKETS) ** 2 * MAX_ALPHA;
      return `rgba(167, 139, 250, ${mid.toFixed(3)})`;
    });
    const bands: number[][] = Array.from({ length: BUCKETS }, () => []);
    let grid: Star[][] = [];
    let gridCols = 0;
    let gridRows = 0;

    /**
     * Draws every pair of stars closer than LINK. Ambient links are faint;
     * links near the pointer fade up with proximity so the field appears to
     * wake under it.
     */
    function drawLinks() {
      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;
      if (cols !== gridCols || rows !== gridRows) {
        gridCols = cols;
        gridRows = rows;
        grid = Array.from({ length: cols * rows }, () => []);
      } else {
        for (const cell of grid) cell.length = 0;
      }
      for (const s of stars) {
        const cx = Math.max(0, Math.min(cols - 1, Math.floor(s.x / CELL)));
        const cy = Math.max(0, Math.min(rows - 1, Math.floor(s.y / CELL)));
        grid[cy * cols + cx].push(s);
      }
      for (const band of bands) band.length = 0;

      const ambient = isStatic ? 0.16 : touch ? 0.13 : 0.11;
      const near = pointer.presence > 0.02;
      // Forward neighbours only: self, E, SW, S, SE.
      const offsets = [0, 1, cols - 1, cols, cols + 1];
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const k = cy * cols + cx;
          const cell = grid[k];
          if (cell.length === 0) continue;
          for (const off of offsets) {
            const nk = k + off;
            if (nk >= grid.length) continue;
            if (off === 1 && cx === cols - 1) continue;
            if (off === cols - 1 && cx === 0) continue;
            if (off === cols + 1 && cx === cols - 1) continue;
            const other = grid[nk];
            if (other.length === 0) continue;
            for (let i = 0; i < cell.length; i++) {
              const a = cell[i];
              const jStart = off === 0 ? i + 1 : 0;
              for (let j = jStart; j < other.length; j++) {
                const b = other[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 >= LINK * LINK) continue;
                const fall = 1 - Math.sqrt(d2) / LINK;
                let alpha = fall * ambient;
                if (near) {
                  const mx = (a.x + b.x) / 2 - pointer.x;
                  const my = (a.y + b.y) / 2 - pointer.y;
                  const dm2 = mx * mx + my * my;
                  if (dm2 < NEAR_R * NEAR_R) {
                    const f = 1 - Math.sqrt(dm2) / NEAR_R;
                    alpha += fall * f * f * 0.55 * pointer.presence;
                  }
                }
                const band = Math.min(BUCKETS - 1, Math.floor(Math.sqrt(alpha / MAX_ALPHA) * BUCKETS));
                if (band <= 0) continue; // below ~0.3% opacity: invisible
                bands[band].push(a.x, a.y, b.x, b.y);
              }
            }
          }
        }
      }

      ctx!.lineWidth = 1;
      for (let b = 1; b < BUCKETS; b++) {
        const segs = bands[b];
        if (segs.length === 0) continue;
        ctx!.strokeStyle = bandStyle[b];
        ctx!.beginPath();
        for (let i = 0; i < segs.length; i += 4) {
          ctx!.moveTo(segs[i], segs[i + 1]);
          ctx!.lineTo(segs[i + 2], segs[i + 3]);
        }
        ctx!.stroke();
      }
    }

    function drawShootingStar(t: number) {
      const e = t - shoot.start;
      if (e < 0 || e > SHOOT_MS) return;
      const p = e / SHOOT_MS;
      const hx = shoot.x + shoot.vx * e;
      const hy = shoot.y + shoot.vy * e;
      const tail = 140; // ms of trail
      const tx = hx - shoot.vx * tail;
      const ty = hy - shoot.vy * tail;
      const fade = p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85;
      const grad = ctx!.createLinearGradient(tx, ty, hx, hy);
      grad.addColorStop(0, "rgba(196, 181, 253, 0)");
      grad.addColorStop(1, `rgba(221, 214, 254, ${0.85 * fade})`);
      ctx!.strokeStyle = grad;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(tx, ty);
      ctx!.lineTo(hx, hy);
      ctx!.stroke();
      ctx!.globalAlpha = fade;
      ctx!.drawImage(sprites[1], hx - 7, hy - 7, 14, 14);
      ctx!.globalAlpha = 1;
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);

      drawLinks();

      if (rippling(t)) {
        const p = (t - ripple.start) / RIPPLE_MS;
        const radius = (t - ripple.start) * RIPPLE_SPEED;
        ctx!.lineWidth = 2;
        ctx!.strokeStyle = `rgba(167, 139, 250, ${0.5 * (1 - p)})`;
        ctx!.beginPath();
        ctx!.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        ctx!.stroke();
      }

      if (!isStatic) drawShootingStar(t);

      const near = pointer.presence > 0.02;
      for (const s of stars) {
        let a = 0.7 * (isStatic ? 0.6 : 0.45 + 0.35 * Math.sin(t / 900 + s.phase));
        let d = SPRITE * (s.r / 1.4);
        if (near) {
          // stars under the pointer brighten and swell a little
          const dx = s.x - pointer.x;
          const dy = s.y - pointer.y;
          const dm = Math.sqrt(dx * dx + dy * dy);
          if (dm < NEAR_R) {
            const f = (1 - dm / NEAR_R) * pointer.presence;
            a = Math.min(1, a + f * 0.5);
            d *= 1 + f * 0.6;
          }
        }
        ctx!.globalAlpha = a;
        ctx!.drawImage(sprites[s.tone], s.x - d / 2, s.y - d / 2, d, d);
      }
      ctx!.globalAlpha = 1;
    }

    const wantsLoop = () => !isStatic && !hidden;

    function frame(t: number) {
      raf = 0;
      if (!wantsLoop()) {
        running = false;
        return;
      }
      if (t - lastFrame < frameMs(t)) {
        raf = requestAnimationFrame(frame);
        return;
      }
      lastFrame = t;
      step(t);
      draw(t);
      raf = requestAnimationFrame(frame);
    }

    function ensureLoop() {
      if (!running && wantsLoop()) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    }

    function startRipple(x: number, y: number) {
      if (isStatic) return;
      ripple.x = x;
      ripple.y = y;
      ripple.start = performance.now();
      touchActivity();
      ensureLoop();
    }

    // Mouse / pen.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.on = !isStatic;
      touchActivity();
      ensureLoop();
    };
    const onLeave = () => {
      pointer.on = false;
    };

    // Finger. Touch events keep firing while the finger scrolls the page
    // (pointer events are cancelled the moment scrolling starts), so the
    // field lights up under the thumb as the visitor scrolls.
    const onTouch = (e: TouchEvent) => {
      const p = e.touches[0];
      if (!p || isStatic) return;
      pointer.x = p.clientX;
      pointer.y = p.clientY;
      pointer.on = true;
      touchActivity();
      ensureLoop();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) pointer.on = false;
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
      touchActivity();
      if (isStatic) return;
      ensureLoop();
    };
    const onVisibility = () => {
      hidden = document.hidden;
      // don't let the parallax jump by the whole distance scrolled while away
      lastScrollY = window.scrollY;
      if (!hidden) ensureLoop();
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const { nw, nh } = measure();
        if (nw === w && nh === h) return; // address bar moved: nothing to do
        const widthChanged = nw !== w;
        const oldH = h;
        applySize(nw, nh);
        if (widthChanged) seed();
        else if (oldH > 0) for (const s of stars) s.y = (s.y / oldH) * nh;
        draw(performance.now());
        ensureLoop();
      }, 150);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
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
      const { nw, nh } = measure();
      applySize(nw, nh);
      seed();
      lastScrollY = window.scrollY;
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
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
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
      className="starfield pointer-events-none z-0"
      style={{ opacity: 0, transition: "opacity 1.4s ease" }}
    />
  );
}
