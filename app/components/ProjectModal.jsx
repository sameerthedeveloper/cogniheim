'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { Button } from './ui/button.jsx';
import { StatusBadge } from './ui/status-badge.jsx';
import { ProjectCoverPlaceholder } from './ui/notched-project-card';
import { STATUS_NOTE } from '../lib/site.js';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// One project's full write-up. Escape, backdrop click and the close button
// dismiss it; ← / → (and the footer arrows) step through the projects on
// screen; Tab stays inside the dialog and focus returns to the card on close.
export default function ProjectModal({ project, position, onClose, onStep }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const previouslyFocused = useRef(null);
  const isOpen = Boolean(project);

  // Open/close lifecycle — runs only when the dialog opens or closes, not on
  // every step between projects.
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    if (!reducedMotion) {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.96, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' },
      );
    }

    return () => {
      document.body.style.overflow = '';
      if (previouslyFocused.current instanceof HTMLElement) previouslyFocused.current.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event) => {
      if (event.key === 'Escape') return onClose();
      if (event.key === 'ArrowLeft') return onStep(-1);
      if (event.key === 'ArrowRight') return onStep(1);
      if (event.key !== 'Tab') return;
      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, onStep]);

  // Scroll the write-up back to the top when stepping to another project.
  useEffect(() => {
    if (project && panelRef.current) panelRef.current.scrollTop = 0;
  }, [project]);

  if (!project) return null;

  const { name, slug, image, description, stack, highlight, href, status, brand, category } = project;
  const many = position && position[1] > 1;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-90 flex items-center justify-center bg-noir/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === backdropRef.current) onClose();
      }}
    >
      <div
        ref={panelRef}
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-3xl border border-line bg-surface shadow-[0_30px_60px_-20px_rgba(61,57,41,0.45)]"
      >
        <div>
          <div className="relative m-3 aspect-2/1 overflow-hidden rounded-2xl bg-noir sm:m-4">
            {image ? (
              <Image
                key={slug}
                src={image}
                alt={`${name} screenshot`}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <ProjectCoverPlaceholder name={name} brand={brand} className="aspect-auto h-full" />
            )}
          </div>

          <div className="flex flex-col p-5 pt-3 sm:px-8 sm:pb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {status && <StatusBadge status={status} />}
                {category && <span className="text-sm text-faint">{category}</span>}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent/60 hover:text-accent-hover"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <h3
              id="project-modal-title"
              className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
            >
              {name}
            </h3>
            {brand && <p className="mt-1 text-sm text-faint">{brand}</p>}

            <div className="mt-5 grid gap-x-10 gap-y-6 md:grid-cols-[1.15fr_1fr]">
            <div>
            <p className="leading-relaxed text-muted">{description}</p>
            {highlight && <p className="mt-5 border-l-2 border-accent pl-3 text-ink">{highlight}</p>}
            </div>

            <div>
            <dl className="grid gap-x-4 gap-y-3 text-sm sm:grid-cols-[5.5rem_1fr]">
              <dt className="text-faint">Status</dt>
              <dd className="text-ink">{STATUS_NOTE[status]}</dd>
              <dt className="text-faint">Built with</dt>
              <dd>
                {stack?.length ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-ink">Not yet listed</span>
                )}
              </dd>
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              {href ? (
                <Button as="a" href={href} target="_blank" rel="noopener">
                  Visit {href.replace('https://', '')}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </Button>
              ) : (
                <p className="text-sm font-medium text-ink">No public link yet.</p>
              )}
              <a
                href="/contact"
                className="text-sm font-medium text-accent-hover underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                Ask about {name}
              </a>
            </div>
            </div>
            </div>

            {many && (
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                <p className="text-sm tabular-nums text-faint" aria-live="polite">
                  {position[0]} of {position[1]}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onStep(-1)}
                    aria-label="Previous project"
                    className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent/60 hover:text-accent-hover"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onStep(1)}
                    aria-label="Next project"
                    className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent/60 hover:text-accent-hover"
                  >
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
