import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useContent } from "../content/ContentContext";
import { Sparkles, CircleDot, Waves, ArrowRight } from "lucide-react";
import { FloatIcon } from "./FloatIcon";
import { useParallax } from "../lib/useParallax";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const { content } = useContent();
  const { hero } = content;
  const gridRef = useParallax<HTMLDivElement>(0.06);
  const glowRef = useParallax<HTMLDivElement>(0.04);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    gsap.set(el, { clearProps: "opacity,visibility" });
    gsap.set(".hero-eyebrow, .hero-word, .hero-sub, .hero-cta, .hero-glow, .hero-edge, .hero-tag", {
      clearProps: "all",
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { autoAlpha: 1 });
      gsap.set(".hero-eyebrow, .hero-word, .hero-sub, .hero-cta, .hero-glow, .hero-edge, .hero-tag", {
        autoAlpha: 1,
        x: 0,
        y: 0,
        opacity: 1,
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set(el, { autoAlpha: 1 })
      .fromTo(
        ".hero-glow",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
        0,
      )
      .fromTo(
        ".hero-eyebrow",
        { autoAlpha: 0, y: 12, filter: "blur(4px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        0.3,
      )
      .fromTo(
        ".hero-word",
        { autoAlpha: 0, y: 60, rotateX: 20 },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.1, stagger: 0.07 },
        0.5,
      )
      .fromTo(
        ".hero-sub",
        { autoAlpha: 0, y: 20, filter: "blur(4px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
        1.0,
      )
      .fromTo(
        ".hero-cta",
        { autoAlpha: 0, y: 16, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1 },
        1.2,
      )
      .fromTo(
        ".hero-tag",
        { autoAlpha: 0, x: -16 },
        { autoAlpha: 1, x: 0, duration: 0.8 },
        1.5,
      );

    return () => {
      tl.kill();
    };
  }, [hero.headline]);

  const words = hero.headline.split(" ");

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-[76px] invisible"
    >
      <div
        ref={glowRef}
        className="hero-glow pointer-events-none absolute left-1/2 top-[8%] h-[560px] w-[560px] -translate-x-1/2 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--ch-accent) 25%, transparent) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 55% 45% at 50% 30%, black 0%, transparent 70%)",
        }}
      />

      <FloatIcon icon={CircleDot} float="rotate" size={28} className="pointer-events-none absolute right-[8%] top-[18%] hidden text-accent/25 lg:block" />
      <FloatIcon icon={Sparkles} float="bob" delay={0.3} size={22} className="pointer-events-none absolute right-[18%] top-[58%] hidden text-muted/25 lg:block" />
      <FloatIcon icon={Waves} float="drift" delay={0.6} size={26} className="pointer-events-none absolute bottom-[10%] left-[6%] hidden text-muted/15 lg:block" />

      <div className="ch-container relative z-10">
        <p className="hero-eyebrow mb-7 text-[12px] font-medium uppercase tracking-[0.35em] text-accent/80">
          {hero.eyebrow}
        </p>

        <h1 className="font-display max-w-4xl text-[clamp(2.6rem,7.5vw,5.5rem)] font-medium leading-[1.02] tracking-tight text-text" style={{ perspective: "800px" }}>
          <span aria-hidden="true">
            {words.map((w, i) => (
              <span key={i} className="hero-word mr-3 inline-block" style={{ transformOrigin: "left bottom" }}>
                {w}
              </span>
            ))}
          </span>
          <span className="sr-only">{hero.headline}</span>
        </h1>

        <p className="hero-sub mt-8 max-w-lg text-lg leading-relaxed text-muted">
          {hero.sub}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            data-magnetic
            data-cursor="interact"
            className="hero-cta ch-btn-glow rounded-full bg-accent px-8 py-3.5 text-[14px] font-medium text-[#04140f]"
          >
            {hero.ctaPrimary}
          </a>
          <a
            href="#work"
            data-magnetic
            data-cursor="interact"
            className="hero-cta ch-btn-outline-glow group inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-8 py-3.5 text-[14px] font-medium text-text"
          >
            {hero.ctaSecondary}
            <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div className="hero-tag ch-container relative z-10 mt-20 flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-muted/50">
        <span className="h-px w-10 bg-white/[0.08]" />
        {hero.tag}
      </div>
    </section>
  );
}
