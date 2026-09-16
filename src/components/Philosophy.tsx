import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";
import { RingDoodle, StarDoodle } from "./Doodles";

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
      <StarDoodle className="pointer-events-none absolute left-[12%] top-[20%] hidden text-accent/40 lg:block" />
      <RingDoodle className="pointer-events-none absolute bottom-[15%] right-[10%] hidden text-muted/30 lg:block" delay={0.4} />
      <div ref={ref} className="ch-container relative text-center">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          {philosophy.eyebrow}
        </p>
        <h2
          data-reveal
          className="font-display mx-auto mt-8 max-w-3xl whitespace-pre-line text-[clamp(1.8rem,4.5vw,3.4rem)] font-medium leading-[1.15] text-text"
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
