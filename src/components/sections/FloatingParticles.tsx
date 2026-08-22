"use client";

import { useEffect, useState } from "react";

type Particle = {
  left: string;
  top: string;
  delay: string;
  duration: string;
};

/**
 * The old site's floating "stars": 3px purple-gradient dots with a purple
 * glow, drifting on randomized 4-8s cycles. Ported from
 * old-site-archive/index.html -- .particles / .particle CSS (line 315) and
 * createParticles() (line 3607), including its 30-mobile / 60-desktop count.
 *
 * Particles are generated after mount so the random positions can never
 * cause a server/client hydration mismatch; the SSR payload simply carries
 * an empty, invisible container. Styles live in globals.css (.particle),
 * where prefers-reduced-motion disables the drift.
 */
export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 30 : 60;
    setParticles(
      Array.from({ length: count }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${Math.random() * 4 + 4}s`,
      }))
    );
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
