'use client';

import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils.js';

// Soft blobs of the site's own accent/gold on its paper background, drifting
// slowly on independent loops so the colors keep blending into new shapes —
// a mesh gradient built from radial gradients rather than a shader, so it's
// cheap (transform-only, GPU-composited) and needs no library.
//
// Rendered at its resting positions with no JS, which doubles as the static
// fallback: under prefers-reduced-motion nothing is animated at all. The
// loops also pause while the section is off-screen.
const BLOBS = [
  // [position classes, color, drift keyframes, duration ms]
  {
    pos: 'left-[-15%] top-[-20%]',
    color: 'color-mix(in srgb, var(--color-accent) 46%, transparent)',
    drift: [
      { transform: 'translate3d(0,0,0) scale(1)' },
      { transform: 'translate3d(18%,12%,0) scale(1.12)' },
      { transform: 'translate3d(6%,24%,0) scale(0.96)' },
    ],
    ms: 32000,
  },
  {
    pos: 'right-[-20%] top-[5%]',
    // #d9a05b — the warm gold the hero gradient already used.
    color: 'color-mix(in srgb, #d9a05b 48%, transparent)',
    drift: [
      { transform: 'translate3d(0,0,0) scale(1)' },
      { transform: 'translate3d(-22%,10%,0) scale(0.92)' },
      { transform: 'translate3d(-8%,-8%,0) scale(1.1)' },
    ],
    ms: 38000,
  },
  {
    pos: 'bottom-[-30%] left-[20%]',
    color: 'color-mix(in srgb, var(--color-accent-hover) 28%, transparent)',
    drift: [
      { transform: 'translate3d(0,0,0) scale(1)' },
      { transform: 'translate3d(20%,-14%,0) scale(1.08)' },
      { transform: 'translate3d(-12%,-6%,0) scale(0.94)' },
    ],
    ms: 44000,
  },
  {
    // A lighter pool of the card surface keeps the mix airy, not muddy.
    pos: 'left-[30%] top-[25%]',
    color: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
    drift: [
      { transform: 'translate3d(0,0,0) scale(1)' },
      { transform: 'translate3d(-16%,10%,0) scale(1.15)' },
      { transform: 'translate3d(12%,-10%,0) scale(0.9)' },
    ],
    ms: 36000,
  },
] as const;

export function MeshGradient({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let anims: Animation[] = [];
    let visible = true;

    const sync = () => anims.forEach((a) => (visible ? a.play() : a.pause()));

    const start = () => {
      anims.forEach((a) => a.cancel());
      anims = [];
      if (mq.matches) return;
      // Phones and low-core / low-memory devices animate only the two lead
      // blobs; the rest stay as a static wash, which is most of the cost.
      const nav = navigator as Navigator & { deviceMemory?: number };
      const lowPower = window.innerWidth < 768 || (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
      Array.from(root.children).forEach((el, i) => {
        if (lowPower && i > 1) return;
        const { drift, ms } = BLOBS[i];
        anims.push(
          (el as HTMLElement).animate([...drift, drift[0]], {
            duration: ms,
            iterations: Infinity,
            easing: 'ease-in-out',
          }),
        );
      });
      sync();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(root);
    mq.addEventListener('change', start);
    start();

    return () => {
      io.disconnect();
      mq.removeEventListener('change', start);
      anims.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
    >
      {BLOBS.map(({ pos, color }, i) => (
        <div
          key={i}
          className={cn('absolute aspect-square w-[max(75vw,520px)] rounded-full will-change-transform', pos)}
          style={{ background: `radial-gradient(closest-side, ${color}, transparent)` }}
        />
      ))}
    </div>
  );
}
