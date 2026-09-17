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
      className="relative flex min-h-screen flex-col justify-center border-t border-line py-24"
    >
      <FloatIcon icon={Compass} float="rotate" size={30} className="pointer-events-none absolute left-[6%] top-[12%] hidden text-accent/30 lg:block" />
      <div ref={ref} className="ch-container">
        <p data-reveal className="max-w-md text-lg leading-relaxed text-muted">
          {process.eyebrow}
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {process.steps.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={i} data-reveal className="group relative pl-6">
                <span className="absolute left-0 top-1 h-full w-px bg-line transition-colors duration-300 group-hover:bg-accent md:hidden" />
                <div className="flex items-center gap-3">
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  />
                  <span className="font-display text-sm text-muted/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl font-medium text-text md:text-2xl">
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
