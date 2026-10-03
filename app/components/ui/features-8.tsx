import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './card';
import { cn } from '../../lib/utils.js';

export type Feature = {
  number: string;
  title: string;
  body: string;
  icon: LucideIcon;
  tone?: string;
};

// Icon in a double ring, Features 8's signature mark, in accent.
function IconRing({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-11 shrink-0 rounded-full border border-line text-accent-hover transition-colors duration-300 before:absolute before:-inset-2 before:rounded-full before:border before:border-line/70 group-hover:border-accent/60"
    >
      <Icon className="m-auto size-5" strokeWidth={1.5} />
    </span>
  );
}

function Copy({ number, title, body }: Pick<Feature, 'number' | 'title' | 'body'>) {
  return (
    <div className="space-y-2">
      <p
        aria-hidden="true"
        className="absolute top-5 right-6 font-mono text-sm text-faint transition-colors duration-300 group-hover:text-accent-hover"
      >
        {number}
      </p>
      <h3 className="text-xl font-semibold tracking-tight text-ink">{title}</h3>
      <p className="max-w-md leading-relaxed text-muted">{body}</p>
    </div>
  );
}

// Engineering: the stack the shipped work actually runs on (CinemaFocus),
// staged along a vertical line.
function StackStage() {
  return (
    <div
      aria-hidden="true"
      className="relative sm:-my-2 before:absolute before:inset-y-0 before:left-1/2 before:w-px before:bg-line"
    >
      <ul className="relative flex h-full flex-col justify-center gap-5 py-2">
        {[
          { label: 'Next.js', side: 'left' },
          { label: 'Tailwind CSS', side: 'right' },
          { label: 'AWS', side: 'left' },
        ].map(({ label, side }) => (
          <li
            key={label}
            className={cn(
              'relative flex w-[calc(50%+0.875rem)] items-center gap-2',
              side === 'left' ? 'justify-end' : 'ml-[calc(50%-0.875rem)]',
            )}
          >
            {side === 'right' && <span className="size-2.5 rounded-full border-2 border-accent bg-surface" />}
            <span className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-muted shadow-sm">
              {label}
            </span>
            {side === 'left' && <span className="size-2.5 rounded-full border-2 border-accent bg-surface" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

// SaaS: a quiet app-window sketch listing the infrastructure the copy names.
function SaasSketch() {
  return (
    <div
      aria-hidden="true"
      className="relative -mb-6 mt-2 h-fit rounded-tl-xl border-t border-l border-line bg-surface-3 p-5 pt-8 sm:-mr-6 sm:-mb-8 sm:ml-2 sm:mt-8"
    >
      <div className="absolute top-3 left-3 flex gap-1">
        <span className="size-2 rounded-full border border-line" />
        <span className="size-2 rounded-full border border-line" />
        <span className="size-2 rounded-full border border-line" />
      </div>
      <ul className="space-y-2.5 pb-6">
        {['Auth', 'Billing', 'Multi-tenancy'].map((label, i) => (
          <li key={label} className="flex items-center gap-3">
            <span className={cn('size-1.5 rounded-full', i === 0 ? 'bg-accent' : 'bg-line')} />
            <span className="text-xs font-medium text-muted">{label}</span>
            <span className={cn('h-2 flex-1 rounded-full', i === 0 ? 'bg-accent/30' : 'bg-line/70')} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  engineering: StackStage,
  saas: SaasSketch,
};

const cardClass =
  'reveal group relative overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_32px_-18px_color-mix(in_srgb,var(--color-accent)_45%,transparent)] motion-reduce:transition-colors motion-reduce:hover:translate-y-0';

// Features 8's bento: two plain cards across the top, then two wider cards
// that pair their copy with a small illustration.
export function Features({ items, className }: { items: readonly Feature[]; className?: string }) {
  return (
    <ul className={cn('grid grid-cols-6 gap-4', className)}>
      {items.map(({ number, title, body, icon, tone }) => {
        const Visual = tone ? VISUALS[tone] : undefined;

        return (
          <li key={title} className="col-span-full sm:col-span-3">
            <Card className={cn(cardClass, 'h-full')}>
              {Visual ? (
                <CardContent className="grid h-full gap-8 sm:grid-cols-2">
                  <div className="flex flex-col justify-between gap-8">
                    <IconRing icon={icon} />
                    <Copy number={number} title={title} body={body} />
                  </div>
                  <Visual />
                </CardContent>
              ) : (
                <CardContent className="flex h-full flex-col justify-between gap-8">
                  <IconRing icon={icon} />
                  <Copy number={number} title={title} body={body} />
                </CardContent>
              )}
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
