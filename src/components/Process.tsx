import { useReveal } from "../lib/useReveal";

const STEPS = [
  { n: "Think", desc: "Understand the problem, users, constraints, and opportunity." },
  { n: "Design", desc: "Shape the experience, structure, and visual language." },
  { n: "Build", desc: "Engineer the product with clean, dependable technology." },
  { n: "Evolve", desc: "Measure, learn, refine, and keep making the product better." },
];

export function Process() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="process" className="border-t border-line py-28 md:py-40">
      <div ref={ref} className="ch-container">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          Process
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {STEPS.map((s, i) => (
            <div key={s.n} data-reveal className="relative pl-6">
              <span className="absolute left-0 top-1 h-full w-px bg-line md:hidden" />
              <span className="font-display block text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-xl font-medium text-text md:text-2xl">
                {s.n}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
