import { useReveal } from "../lib/useReveal";

export function Intro() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative border-t border-line py-28 md:py-40">
      <div ref={ref} className="ch-container">
        <h2
          data-reveal
          className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3.1rem)] font-medium leading-[1.15] text-text"
        >
          Good software starts with{" "}
          <span className="text-accent">good thinking.</span>
        </h2>
        <p
          data-reveal
          className="mt-8 max-w-2xl text-[17px] leading-relaxed text-muted md:text-lg"
        >
          Cogniheim is a technology and product studio built around a simple
          belief: the best digital products begin with understanding the
          problem before writing the code.
        </p>
        <p
          data-reveal
          className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted md:text-lg"
        >
          We combine product thinking, interface design, and engineering to
          create useful software for businesses and people.
        </p>
      </div>
    </section>
  );
}
