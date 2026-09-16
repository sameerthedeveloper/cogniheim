import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";

export function SelectedWork() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { work } = content;

  return (
    <section
      id="work"
      className="flex min-h-screen flex-col justify-center border-t border-line py-24"
    >
      <div ref={ref} className="ch-container">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          {work.eyebrow}
        </p>

        <a
          href="#contact"
          data-reveal
          data-cursor="view"
          className="group mt-14 grid overflow-hidden rounded-ch-lg border border-line bg-surface transition-colors hover:bg-surface-2 md:grid-cols-2"
        >
          <div
            className="relative aspect-[4/3] overflow-hidden md:aspect-auto"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--ch-accent) 35%, transparent), var(--ch-surface-2) 60%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-6xl font-medium text-text/10 md:text-8xl">
                {work.initials}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center p-9 md:p-14">
            <h3 className="font-display text-3xl font-medium text-text md:text-4xl">
              {work.title}
            </h3>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
              {work.desc}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-accent">
              {work.cta}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
