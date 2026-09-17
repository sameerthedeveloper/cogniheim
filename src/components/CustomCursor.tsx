import { useEffect, useRef } from "react";
import gsap from "gsap";

const IDLE_W = 8;
const IDLE_H = 8;
const IDLE_RADIUS = 50; // pill / capsule
const PAD = 12;
const LOCK_TRAVEL = 8;

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

    let locked = false;
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
      if (locked) return;
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

      const radiusFor = (r: DOMRect) => {
        const cs = getComputedStyle(el);
        const parsed = parseFloat(cs.borderRadius);
        return Number.isFinite(parsed) && parsed >= Math.min(r.width, r.height) / 2 - 1
          ? 999
          : (parsed || 0) + PAD * 0.5;
      };

      const settle = (e?: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const elCx = r.left + r.width / 2;
        const elCy = r.top + r.height / 2;
        let ox = 0;
        let oy = 0;
        if (e) {
          ox = gsap.utils.clamp(-LOCK_TRAVEL, LOCK_TRAVEL, (e.clientX - elCx) * 0.2);
          oy = gsap.utils.clamp(-LOCK_TRAVEL, LOCK_TRAVEL, (e.clientY - elCy) * 0.2);
        }
        gsap.to(capsule, {
          x: elCx + ox,
          y: elCy + oy,
          width: r.width + PAD,
          height: r.height + PAD,
          borderRadius: radiusFor(r),
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const onEnter = (e: MouseEvent) => {
        if (isNav) {
          // ── NAV: iPadOS overlay — frosted fill wraps the element ──
          locked = true;
          gsap.to(capsule, {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            webkitBackdropFilter: "blur(12px)",
            borderColor: "rgba(255, 255, 255, 0.10)",
            duration: 0.35,
            ease: "power2.out",
          });
          settle(e);
        } else {
          // ── OTHER: cursor stays free, just scales up + glows ──
          gsap.to(capsule, {
            width: 40,
            height: 40,
            borderRadius: 999,
            backgroundColor: "rgba(57, 185, 176, 0.08)",
            borderColor: "rgba(57, 185, 176, 0.25)",
            duration: 0.35,
            ease: "power3.out",
          });
        }
      };

      const onMoveTarget = (e: MouseEvent) => {
        if (isNav) settle(e);
      };

      const onLeave = () => {
        if (isNav) locked = false;
        // reset to idle capsule
        gsap.to(capsule, {
          x: lastX,
          y: lastY,
          width: IDLE_W,
          height: IDLE_H,
          borderRadius: IDLE_RADIUS,
          backgroundColor: "rgba(245, 245, 242, 0.9)",
          backdropFilter: "none",
          webkitBackdropFilter: "none",
          borderColor: "transparent",
          duration: 0.4,
          ease: "power3.out",
        });
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
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
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
