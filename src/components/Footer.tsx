import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "../content/ContentContext";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const { content } = useContent();
  const { brand, footer } = content;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
        },
      },
    );
  }, []);

  return (
    <footer ref={ref} className="relative py-16 opacity-0">
      {/* subtle separator line */}
      <div className="ch-container mb-10">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>

      <div className="ch-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2.5">
            <img
            src="/logo.png"
            alt="Cogniheim"
            className="h-12 w-auto object-contain"
          />
          </div>
          <p className="mt-3 text-sm text-muted/60">{brand.tagline}</p>
          <p className="mt-1 text-sm text-muted/40">{brand.category}</p>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-sm text-muted/40">{footer.copyright}</p>
          <a
            href="/admin"
            className="text-xs text-muted/30 underline-offset-2 transition-colors duration-300 hover:text-muted/60 hover:underline"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
