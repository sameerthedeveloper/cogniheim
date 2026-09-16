import { Monitor, PenTool, Code2, Rocket, LayoutGrid } from "lucide-react";
import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";
import { FloatIcon } from "./FloatIcon";

const ICONS = [Monitor, PenTool, Code2, Rocket];

export function Capabilities() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { capabilities } = content;

  return (
    <section
      id="capabilities"
      className="relative flex min-h-screen flex-col justify-center border-t border-line py-24"
    >
      <FloatIcon icon={LayoutGrid} float="bob" size={26} className="pointer-events-none absolute right-[10%] top-[14%] hidden text-accent/40 lg:block" />
      <div ref={ref} className="ch-container">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          {capabilities.eyebrow}
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-ch-lg border border-line bg-line shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] md:grid-cols-2">
          {capabilities.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <a
                key={i}
                href="#contact"
                data-reveal
                data-cursor="view"
                className="group relative bg-surface p-9 transition-all duration-300 hover:bg-surface-2 md:p-12"
                style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-muted/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="text-accent/70 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-display mt-6 text-2xl font-medium text-text md:text-3xl">
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
