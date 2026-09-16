import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";

export function Future() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { future } = content;

  return (
    <section className="flex min-h-screen flex-col justify-center border-t border-line py-24">
      <div
        ref={ref}
        className="ch-container grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16"
      >
        <div data-reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
            {future.eyebrow}
          </p>
          <h2 className="font-display mt-6 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium leading-[1.15] text-text">
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
