import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";

export function Intro() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { intro } = content;

  return (
    <section className="relative flex min-h-screen flex-col justify-center border-t border-line py-24">
      <div ref={ref} className="ch-container">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          {intro.eyebrow}
        </p>
        <h2
          data-reveal
          className="font-display mt-8 max-w-3xl text-[clamp(1.8rem,4vw,3.1rem)] font-medium leading-[1.15] text-text"
        >
          {intro.heading}
        </h2>
        <p
          data-reveal
          className="mt-8 max-w-2xl text-[17px] leading-relaxed text-muted md:text-lg"
        >
          {intro.body1}
        </p>
        <p
          data-reveal
          className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted md:text-lg"
        >
          {intro.body2}
        </p>
      </div>
    </section>
  );
}
