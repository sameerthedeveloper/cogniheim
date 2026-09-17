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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-t border-line py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, color-mix(in oklab, var(--ch-accent) 8%, transparent), transparent 70%)",
        }}
      />
      <FloatIcon icon={BrainCircuit} float="bob" size={32} className="pointer-events-none absolute left-[12%] top-[20%] hidden text-accent/40 lg:block" />
      <FloatIcon icon={InfinityIcon} float="rotate" delay={0.4} size={28} className="pointer-events-none absolute bottom-[15%] right-[10%] hidden text-muted/40 lg:block" />
      <div ref={ref} className="ch-container relative text-center">
        <h2
          data-reveal
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
