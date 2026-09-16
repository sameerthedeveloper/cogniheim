import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fades/lifts every [data-reveal] child into view on scroll, staggered by [data-reveal-group]. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(root.querySelectorAll<HTMLElement>("[data-reveal]"), { autoAlpha: 1, y: 0 });
      return;
    }

    const groups = new Map<string, HTMLElement[]>();
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const key = el.dataset.revealGroup ?? el.dataset.reveal ?? "default";
      const arr = groups.get(key) ?? [];
      arr.push(el);
      groups.set(key, arr);
    });

    const triggers: ScrollTrigger[] = [];

    groups.forEach((els) => {
      gsap.set(els, { autoAlpha: 0, y: 28 });
      const tween = gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: els[0],
          start: "top 85%",
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return ref;
}
