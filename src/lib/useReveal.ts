import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fades/lifts every [data-reveal] child into view on scroll, staggered by [data-reveal-group].
 *  Elements with [data-reveal="words"] get a word-by-word split-text animation. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── word-split reveals ──
    const wordEls = root.querySelectorAll<HTMLElement>('[data-reveal="words"]');
    const createdWordSpans: HTMLElement[] = [];

    wordEls.forEach((el) => {
      if (reduced) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }

      const text = el.textContent ?? "";
      const words = text.split(/\s+/).filter(Boolean);
      el.innerHTML = "";
      el.style.visibility = "visible";
      el.style.opacity = "1";

      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "inline-block overflow-hidden";
        const inner = document.createElement("span");
        inner.className = "inline-block";
        inner.textContent = word;
        inner.style.willChange = "transform, opacity";
        span.appendChild(inner);
        el.appendChild(span);
        if (i < words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
        createdWordSpans.push(inner);
      });

      const inners = el.querySelectorAll<HTMLElement>("span > span");
      gsap.set(inners, { y: "110%", opacity: 0 });

      gsap.to(inners, {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });

    // ── standard reveals ──
    if (reduced) {
      gsap.set(root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="words"])'), {
        autoAlpha: 1,
        y: 0,
      });
      return;
    }

    const groups = new Map<string, HTMLElement[]>();
    root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="words"])').forEach((el) => {
      const key = el.dataset.revealGroup ?? "default";
      const arr = groups.get(key) ?? [];
      arr.push(el);
      groups.set(key, arr);
    });

    const triggers: ScrollTrigger[] = [];

    groups.forEach((els) => {
      gsap.set(els, { autoAlpha: 0, y: 32 });
      const tween = gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
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
