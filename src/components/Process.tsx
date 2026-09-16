import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";

export function Process() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { process } = content;

  return (
    <section
      id="process"
      className="flex min-h-screen flex-col justify-center border-t border-line py-24"
    >
      <div ref={ref} className="ch-container">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          {process.eyebrow}
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {process.steps.map((s, i) => (
            <div key={i} data-reveal className="relative pl-6">
              <span className="absolute left-0 top-1 h-full w-px bg-line md:hidden" />
              <span className="font-display block text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-xl font-medium text-text md:text-2xl">
                {s.name}
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
