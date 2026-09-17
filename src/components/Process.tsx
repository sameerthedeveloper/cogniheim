import { Lightbulb, PenTool, Hammer, TrendingUp, Compass } from "lucide-react";
import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";
import { FloatIcon } from "./FloatIcon";

const ICONS = [Lightbulb, PenTool, Hammer, TrendingUp];

export function Process() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { process } = content;

  return (
    <section
      id="process"
      className="ch-section relative"
    >
      <FloatIcon icon={Compass} float="rotate" size={24} className="pointer-events-none absolute left-[6%] top-[12%] hidden text-accent/20 lg:block" />
      <div ref={ref} className="ch-container">
        <p data-reveal className="max-w-md text-lg leading-relaxed text-muted">
          {process.eyebrow}
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-4 md:gap-8">
          {process.steps.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={i} data-reveal className="group relative pl-6 md:pl-0">
                {/* vertical accent line (mobile) */}
                <span className="absolute left-0 top-0 h-full w-px bg-white/[0.06] transition-colors duration-500 group-hover:bg-accent/40 md:hidden" />

                {/* top accent line (desktop) */}
                <span className="hidden md:block h-px w-full bg-white/[0.06] mb-8 transition-colors duration-500 group-hover:bg-accent/30" />

                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-accent/70 transition-all duration-500 group-hover:scale-110 group-hover:text-accent"
                  />
                  <span className="font-display text-sm text-muted/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-medium text-text md:text-2xl">
                  {s.name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
