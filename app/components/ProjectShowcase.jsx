'use client';

import { useCallback, useMemo, useState } from 'react';
import { NotchedProjectCard } from './ui/notched-project-card';
import ProjectModal from './ProjectModal.jsx';
import { cn } from '../lib/utils.js';

const STATUSES = ['Live', 'In development', 'Planning', 'Prototype'];

// Work as a filterable grid. Filtering by status is the useful question for
// a visitor ("what can I use today?"), and it matches the honest-status
// language used across the site. Each card opens a write-up modal that can
// step through the projects currently shown.
export default function ProjectShowcase({ work }) {
  const [filter, setFilter] = useState('All');
  const [activeSlug, setActiveSlug] = useState(null);

  const counts = useMemo(
    () => Object.fromEntries(STATUSES.map((s) => [s, work.filter((p) => p.status === s).length])),
    [work],
  );
  const filters = ['All', ...STATUSES.filter((s) => counts[s] > 0)];
  const shown = filter === 'All' ? work : work.filter((p) => p.status === filter);

  const activeIndex = shown.findIndex((p) => p.slug === activeSlug);
  const close = useCallback(() => setActiveSlug(null), []);
  const step = useCallback(
    (dir) => {
      if (!shown.length || activeIndex < 0) return;
      setActiveSlug(shown[(activeIndex + dir + shown.length) % shown.length].slug);
    },
    [shown, activeIndex],
  );

  return (
    <>
      <div role="group" aria-label="Filter projects by status" className="flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const on = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={cn(
                'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                on ? 'border-ink bg-ink text-white' : 'border-line bg-surface text-muted hover:border-accent/60 hover:text-ink',
              )}
            >
              {f}
              <span className={cn('text-xs tabular-nums', on ? 'text-white/60' : 'text-faint')}>
                {f === 'All' ? work.length : counts[f]}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status">
        Showing {shown.length} of {work.length} projects
      </p>

      <ul aria-label="Projects" className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {shown.map((project) => (
          <li key={project.slug}>
            <NotchedProjectCard project={project} onOpen={() => setActiveSlug(project.slug)} />
          </li>
        ))}
      </ul>

      <ProjectModal
        project={activeIndex >= 0 ? shown[activeIndex] : null}
        position={activeIndex >= 0 ? [activeIndex + 1, shown.length] : null}
        onClose={close}
        onStep={step}
      />
    </>
  );
}
