import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";

export function Intro() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { intro } = content;

  return (
    <section className="ch-section relative">
      <div ref={ref} className="ch-container">
        <h2
          data-reveal="words"
          className="font-display max-w-2xl text-[clamp(1.9rem,4.2vw,3.2rem)] font-medium leading-[1.15] text-text"
        >
          {intro.heading}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-16">
          <p data-reveal className="text-[17px] leading-relaxed text-muted md:text-lg">
            {intro.body1}
          </p>
          <p data-reveal className="text-[17px] leading-relaxed text-muted md:text-lg">
            {intro.body2}
          </p>
        </div>
      </div>
    </section>
  );
}
