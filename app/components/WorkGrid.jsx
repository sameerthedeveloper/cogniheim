'use client';

import { useState } from 'react';
import ProjectModal from './ProjectModal.jsx';

// Cards no longer jump straight to the live site — a one-line meta
// string can't carry what a project actually does, so a click now opens
// the full write-up in a modal (ProjectModal), which keeps the actual
// "visit site" link for anyone who wants to leave. Each card also
// carries its own description and tech tags directly, rather than
// making everything wait behind a click.
export default function WorkGrid({ work }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="mt-14 space-y-5">
        {/* Spotlight: the one live, public project gets the lead slot. Text
            and image sit in their own panels, side by side, instead of
            text stacked over the screenshot — the screenshot has its own
            headline baked in, and layering ours on top of it never reads
            cleanly. */}
        <button
          type="button"
          onClick={() => setActive(work[0])}
          className="work-spotlight reveal group relative grid w-full grid-cols-1 overflow-hidden rounded-3xl bg-noir text-left sm:grid-cols-2"
        >
          <div className="relative order-2 flex flex-col justify-center p-6 sm:order-1 sm:p-10">
            <span className="font-mono text-xs text-accent">01</span>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{work[0].name}</h3>
            <p className="mt-3 max-w-sm text-sm text-white/70 sm:text-[15px]">{work[0].description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {work[0].stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="work-thumb-wrap relative order-1 aspect-16/10 overflow-hidden sm:order-2 sm:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={work[0].image}
              alt={`${work[0].name} preview`}
              className="work-thumb-img h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-noir/30 to-transparent sm:bg-linear-to-r sm:from-noir/15" />
          </div>

          {/* Positioned relative to the whole card (not either column) —
              cursorLabel.js tracks the pointer using the card's full
              bounding rect, so the label's own offset parent has to
              match that, not just the image half. */}
          <span className="cursor-label pointer-events-none absolute left-0 top-0 z-10 flex h-22 w-22 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-accent text-sm font-medium text-white opacity-0">
            View details
          </span>
        </button>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.slice(1).map((project, i) => (
            <button
              key={project.name}
              type="button"
              onClick={() => setActive(project)}
              className="reveal lift-card group flex flex-col overflow-hidden rounded-3xl bg-white text-left shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(61,57,41,0.35)]"
            >
              <div className="relative overflow-hidden">
                <div className="work-thumb-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={`${project.name} preview`}
                    loading="lazy"
                    className="work-thumb-img aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="absolute left-4 top-4 rounded-md bg-white/90 px-2 py-1 font-mono text-xs text-ink">
                  {String(i + 2).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold tracking-tight text-ink">{project.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="self-center text-xs text-faint">+{project.stack.length - 3}</span>
                  )}
                </div>
                {project.highlight && (
                  <p className="mt-auto pt-3 text-xs font-medium text-accent">{project.highlight}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
