import { useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";

export function SelectedWork() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { work } = content;

  // 3D tilt effect on mouse move
  const onCardMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rotateX = (y - 0.5) * -6;
    const rotateY = (x - 0.5) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  }, []);

  const onCardLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  }, []);

  return (
    <section
      id="work"
      className="ch-section relative"
    >
      <div ref={ref} className="ch-container">
        <h2 data-reveal="words" className="font-display max-w-md text-[clamp(1.9rem,4.2vw,3.2rem)] font-medium leading-[1.15] text-text">
          {work.eyebrow}
        </h2>

        <a
          href="#contact"
          data-reveal
          data-cursor="interact"
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
          className="ch-glow-border group mt-16 grid overflow-hidden rounded-ch-lg bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.4)] transition-[box-shadow] duration-500 hover:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)] md:grid-cols-2"
          style={{ transformStyle: "preserve-3d", transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <div
            className="relative aspect-[4/3] overflow-hidden md:aspect-auto"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--ch-accent) 20%, transparent), var(--ch-surface-2) 60%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
              <span className="font-display text-6xl font-medium text-text/[0.06] md:text-8xl">
                {work.initials}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center p-10 md:p-16">
            <h3 className="font-display text-3xl font-medium text-text md:text-4xl">
              {work.title}
            </h3>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
              {work.desc}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-accent">
              {work.cta}
              <ArrowUpRight size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
