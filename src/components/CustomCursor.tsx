import { useEffect, useRef } from "react";
import gsap from "gsap";

const IDLE_W = 8;
const IDLE_H = 8;
const IDLE_RADIUS = 50; // pill / capsule

/**
 * iPadOS-style cursor: a small rounded-rectangle capsule that morphs into a
 * frosted-glass overlay **only** when hovering [data-cursor="nav"] elements
 * (navigation links). All other [data-cursor] elements (buttons, cards, etc.)
 * trigger a subtle cursor scale-up + glow — no overlay covers them.
 *
 * Disabled on touch / coarse-pointer devices.
 */
export function CustomCursor() {
  const capsuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const capsule = capsuleRef.current!;
    document.documentElement.classList.add("has-custom-cursor");

    const cx = gsap.quickTo(capsule, "x", { duration: 0.18, ease: "power3.out" });
    const cy = gsap.quickTo(capsule, "y", { duration: 0.18, ease: "power3.out" });

    let visible = false;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(capsule, { autoAlpha: 1, duration: 0.25 });
    };

    const onMove = (e: MouseEvent) => {
      show();
      lastX = e.clientX;
      lastY = e.clientY;
      cx(lastX);
      cy(lastY);
    };

    const onLeaveWindow = () => {
      visible = false;
      gsap.to(capsule, { autoAlpha: 0, duration: 0.2 });
    };

    const onDown = () => {
      gsap.to(capsule, { scale: 0.85, duration: 0.12, ease: "power2.out" });
    };

    const onUp = () => {
      gsap.to(capsule, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeaveWindow);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // ── magnetic pull for [data-magnetic] ──
    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const magnetHandlers = magnets.map((el) => {
      const strength = Number(el.dataset.magneticStrength ?? 0.3);
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

    // ── cursor interactions ──
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor]"));
    const cursorHandlers = targets.map((el) => {
      const kind = el.dataset.cursor; // "nav" | "interact" | "view" etc.
      const isNav = kind === "nav";

      const onEnter = () => {
        if (isNav) {
          gsap.to(capsule, { autoAlpha: 0, scale: 0.5, duration: 0.2, ease: "power2.out" });
        } else {
          // ── OTHER: cursor stays free, just scales up + glows ──
          gsap.to(capsule, {
            autoAlpha: 1,
            width: 36,
            height: 36,
            borderRadius: 999,
            backgroundColor: "rgba(57, 185, 176, 0.08)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(57, 185, 176, 0.25)",
            backdropFilter: "none",
            webkitBackdropFilter: "none",
            boxShadow: "none",
            duration: 0.3,
            ease: "power3.out",
          });
        }
      };

      const onLeave = () => {
        // reset to idle capsule dot
        gsap.to(capsule, {
          autoAlpha: 1,
          scale: 1,
          x: lastX,
          y: lastY,
          width: IDLE_W,
          height: IDLE_H,
          borderRadius: IDLE_RADIUS,
          backgroundColor: "rgba(245, 245, 242, 0.9)",
          backdropFilter: "none",
          webkitBackdropFilter: "none",
          borderWidth: "0px",
          borderColor: "transparent",
          boxShadow: "none",
          duration: 0.3,
          ease: "power3.out",
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return { el, onEnter, onLeave };
    });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
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
    <div
      ref={capsuleRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 opacity-0"
      style={{
        width: IDLE_W,
        height: IDLE_H,
        borderRadius: IDLE_RADIUS,
        backgroundColor: "rgba(245, 245, 242, 0.9)",
        border: "none",
        transition: "none",
      }}
      aria-hidden="true"
    />
  );
}
