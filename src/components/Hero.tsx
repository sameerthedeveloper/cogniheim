import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useContent } from "../content/ContentContext";
import { Sparkles, CircleDot, Waves, ArrowRight } from "lucide-react";
import { FloatIcon } from "./FloatIcon";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const { content } = useContent();
  const { hero } = content;

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Reset to a known baseline first: StrictMode mounts this effect twice,
    // and a relative .from() would otherwise capture whatever half-animated
    // inline style the first (killed) run left behind as its target value.
    gsap.set(el, { clearProps: "opacity,visibility" });
    gsap.set(".hero-eyebrow, .hero-word, .hero-sub, .hero-cta, .hero-glow", {
      clearProps: "all",
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set(el, { autoAlpha: 1 })
      .fromTo(
        ".hero-eyebrow",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        0.15,
      )
      .fromTo(
        ".hero-word",
        { autoAlpha: 0, y: 46 },
        { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.09 },
        0.3,
      )
      .fromTo(
        ".hero-sub",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        0.85,
      )
      .fromTo(
        ".hero-cta",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
        1.0,
      )
      .fromTo(".hero-glow", { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0.1);

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
        className="hero-glow pointer-events-none absolute left-1/2 top-[10%] h-[620px] w-[620px] -translate-x-1/2 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--ch-accent) 32%, transparent) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 30%, black 0%, transparent 75%)",
        }}
      />

      <FloatIcon icon={CircleDot} float="rotate" size={34} className="pointer-events-none absolute right-[8%] top-[18%] hidden text-accent/40 lg:block" />
      <FloatIcon icon={Sparkles} float="bob" delay={0.3} size={26} className="pointer-events-none absolute right-[18%] top-[58%] hidden text-muted/40 lg:block" />
      <FloatIcon icon={Waves} float="drift" delay={0.6} size={30} className="pointer-events-none absolute bottom-[10%] left-[6%] hidden text-muted/25 lg:block" />

      <div className="ch-container relative z-10">
        <p className="hero-eyebrow mb-6 text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          {hero.eyebrow}
        </p>

        <h1 className="font-display max-w-4xl text-[clamp(2.6rem,7.5vw,5.5rem)] font-medium leading-[1.02] tracking-tight text-text">
          {words.map((w, i) => (
            <span key={i} className="hero-word mr-3 inline-block">
              {w}
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-8 max-w-lg text-lg leading-relaxed text-muted">
          {hero.sub}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            data-magnetic
            data-cursor="view"
            className="hero-cta rounded-full bg-accent px-7 py-3.5 text-[14px] font-medium text-[#04140f] transition-transform"
          >
            {hero.ctaPrimary}
          </a>
          <a
            href="#work"
            data-magnetic
            data-cursor="view"
            className="hero-cta group inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-[14px] font-medium text-text transition-colors hover:border-accent/50"
          >
            {hero.ctaSecondary}
            <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div className="ch-container relative z-10 mt-16 flex items-center gap-3 text-[12px] tracking-wide text-muted/70">
        <span className="h-px w-10 bg-line" />
        {hero.tag}
      </div>
    </section>
  );
}
