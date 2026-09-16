import { useEffect, useRef } from "react";
import gsap from "gsap";

const IDLE_SIZE = 20;
const PAD = 10; // how far the shape grows past the element's own edges
const LOCK_TRAVEL = 10; // max px the shape can drift toward the pointer while locked

/**
 * True iPadOS-style pointer: a small dot/circle that roams freely, and
 * "shrink-wraps" into the exact size, position, and corner radius of
 * whatever [data-cursor] element it lands on — a pill over a pill button,
 * a rounded square over a card — rather than swelling into a fixed blob.
 * Disabled entirely on touch/coarse pointers.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current!;
    const shape = shapeRef.current!;
    document.documentElement.classList.add("has-custom-cursor");

    const shapeX = gsap.quickTo(shape, "x", { duration: 0.35, ease: "power3.out" });
    const shapeY = gsap.quickTo(shape, "y", { duration: 0.35, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    let locked = false;
    let visible = false;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to([dot, shape], { autoAlpha: 1, duration: 0.25 });
    };

    const onMove = (e: MouseEvent) => {
      show();
      lastX = e.clientX;
      lastY = e.clientY;
      if (locked) return;
      dotX(lastX);
      dotY(lastY);
      shapeX(lastX);
      shapeY(lastY);
    };
    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dot, shape], { autoAlpha: 0, duration: 0.2 });
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

    // shrink-wrap lock for [data-cursor] elements
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor]"));
    const cursorHandlers = targets.map((el) => {
      const radiusFor = (r: DOMRect) => {
        const cs = getComputedStyle(el);
        const parsed = parseFloat(cs.borderRadius);
        // a "pill" (rounded-full) button: keep it a pill at the new size too
        return Number.isFinite(parsed) && parsed >= Math.min(r.width, r.height) / 2 - 1
          ? 999
          : (parsed || 0) + PAD * 0.4;
      };

      const settle = (e?: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        let ox = 0;
        let oy = 0;
        if (e) {
          ox = gsap.utils.clamp(-LOCK_TRAVEL, LOCK_TRAVEL, (e.clientX - cx) * 0.25);
          oy = gsap.utils.clamp(-LOCK_TRAVEL, LOCK_TRAVEL, (e.clientY - cy) * 0.25);
        }
        gsap.to(shape, {
          x: cx + ox,
          y: cy + oy,
          width: r.width + PAD,
          height: r.height + PAD,
          borderRadius: radiusFor(r),
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const onEnter = (e: MouseEvent) => {
        locked = true;
        gsap.to(shape, {
          backgroundColor: "color-mix(in oklab, var(--ch-text) 14%, transparent)",
          borderColor: "transparent",
          duration: 0.3,
        });
        gsap.to(dot, { scale: 0, duration: 0.15 });
        settle(e);
      };
      const onMoveTarget = (e: MouseEvent) => settle(e);
      const onLeave = () => {
        locked = false;
        gsap.to(shape, {
          x: lastX,
          y: lastY,
          width: IDLE_SIZE,
          height: IDLE_SIZE,
          borderRadius: 999,
          backgroundColor: "transparent",
          borderColor: "var(--ch-accent)",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMoveTarget);
      el.addEventListener("mouseleave", onLeave);
      return { el, onEnter, onMoveTarget, onLeave };
    });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeaveWindow);
      magnetHandlers.forEach(({ el, onMoveMagnet, onLeaveMagnet }) => {
        el.removeEventListener("mousemove", onMoveMagnet);
        el.removeEventListener("mouseleave", onLeaveMagnet);
      });
      cursorHandlers.forEach(({ el, onEnter, onMoveTarget, onLeave }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mousemove", onMoveTarget);
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
        ref={shapeRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent opacity-0"
        style={{ width: IDLE_SIZE, height: IDLE_SIZE }}
        aria-hidden="true"
      />
    </>
  );
}
