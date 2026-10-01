"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Faq3Props {
  eyebrow?: string;
  heading: string;
  items: FaqItem[];
  /** Small "still stuck?" prompt shown under the heading */
  support?: { text: string; label: string; href: string };
  className?: string;
}

// Two-column FAQ: sticky intro on the left, single-open accordion on the
// right. Plain buttons + aria-expanded (no Radix) — the height animation is
// a CSS grid-rows transition, disabled under prefers-reduced-motion.
export const Faq3 = ({ eyebrow, heading, items, support, className }: Faq3Props) => {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className={cn("grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20", className)}>
      <div className="lg:sticky lg:top-28 lg:self-start">
        {eyebrow && (
          <p className="text-sm tracking-[0.2em] text-accent">{eyebrow}</p>
        )}

        <h2
          id="faq-heading"
          className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl"
        >
          {heading}
        </h2>

        {support && (
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {support.text}{" "}
            <a
              href={support.href}
              className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {support.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </p>
        )}
      </div>

      <ul className="divide-y divide-line border-y border-line">
        {items.map((item, index) => {
          const isOpen = open === index;
          const triggerId = `${baseId}-trigger-${index}`;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <li key={item.question}>
              <h3>
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={cn(
                      "text-lg font-semibold tracking-tight transition-colors sm:text-xl",
                      isOpen ? "text-accent" : "text-ink group-hover:text-accent"
                    )}
                  >
                    {item.question}
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink transition-all duration-300 motion-reduce:transition-none",
                      isOpen && "rotate-45 bg-accent text-white"
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-6 leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Faq3;
