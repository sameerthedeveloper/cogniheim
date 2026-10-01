"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface Testimonial {
  /** Project name */
  name: string;
  /** Category / tech stack line */
  designation: string;
  /** Short description */
  quote: string;
  /** Preview image */
  src: string;
  /** Alt text for the preview; defaults to "<name> preview" */
  alt?: string;
}

export interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  /** Autoplay interval in ms */
  interval?: number;
  className?: string;
  /** Rendered under the description, next to the nav — e.g. a CTA */
  renderAction?: (item: Testimonial, index: number) => React.ReactNode;
}

// Deterministic tilt per card. (Math.random() here would differ between
// server and client render and cause a hydration mismatch.)
const tilt = (index: number) => ((index * 7) % 21) - 10;

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  interval = 5000,
  className,
  renderAction,
}: AnimatedTestimonialsProps) => {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = testimonials.length;

  const handleNext = useCallback(
    () => setActive((i) => (count ? (i + 1) % count : 0)),
    [count]
  );
  const handlePrev = useCallback(
    () => setActive((i) => (count ? (i - 1 + count) % count : 0)),
    [count]
  );

  useEffect(() => {
    if (!autoplay || reduceMotion || count < 2) return;

    const id = setInterval(handleNext, interval);

    return () => clearInterval(id);
  }, [autoplay, reduceMotion, count, interval, handleNext]);

  if (count === 0) return null;

  const current = testimonials[Math.min(active, count - 1)];
  const hasNav = count > 1;

  return (
    <div
      className={cn("grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
    >
      <div className="relative aspect-4/3 w-full">
        <AnimatePresence>
          {testimonials.map((item, index) => {
            const isActive = index === active;

            return (
              <motion.div
                key={item.src}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, rotate: tilt(index) }}
                animate={
                  reduceMotion
                    ? { opacity: isActive ? 1 : 0 }
                    : {
                        opacity: isActive ? 1 : 0.5,
                        scale: isActive ? 1 : 0.94,
                        rotate: isActive ? 0 : tilt(index),
                        zIndex: isActive ? 40 : count + 2 - index,
                        y: isActive ? [0, -24, 0] : 0,
                      }
                }
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, rotate: tilt(index) }}
                transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
                aria-hidden={!isActive}
              >
                <Image
                  src={item.src}
                  alt={item.alt ?? `${item.name} preview`}
                  fill
                  sizes="(min-width: 768px) 560px, 100vw"
                  draggable={false}
                  priority={index === 0}
                  className="rounded-3xl object-cover object-top shadow-[0_18px_40px_-20px_rgba(61,57,41,0.35)]"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-between py-2">
        <motion.div
          key={active}
          initial={reduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.3, ease: "easeInOut" }}
          aria-live="polite"
        >
          <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {current.name}
          </h3>

          <p className="mt-1.5 text-sm text-muted">{current.designation}</p>

          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {reduceMotion
              ? current.quote
              : current.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={`${active}-${i}`}
                    initial={{ filter: "blur(8px)", opacity: 0, y: 4 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut", delay: 0.015 * i }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {renderAction?.(current, active)}

          {hasNav && (
            <div className="flex items-center gap-3 md:ml-auto">
              <span className="font-mono text-xs text-faint" aria-hidden="true">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="group/button flex h-9 w-9 items-center justify-center rounded-full bg-surface-3 transition-colors hover:bg-line"
              >
                <ArrowLeft className="h-5 w-5 text-ink transition-transform duration-300 group-hover/button:-translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="group/button flex h-9 w-9 items-center justify-center rounded-full bg-surface-3 transition-colors hover:bg-line"
              >
                <ArrowRight className="h-5 w-5 text-ink transition-transform duration-300 group-hover/button:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
