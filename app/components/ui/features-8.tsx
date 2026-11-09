import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './card';
import { Spotlight } from './spotlight';
import { StackCloud } from './stack-cloud';
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

function Copy({ title, body }: Pick<Feature, 'title' | 'body'>) {
  return (
    <div className="space-y-2">
      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{title}</h3>
      <p className="max-w-md leading-relaxed text-muted">{body}</p>
    </div>
  );
}

// Strategy: the three questions the copy promises to answer before any
// build starts, as a quiet checklist.
function StrategyVisual() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col justify-end gap-2.5">
      {[
        ['Who is it for?', true],
        ['What is the smallest version that proves it?', true],
        ['What is most likely to break?', false],
      ].map(([label, done]) => (
        <div
          key={label as string}
          className="flex items-center gap-3 rounded-xl border border-line bg-surface-3 px-3.5 py-2.5 text-sm text-muted"
        >
          <span
            className={cn(
              'grid size-5 shrink-0 place-items-center rounded-full border text-[11px] leading-none',
              done ? 'border-accent bg-accent text-white' : 'border-line bg-surface text-faint',
            )}
          >
            {done ? '✓' : '?'}
          </span>
          {label as string}
        </div>
      ))}
    </div>
  );
}

// Design: the same screen as a wireframe and as finished UI, structure
// first, decoration second.
// Design: the same screen as a wireframe and as finished UI.
function Bars({ solid }: { solid: boolean }) {
  return (
    <div className="space-y-2">
      <div className={cn('h-2.5 w-2/3 rounded-full', solid ? 'bg-ink/80' : 'border border-dashed border-faint')} />
      <div className={cn('h-2 w-full rounded-full', solid ? 'bg-line' : 'border border-dashed border-line')} />
      <div className={cn('h-2 w-5/6 rounded-full', solid ? 'bg-line' : 'border border-dashed border-line')} />
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className={cn('h-10 rounded-lg', solid ? 'bg-accent/25' : 'border border-dashed border-line')} />
        <div className={cn('h-10 rounded-lg', solid ? 'bg-surface-2' : 'border border-dashed border-line')} />
      </div>
      <div className={cn('h-6 w-1/3 rounded-full', solid ? 'bg-accent-strong' : 'border border-dashed border-faint')} />
    </div>
  );
}

function DesignVisual() {
  return (
    <div aria-hidden="true" className="grid h-full grid-cols-2 items-center gap-3">
      <div className="rounded-xl border border-dashed border-line p-3.5">
        <Bars solid={false} />
      </div>
      <div className="rounded-xl border border-line bg-surface-3 p-3.5 shadow-sm">
        <Bars solid />
      </div>
    </div>
  );
}

// Engineering: the real marks of the stack the shipped work runs on,
// floating at different rhythms. Marks are the official brand glyphs
// (Simple Icons for Next.js and Tailwind CSS, Font Awesome for AWS) in
// each brand's own colour. Motion is CSS-only and off under reduced motion.
function StackStage() {
  return <StackCloud />;
}

// SaaS: a quiet app-window sketch listing the infrastructure the copy names.
function SaasSketch() {
  return (
    <div
      aria-hidden="true"
      className="relative h-fit rounded-xl border border-line bg-surface-3 p-5 pt-8 sm:ml-2"
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
  products: StrategyVisual,
  design: DesignVisual,
  engineering: StackStage,
  saas: SaasSketch,
};

// Bento widths: narrow/wide on the first row, wide/narrow on the second.
const SPAN: Record<string, string> = {
  products: 'sm:col-span-2',
  design: 'sm:col-span-4',
  engineering: 'sm:col-span-4',
  saas: 'sm:col-span-2',
};
const WIDE = new Set(['design', 'engineering']);

const cardClass =
  'reveal group relative overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_32px_-18px_color-mix(in_srgb,var(--color-accent)_45%,transparent)] motion-reduce:transition-colors motion-reduce:hover:translate-y-0';

// Bento grid: four cards, each pairing its copy with a small illustration of
// what the service actually covers. Wide cards sit copy-left, art-right;
// narrow cards stack copy over art.
export function Features({ items, className }: { items: readonly Feature[]; className?: string }) {
  return (
    <ul className={cn('grid grid-cols-1 gap-4 sm:grid-cols-6', className)}>
      {items.map(({ title, body, icon, tone }) => {
        const Visual = tone ? VISUALS[tone] : undefined;
        const wide = tone ? WIDE.has(tone) : false;

        return (
          <li key={title} className={cn('col-span-full', tone && SPAN[tone])}>
            <Spotlight className="h-full rounded-2xl">
              <Card className={cn(cardClass, 'h-full')}>
                <CardContent className={cn('grid h-full gap-8', wide && (tone === 'engineering' ? 'sm:grid-cols-[1fr_1.1fr]' : 'sm:grid-cols-[1.35fr_1fr]'))}>
                  <div className="flex flex-col justify-between gap-8">
                    <IconRing icon={icon} />
                    <Copy title={title} body={body} />
                  </div>
                  {Visual && (
                    <div className={cn(wide ? 'self-center' : 'min-h-40')}>
                      <Visual />
                    </div>
                  )}
                </CardContent>
              </Card>
            </Spotlight>
          </li>
        );
      })}
    </ul>
  );
}
