import { useReveal } from "../lib/useReveal";

export function Future() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-line py-28 md:py-40">
      <div ref={ref} className="ch-container grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div data-reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
            Product Studio
          </p>
          <h2 className="font-display mt-6 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium leading-[1.15] text-text">
            Ideas become products.
          </h2>
        </div>
        <p data-reveal className="max-w-xl self-center text-[17px] leading-relaxed text-muted md:text-lg">
          Some of the problems we encounter deserve more than a one-off
          solution. Cogniheim explores, prototypes, and develops products of
          its own — with a long-term focus on useful software and SaaS.
        </p>
      </div>
    </section>
  );
}
