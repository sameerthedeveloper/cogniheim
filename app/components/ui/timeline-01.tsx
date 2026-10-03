import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export type TimelineItem = {
  label: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

// Timeline 01's structure — a vertical rail, icon markers sitting on it, a
// label pill and the entry beside each — on the site's paper tokens. The
// class hooks (.journey-rail, -rail-fill, -dot, -row) are what
// animations/journeyProgress.js drives: the accent fill draws down with
// scroll and each marker flips to `.is-passed` as the fill reaches it
// (globals.css sets the passed border/background; the icon color is here).
export function Timeline({ items, className }: { items: readonly TimelineItem[]; className?: string }) {
  return (
    <div className={cn('journey-rail relative', className)}>
      <span aria-hidden="true" className="pointer-events-none absolute top-4 bottom-4 left-4 w-px -translate-x-1/2 bg-line" />
      <span
        aria-hidden="true"
        className="journey-rail-fill pointer-events-none absolute top-4 bottom-4 left-4 w-px -translate-x-1/2 origin-top scale-y-0 bg-accent"
      />

      <ol className="space-y-12">
        {items.map(({ label, title, body, icon: Icon }) => (
          <li key={title} className="reveal journey-row group relative pl-14">
            <span
              aria-hidden="true"
              className="journey-dot absolute top-0 left-0 grid size-8 place-items-center rounded-full border-2 border-line bg-surface-3 text-muted transition-colors duration-300 group-hover:border-accent [&.is-passed]:text-white"
            >
              <Icon className="size-4" strokeWidth={1.75} />
            </span>

            <p className="inline-flex rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
              {label}
            </p>
            <h3 className="mt-2.5 text-2xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent-hover">
              {title}
            </h3>
            <p className="mt-2 max-w-xl leading-relaxed text-muted">{body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
