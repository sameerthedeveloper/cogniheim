'use client';

import { useEffect, useRef, useState } from 'react';
import {
  siC,
  siCplusplus,
  siExpress,
  siFigma,
  siFirebase,
  siGit,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRust,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons';
import { faAws, faJava } from '@fortawesome/free-brands-svg-icons';
import { cn } from '../../lib/utils.js';

type Mark = { label: string; viewBox: string; path: string; color: string };

const si = (icon: { title: string; path: string; hex: string }, label?: string): Mark => ({
  label: label ?? icon.title,
  viewBox: '0 0 24 24',
  path: icon.path,
  color: `#${icon.hex}`,
});

const fa = (icon: { icon: readonly unknown[] }, label: string, color: string): Mark => ({
  label,
  viewBox: `0 0 ${icon.icon[0]} ${icon.icon[1]}`,
  path: icon.icon[4] as string,
  color,
});

// Official brand glyphs in each brand's own colour. Simple Icons for most,
// Font Awesome for AWS and Java (Simple Icons dropped both).
type Group = { name: string; marks: Mark[]; cx: number; cy: number; ring: number };

// Four clusters on a loose map. Each is a small "flower": one mark in the
// middle when there are enough, the rest ringed around it.
const GROUPS: Group[] = [
  {
    name: 'Languages',
    cx: 0.27,
    cy: 0.29,
    ring: 52,
    marks: [
      si(siTypescript),
      si(siJavascript),
      si(siPython),
      fa(faJava, 'Java', '#ED8B00'),
      si(siCplusplus, 'C++'),
      si(siC, 'C'),
      si(siRust),
    ],
  },
  {
    name: 'Frontend',
    cx: 0.78,
    cy: 0.28,
    ring: 34,
    marks: [si(siReact), si(siNextdotjs), si(siTailwindcss), si(siVite)],
  },
  {
    name: 'Backend & data',
    cx: 0.32,
    cy: 0.77,
    ring: 46,
    marks: [si(siNodedotjs), si(siExpress, 'Express.js'), si(siPostgresql), si(siMongodb), si(siSupabase), si(siFirebase)],
  },
  {
    name: 'Cloud & tools',
    cx: 0.78,
    cy: 0.74,
    ring: 30,
    marks: [fa(faAws, 'AWS', '#FF9900'), si(siGit), si(siFigma)],
  },
];

const TILE = 44;
const REACH = 110; // pointer influence radius, px

type Tile = Mark & { group: string; cx: number; cy: number; ox: number; oy: number; i: number };

// Deterministic placement (server and client markup match). A group of 7 is
// a hex flower (centre + 6); smaller groups ring evenly.
function layout(): Tile[] {
  const tiles: Tile[] = [];
  let i = 0;
  for (const g of GROUPS) {
    const centre = g.marks.length === 7;
    const ringed = centre ? g.marks.slice(1) : g.marks;
    if (centre) tiles.push({ ...g.marks[0], group: g.name, cx: g.cx, cy: g.cy, ox: 0, oy: 0, i: i++ });
    ringed.forEach((m, k) => {
      const a = (k / ringed.length) * Math.PI * 2 - Math.PI / 2 + (g.name === 'Frontend' ? Math.PI / 4 : 0);
      tiles.push({ ...m, group: g.name, cx: g.cx, cy: g.cy, ox: Math.cos(a) * g.ring, oy: Math.sin(a) * g.ring, i: i++ });
    });
  }
  return tiles;
}

const tiles = layout();

export function StackCloud({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<string | null>(null); // spotlighted group
  const [pinned, setPinned] = useState<string | null>(null); // clicked group

  const active = pinned ?? focus;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    const els = Array.from(stage.querySelectorAll<HTMLElement>('[data-tile]'));
    let raf = 0;
    let px = 0;
    let py = 0;
    let inside = false;

    // Tiles lean toward the pointer and swell as it nears; position is
    // computed from each tile's resting spot, so it can't feed back on itself.
    const apply = () => {
      raf = 0;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      els.forEach((el, n) => {
        const t = tiles[n];
        if (!inside) {
          el.style.setProperty('--mx', '0px');
          el.style.setProperty('--my', '0px');
          el.style.setProperty('--ms', '1');
          return;
        }
        const bx = t.cx * w + t.ox;
        const by = t.cy * h + t.oy;
        const dx = px - bx;
        const dy = py - by;
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.max(0, 1 - d / REACH);
        el.style.setProperty('--mx', `${(dx / d) * k * 12}px`);
        el.style.setProperty('--my', `${(dy / d) * k * 12}px`);
        el.style.setProperty('--ms', `${1 + k * 0.28}`);
      });
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const move = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      inside = true;
      queue();
    };
    const leave = () => {
      inside = false;
      queue();
    };
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className={cn('w-full', className)}>
      <ul className="sr-only">
        {GROUPS.map((g) => (
          <li key={g.name}>
            {g.name}: {g.marks.map((m) => m.label).join(', ')}
          </li>
        ))}
      </ul>

      <div ref={stageRef} aria-hidden="true" className="relative h-80 w-full">
        {tiles.map((t) => {
          const dim = active !== null && active !== t.group;
          return (
            <span
              key={t.label}
              data-tile
              className="group/tile absolute transition-[opacity,transform] duration-300 ease-out"
              style={{
                left: `calc(${t.cx * 100}% + ${t.ox - TILE / 2}px)`,
                top: `calc(${t.cy * 100}% + ${t.oy - TILE / 2}px)`,
                rotate: `${(((t.i * 37) % 13) - 6) * 0.8}deg`,
                opacity: dim ? 0.22 : 1,
                transform: `translate(var(--mx, 0px), var(--my, 0px)) scale(calc(var(--ms, 1) * ${dim ? 0.88 : 1}))`,
                zIndex: active === t.group ? 2 : 1,
              }}
            >
              <span
                className="float-y relative grid size-11 place-items-center rounded-xl border border-line bg-surface shadow-[0_10px_20px_-12px_rgb(61_57_41/0.4)] transition-colors duration-200 group-hover/tile:border-accent/60"
                style={{
                  ['--float-duration' as string]: `${6 + ((t.i * 7) % 5) * 0.6}s`,
                  ['--float-delay' as string]: `${-((t.i * 3) % 7)}s`,
                }}
              >
                <svg viewBox={t.viewBox} className="size-6" fill={t.color}>
                  <path d={t.path} />
                </svg>
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-opacity duration-150 group-hover/tile:opacity-100">
                  {t.label}
                </span>
              </span>
            </span>
          );
        })}
      </div>

      {/* The legend is also the control: hover or tap a group to spotlight it. */}
      <div role="group" aria-label="Highlight a group of technologies" className="mt-3 flex flex-wrap gap-2">
        {GROUPS.map((g) => {
          const on = active === g.name;
          return (
            <button
              key={g.name}
              type="button"
              aria-pressed={pinned === g.name}
              onClick={() => setPinned(pinned === g.name ? null : g.name)}
              onPointerEnter={() => setFocus(g.name)}
              onPointerLeave={() => setFocus(null)}
              onFocus={() => setFocus(g.name)}
              onBlur={() => setFocus(null)}
              className={cn(
                'inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                on ? 'border-ink bg-ink text-white' : 'border-line bg-surface text-muted hover:border-accent/60 hover:text-ink',
              )}
            >
              {g.name}
              <span className={cn('tabular-nums', on ? 'text-white/60' : 'text-faint')}>{g.marks.length}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
