import { useReveal } from "../lib/useReveal";

export function Philosophy() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="philosophy" className="relative overflow-hidden border-t border-line py-28 md:py-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, color-mix(in oklab, var(--ch-accent) 8%, transparent), transparent 70%)",
        }}
      />
      <div ref={ref} className="ch-container relative text-center">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          Philosophy
        </p>
        <h2
          data-reveal
          className="font-display mx-auto mt-8 max-w-3xl text-[clamp(1.8rem,4.5vw,3.4rem)] font-medium leading-[1.15] text-text"
        >
          Technology is the medium.
          <br />
          Thinking is the foundation.
        </h2>
        <p
          data-reveal
          className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-muted"
        >
          We don't build for the sake of building. We look for the clearest
          way to turn an idea into something useful.
        </p>
      </div>
    </section>
  );
}
