'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export type CarouselProject = {
  name: string;
  category?: string;
  image: string;
  href?: string;
  stack: string[];
  description: string;
  highlight?: string;
};

// Feature-carousel style: one project is the feature — large, full colour —
// while its neighbours sit behind it, smaller and dimmed, and slide into the
// lead position on click, swipe, arrow key or dot. Pure CSS transforms (no
// animation library): each slide's offset from the active index drives
// translate/scale/opacity through custom properties, and the transition is
// switched off under prefers-reduced-motion.
export function FeatureCarousel({
  items,
  onOpen,
  className,
}: {
  items: readonly CarouselProject[];
  onOpen: (item: CarouselProject) => void;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const count = items.length;
  const drag = useRef<{ x: number; id: number } | null>(null);
  const dragged = useRef(false);

  const go = useCallback((i: number) => setActive(((i % count) + count) % count), [count]);

  // Shortest signed distance around the loop, so the last project sits to
  // the left of the first instead of far off to the right.
  const offsetOf = (i: number) => {
    let o = i - active;
    if (o > count / 2) o -= count;
    if (o < -count / 2) o += count;
    return o;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'ArrowRight') go(active + 1);
    else if (e.key === 'ArrowLeft') go(active - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(count - 1);
    else return;
    e.preventDefault();
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, id: e.pointerId };
    dragged.current = false;
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current && Math.abs(e.clientX - drag.current.x) > 8) dragged.current = true;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
  };

  const navRef = useRef<HTMLDivElement>(null);

  // On phones the project list is a horizontal strip; keep the selected pill in view
  // by scrolling the strip itself (never the page).
  useEffect(() => {
    const nav = navRef.current;
    const pill = nav?.children[active] as HTMLElement | undefined;
    if (!nav || !pill || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: pill.offsetLeft - (nav.clientWidth - pill.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <div
      className={cn(
        'grid select-none grid-cols-[minmax(0,1fr)] overflow-hidden rounded-3xl bg-noir',
        count > 1 && 'md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]',
        className,
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
    >
      {/* Project list — only worth showing once there's more than one. */}
      {count > 1 && (
      <div className="flex min-w-0 items-center bg-accent-hover md:rounded-r-3xl md:p-8">
        <div
          ref={navRef}
          role="group"
          aria-label="Choose a project"
          className="flex w-full gap-2 overflow-x-auto px-4 py-4 [scrollbar-width:none] md:flex-col md:gap-3 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => {
            const d = Math.abs(offsetOf(i));
            const selected = i === active;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => go(i)}
                aria-current={selected}
                style={{ opacity: selected ? 1 : Math.max(0.85, 1 - d * 0.05) }}
                className={cn(
                  'flex shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 text-left text-sm font-medium tracking-tight transition-[background-color,color,border-color,opacity] duration-300 motion-reduce:transition-none md:w-fit md:px-5 md:py-3 md:text-[15px]',
                  selected
                    ? 'border-transparent bg-surface text-accent-hover'
                    : 'border-white/30 text-white hover:border-white/60 hover:bg-white/10',
                )}
              >
                <span className="font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
      )}

      {/* Stage */}
      <div
        tabIndex={count > 1 ? 0 : -1}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current = null)}
        aria-label={count > 1 ? 'Project slides — use the left and right arrow keys' : 'Project slide'}
        className="relative grid touch-pan-y content-center justify-items-center overflow-hidden px-0 py-8 outline-offset-[-4px] [--step:0%] focus-visible:outline-2 focus-visible:outline-accent md:py-10 md:[--step:66%]"
      >
        {items.map((item, i) => {
          const o = offsetOf(i);
          const isActive = o === 0;
          const visible = Math.abs(o) <= 1;
          return (
            <div
              key={item.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${item.name}`}
              aria-hidden={!isActive}
              style={
                {
                  '--o': o,
                  transform: `translateX(calc(var(--o) * var(--step))) scale(${isActive ? 1 : 0.86})`,
                  zIndex: 10 - Math.abs(o),
                  pointerEvents: visible ? 'auto' : 'none',
                } as React.CSSProperties
              }
              className={cn(
                'relative w-[88%] [grid-area:1/1] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:w-[72%] md:max-w-2xl',
                // Neighbours only peek out on md+; on a phone the lead slide is alone.
                isActive ? 'opacity-100' : visible ? 'opacity-0 md:opacity-40' : 'opacity-0',
              )}
            >
              {/* Inactive slides are a single click target that brings them forward. */}
              {!isActive && visible && (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={`Show ${item.name}`}
                  onClick={() => !dragged.current && go(i)}
                  className="absolute inset-0 z-20 cursor-pointer rounded-3xl"
                />
              )}

              <article
                inert={!isActive}
                className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_60px_-35px_rgba(61,57,41,0.45)]"
              >
                <button
                  type="button"
                  onClick={() => !dragged.current && onOpen(item)}
                  aria-label={`Open details for ${item.name}`}
                  className="group block w-full cursor-pointer overflow-hidden bg-surface-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={`${item.name} preview`}
                    width={1000}
                    height={625}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="aspect-16/10 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </button>

                <div className="flex flex-col gap-3 p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      {count > 1 && (
                        <p className="font-mono text-xs text-accent-hover">
                          {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                        </p>
                      )}
                      <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{item.name}</h3>
                      {item.category && <p className="mt-0.5 text-sm text-muted">{item.category}</p>}
                    </div>
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex shrink-0 items-center gap-1 pt-1 text-sm font-medium text-accent-hover transition-opacity hover:opacity-70"
                      >
                        Visit site
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only"> ({item.name}, opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">{item.description}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <li key={tech} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {item.highlight && <p className="text-xs font-medium text-accent-hover">{item.highlight}</p>}
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}
