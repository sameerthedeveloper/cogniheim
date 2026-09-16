import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Apple/iPadOS-style pointer: a small dot that snaps to exact position,
 * and a soft ring that trails with elastic lag. Elements with
 * [data-cursor="view"|"drag"] swell the ring and show a label inside it;
 * [data-magnetic] pulls slightly toward the pointer while hovered.
 * Disabled entirely on touch/coarse pointers.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    ring.style.mixBlendMode = "exclusion";
    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "elastic.out(1, 0.65)" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "elastic.out(1, 0.65)" });

    let visible = false;
    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 });
    };

    const onMove = (e: MouseEvent) => {
      show();
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeaveWindow);

    // magnetic pull for [data-magnetic] elements
    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const magnetHandlers = magnets.map((el) => {
      const strength = Number(el.dataset.magneticStrength ?? 0.35);
      const onMoveMagnet = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.4, ease: "power3.out" });
      };
      const onLeaveMagnet = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      };
      el.addEventListener("mousemove", onMoveMagnet);
      el.addEventListener("mouseleave", onLeaveMagnet);
      return { el, onMoveMagnet, onLeaveMagnet };
    });

    // ring swell + label for [data-cursor]
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor]"));
    const cursorHandlers = targets.map((el) => {
      const onEnter = () => {
        const label = el.dataset.cursor ?? "";
        if (labelRef.current) labelRef.current.textContent = label === "drag" ? "Drag" : label === "view" ? "View" : label;
        ring.style.mixBlendMode = "normal";
        gsap.to(ring, {
          width: 88,
          height: 88,
          backgroundColor: "var(--ch-accent)",
          borderColor: "transparent",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 0, duration: 0.2 });
        gsap.to(labelRef.current, { autoAlpha: 1, duration: 0.2, delay: 0.1 });
      };
      const onLeave = () => {
        ring.style.mixBlendMode = "exclusion";
        gsap.to(ring, {
          width: 36,
          height: 36,
          backgroundColor: "transparent",
          borderColor: "var(--ch-accent)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
        gsap.to(labelRef.current, { autoAlpha: 0, duration: 0.15 });
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return { el, onEnter, onLeave };
    });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeaveWindow);
      magnetHandlers.forEach(({ el, onMoveMagnet, onLeaveMagnet }) => {
        el.removeEventListener("mousemove", onMoveMagnet);
        el.removeEventListener("mouseleave", onLeaveMagnet);
      });
      cursorHandlers.forEach(({ el, onEnter, onLeave }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent opacity-0"
        aria-hidden="true"
      >
        <span
          ref={labelRef}
          className="pointer-events-none whitespace-nowrap text-[11px] font-medium uppercase tracking-wide text-[#04140f] opacity-0"
        />
      </div>
    </>
  );
}
