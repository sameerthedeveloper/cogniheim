import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export type ProjectStatus = 'Live' | 'Prototype' | 'In development';

export type Project = {
  name: string;
  /** Real screenshot of the product; omitted until one exists. */
  image?: string;
  /** One or two sentences for the card; the full write-up lives in the modal. */
  summary: string;
  category?: string;
  stack: readonly string[];
  status?: ProjectStatus;
  /** Parent-brand line for Cogniheim's own products, e.g. "by Cogniheim". */
  brand?: string;
  href?: string;
};

// Concave fillers either side of the notch, painted in the surface colour
// so the cover's own corners curve into it instead of meeting it at 90°.
const FILLER =
  'pointer-events-none absolute size-6 bg-[radial-gradient(circle_at_top_left,transparent_calc(1.5rem-0.5px),var(--notch-bg)_1.5rem)]';

// Cover for a product with no screenshot yet: its wordmark on noir over a
// faint grid. Deliberately no mock UI — nothing that implies screens or
// features that don't exist.
export function ProjectCoverPlaceholder({ name, brand, className }: { name: string; brand?: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative flex aspect-16/10 w-full flex-col items-center justify-center overflow-hidden bg-noir',
        'bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-size-[48px_48px]',
        className,
      )}
    >
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,color-mix(in_srgb,var(--color-accent)_18%,transparent),transparent)]" />
      <span className="relative text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{name}</span>
      {brand && <span className="relative mt-2 text-sm text-white/50">{brand}</span>}
    </div>
  );
}

// The dot is a reinforcement only — the status is always written out too.
const STATUS_DOT: Record<ProjectStatus, string> = {
  Live: 'bg-accent',
  Prototype: 'border-2 border-accent',
  'In development': 'border-2 border-faint',
};

// Notched Project Card: the cover has a rounded notch cut out of its
// bottom-right corner, and the open arrow sits nested inside it. The notch
// is filled with the section's own surface (`--notch-bg`), so the card
// reads as cut out of the page rather than a box laid on top of it.
//
// The whole cover is one button that opens the project write-up; a live
// site, when there is one, is a separate explicit external link below.
export function NotchedProjectCard({
  project,
  onOpen,
  className,
}: {
  project: Project;
  onOpen: () => void;
  className?: string;
}) {
  const { name, image, summary, category, stack, status, brand, href } = project;
  const host = href ? new URL(href).host : null;

  return (
    <article
      className={cn(
        'group reveal [--notch-bg:var(--color-surface-2)]',
        className,
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${name} write-up`}
        className="relative block w-full overflow-hidden rounded-3xl rounded-br-none bg-noir focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {image ? (
          <Image
            src={image}
            alt={`${name} — screenshot`}
            width={1440}
            height={900}
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 60vw, 85vw"
            className="aspect-16/10 w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <ProjectCoverPlaceholder name={name} brand={brand} />
        )}

        {category && (
          <span className="absolute bottom-4 left-4 whitespace-nowrap rounded-full bg-noir/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {category}
          </span>
        )}

        {/* The notch, its two concave fillers, and the arrow nested inside. */}
        <span aria-hidden="true" className="absolute right-0 bottom-0 size-18 rounded-tl-3xl bg-(--notch-bg) sm:size-20">
          <span className={cn(FILLER, 'right-0 bottom-full')} />
          <span className={cn(FILLER, 'right-full bottom-0')} />
          <span className="absolute right-0 bottom-0 grid size-14 place-items-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-accent-strong sm:size-16">
            <ArrowUpRight className="size-5 transition-transform duration-300 ease-out group-hover:rotate-45 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 sm:size-6" />
          </span>
        </span>
      </button>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent-hover">
          {name}
          {brand && <span className="ml-2 text-sm font-normal tracking-normal text-muted">{brand}</span>}
        </h3>
        <p className="mt-2 max-w-xl leading-relaxed text-muted">{summary}</p>

        {stack.length > 0 && (
          <ul aria-label="Built with" className="mt-5 flex flex-wrap gap-1.5">
            {stack.map((tech) => (
              <li key={tech} className="rounded-full bg-noir/80 px-2 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                {tech}
              </li>
            ))}
          </ul>
        )}

        {(status || href) && (
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {status && (
              <span className="inline-flex items-center gap-1.5 text-muted">
                <span aria-hidden="true" className={cn('size-2 rounded-full', STATUS_DOT[status])} />
                {status}
              </span>
            )}
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 font-medium text-accent-hover underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {host}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </p>
        )}
      </div>
    </article>
  );
}
