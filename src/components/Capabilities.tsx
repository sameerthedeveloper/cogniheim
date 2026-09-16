import { useReveal } from "../lib/useReveal";

const ITEMS = [
  {
    n: "01",
    title: "Digital Products",
    desc: "Websites, web applications, internal tools, and customer-facing platforms designed around real user needs.",
  },
  {
    n: "02",
    title: "Product Design",
    desc: "Clear information architecture, refined interfaces, responsive systems, and interaction design.",
  },
  {
    n: "03",
    title: "Software Engineering",
    desc: "Modern frontend and backend systems built for maintainability, performance, security, and growth.",
  },
  {
    n: "04",
    title: "SaaS Development",
    desc: "From first prototype to production-ready software, we help turn validated ideas into products.",
  },
];

export function Capabilities() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="capabilities" className="border-t border-line py-28 md:py-40">
      <div ref={ref} className="ch-container">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          Capabilities
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-ch-lg border border-line bg-line md:grid-cols-2">
          {ITEMS.map((item) => (
            <div
              key={item.n}
              data-reveal
              className="group relative bg-surface p-9 transition-colors duration-300 hover:bg-surface-2 md:p-12"
            >
              <span className="font-display text-sm text-muted/60">
                {item.n}
              </span>
              <h3 className="font-display mt-6 text-2xl font-medium text-text md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
                {item.desc}
              </p>
              <span className="absolute right-9 top-9 h-2 w-2 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:right-12 md:top-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
