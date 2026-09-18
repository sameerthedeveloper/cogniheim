import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";
import { BrainCircuit, Infinity as InfinityIcon } from "lucide-react";
import { FloatIcon } from "./FloatIcon";

export function Philosophy() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { philosophy } = content;

  return (
    <section
      id="philosophy"
      className="ch-section relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in oklab, var(--ch-accent) 5%, transparent), transparent 70%)",
        }}
      />
      <FloatIcon icon={BrainCircuit} float="bob" size={26} className="pointer-events-none absolute left-[12%] top-[20%] hidden text-accent/25 lg:block" />
      <FloatIcon icon={InfinityIcon} float="rotate" delay={0.4} size={24} className="pointer-events-none absolute bottom-[15%] right-[10%] hidden text-muted/25 lg:block" />
      <div ref={ref} className="ch-container relative text-center">
        <h2
          data-reveal="words"
          className="font-display mx-auto max-w-3xl whitespace-pre-line text-[clamp(1.8rem,4.5vw,3.4rem)] font-medium leading-[1.15] text-text"
        >
          {philosophy.heading}
        </h2>
        <p
          data-reveal
          className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-muted"
        >
          {philosophy.body}
        </p>
      </div>
    </section>
  );
}
