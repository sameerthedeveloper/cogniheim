import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";

export function Capabilities() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { capabilities } = content;

  return (
    <section
      id="capabilities"
      className="flex min-h-screen flex-col justify-center border-t border-line py-24"
    >
      <div ref={ref} className="ch-container">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          {capabilities.eyebrow}
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-ch-lg border border-line bg-line md:grid-cols-2">
          {capabilities.items.map((item, i) => (
            <div
              key={i}
              data-reveal
              className="group relative bg-surface p-9 transition-colors duration-300 hover:bg-surface-2 md:p-12"
            >
              <span className="font-display text-sm text-muted/60">
                {String(i + 1).padStart(2, "0")}
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
