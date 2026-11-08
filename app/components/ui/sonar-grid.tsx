'use client';

import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils.js';

// Sonar Grid (after n1m4mz's 21st.dev hero background): a canvas dot grid where
// rings expand from where you tap, ambient pings keep it alive, and one ring
// is already mid-flight at first paint. Zero deps. Colours come from the
// site's --color-ink / --color-accent tokens. Under reduced motion it draws
// that mid-flight frame once and never animates.
//
// Background only: it fills its positioned parent and listens for taps on it.

type Ring = { x: number; y: number; t0: number };

type Props = {
  className?: string;
  spacing?: number;
  ringWidth?: number;
  /** Ring speed in px/second. */
  speed?: number;
  /** How much a dot grows at the ring's crest, as a multiple of its base radius. */
  amplitude?: number;
  /** Seconds between ambient pings. */
  pingEvery?: number;
  baseOpacity?: number;
  interactive?: boolean;
  /** Ambient ping region as fractions of the box: [x0, y0, x1, y1]. */
  pingArea?: [number, number, number, number];
};

function token(name: string, fallback: [number, number, number]): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = /^#([0-9a-f]{6})$/i.exec(raw);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function SonarGrid({
  className,
  spacing = 26,
  ringWidth = 90,
  speed = 260,
  amplitude = 2.2,
  pingEvery = 2.4,
  baseOpacity = 0.3,
  interactive = true,
  pingArea = [0.05, 0.1, 0.95, 0.9],
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ink = token('--color-ink', [61, 57, 41]);
    const accent = token('--color-accent', [217, 119, 87]);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let rings: Ring[] = [];
    let raf = 0;
    let visible = true;
    let lastPing = 0;

    const now = () => performance.now() / 1000;
    const spawn = (x: number, y: number, t = now()) => {
      rings.push({ x, y, t0: t });
      if (rings.length > 8) rings.shift();
    };
    const ambient = (t: number) => {
      const [x0, y0, x1, y1] = pingArea;
      spawn(w * (x0 + Math.random() * (x1 - x0)), h * (y0 + Math.random() * (y1 - y0)), t);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const reach = Math.hypot(w, h) * 0.7;
      rings = rings.filter((r) => (t - r.t0) * speed < reach);
      const live = rings.map((r) => ({
        x: r.x,
        y: r.y,
        r: (t - r.t0) * speed,
        fade: 1 - ((t - r.t0) * speed) / reach,
      }));

      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      const ox = (w - (cols - 1) * spacing) / 2;
      const oy = (h - (rows - 1) * spacing) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = ox + i * spacing;
          const y = oy + j * spacing;
          let k = 0;
          for (const ring of live) {
            const d = Math.abs(Math.hypot(x - ring.x, y - ring.y) - ring.r);
            if (d < ringWidth) {
              const f = 1 - d / ringWidth;
              k = Math.max(k, f * f * ring.fade);
            }
          }
          const radius = 1.1 * (1 + (amplitude - 1) * k);
          const a = baseOpacity + (1 - baseOpacity) * k * 0.85;
          const rr = Math.round(ink[0] + (accent[0] - ink[0]) * k);
          const gg = Math.round(ink[1] + (accent[1] - ink[1]) * k);
          const bb = Math.round(ink[2] + (accent[2] - ink[2]) * k);
          ctx.fillStyle = `rgba(${rr},${gg},${bb},${a * 0.9})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const frame = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      const t = now();
      if (t - lastPing > pingEvery) {
        lastPing = t;
        ambient(t);
      }
      draw(t);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(now());
    };

    const onDown = (e: PointerEvent) => {
      if (!interactive || reduce) return;
      const r = host.getBoundingClientRect();
      spawn(e.clientX - r.left, e.clientY - r.top);
      start();
    };

    resize();
    // One ring already mid-flight at first paint.
    const [x0, y0, x1, y1] = pingArea;
    const t = now();
    spawn(w * (x0 + 0.55 * (x1 - x0)), h * (y0 + 0.4 * (y1 - y0)), t - 0.9);
    lastPing = t;
    draw(t);
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(host);
    const onVis = () => !document.hidden && start();
    document.addEventListener('visibilitychange', onVis);
    host.addEventListener('pointerdown', onDown);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      host.removeEventListener('pointerdown', onDown);
    };
  }, [spacing, ringWidth, speed, amplitude, pingEvery, baseOpacity, interactive, pingArea]);

  return <canvas ref={ref} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 size-full', className)} />;
}
