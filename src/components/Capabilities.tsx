import { useRef, useCallback } from "react";
import { Monitor, PenTool, Code2, Rocket, LayoutGrid } from "lucide-react";
import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";
import { FloatIcon } from "./FloatIcon";

const ICONS = [Monitor, PenTool, Code2, Rocket];

export function Capabilities() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { capabilities } = content;
  const gridRef = useRef<HTMLDivElement>(null);

  // mouse-tracking spotlight for the card grid
  const onCardMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  }, []);

  return (
    <section
      id="capabilities"
      className="ch-section relative"
    >
      <FloatIcon icon={LayoutGrid} float="bob" size={22} className="pointer-events-none absolute right-[10%] top-[14%] hidden text-accent/25 lg:block" />
      <div ref={ref} className="ch-container">
        <h2 data-reveal="words" className="font-display max-w-md text-[clamp(1.9rem,4.2vw,3.2rem)] font-medium leading-[1.15] text-text">
          {capabilities.eyebrow}
        </h2>

        <div ref={gridRef} className="mt-16 grid gap-px overflow-hidden rounded-ch-lg bg-white/[0.04] md:grid-cols-2">
          {capabilities.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <a
                key={i}
                href="#contact"
                data-reveal
                data-cursor="interact"
                onMouseMove={onCardMove}
                className="ch-glow-border group relative bg-surface p-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface-2 hover:-translate-y-0.5 md:p-14"
              >
                <Icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-accent/60 transition-all duration-500 group-hover:scale-110 group-hover:text-accent"
                />
                <h3 className="font-display mt-7 text-2xl font-medium text-text md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
                  {item.desc}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
