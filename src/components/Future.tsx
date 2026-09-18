import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";
import { Rocket } from "lucide-react";
import { FloatIcon } from "./FloatIcon";

export function Future() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { future } = content;

  return (
    <section className="ch-section relative">
      <FloatIcon icon={Rocket} float="drift" size={24} className="pointer-events-none absolute right-[8%] top-[16%] hidden text-accent/20 lg:block" />
      <div
        ref={ref}
        className="ch-container grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16 items-center"
      >
        <div data-reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-accent/60">{future.eyebrow}</p>
          <h2 className="font-display mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium leading-[1.15] text-text">
            {future.heading}
          </h2>
        </div>
        <p data-reveal className="max-w-xl self-center text-[17px] leading-relaxed text-muted md:text-lg">
          {future.body}
        </p>
      </div>
    </section>
  );
}
