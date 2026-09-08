'use client';

import { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { Button } from './ui/button.jsx';

// A single project's full write-up — description, stack, and the one
// stat worth bragging about — surfaced on demand instead of cramming it
// all onto the card. Opens with one deliberate scale+fade (GSAP), closes
// the same way; Escape and a backdrop click both dismiss it, and focus
// moves to the dialog and back to the trigger card on close.
export default function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!project) return;

    previouslyFocused.current = document.activeElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    if (reducedMotion) {
      gsap.set(backdropRef.current, { opacity: 1 });
      gsap.set(panelRef.current, { opacity: 1, scale: 1, y: 0 });
    } else {
      gsap.set(panelRef.current, { opacity: 0, scale: 0.96, y: 10 });
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.25 });
      gsap.to(panelRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' });
    }

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
      if (previouslyFocused.current instanceof HTMLElement) previouslyFocused.current.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const { name, image, description, stack, highlight, href } = project;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-90 flex items-center justify-center bg-noir/60 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === backdropRef.current) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-line bg-surface shadow-[0_30px_60px_-20px_rgba(61,57,41,0.45)]"
      >
        <div className="relative aspect-16/9 overflow-hidden rounded-t-3xl bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={`${name} preview`} className="h-full w-full object-cover" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink transition-colors hover:bg-white"
          >
            <X className="h-4.5 w-4.5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h3 id="project-modal-title" className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-ink">
            {name}
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={`Open ${name} in a new tab`}
                className="text-muted transition-colors hover:text-accent"
              >
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
          </h3>

          {stack?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-5 text-[15px] leading-relaxed text-muted">{description}</p>

          {highlight && (
            <p className="mt-4 border-l-2 border-accent pl-3 text-[15px] text-ink">{highlight}</p>
          )}

          {href && (
            <div className="mt-7">
              <Button as="a" href={href} target="_blank" rel="noopener">
                Visit live site
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
