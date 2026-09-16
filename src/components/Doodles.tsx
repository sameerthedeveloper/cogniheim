import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type DoodleProps = { className?: string; delay?: number };

/** Draws the doodle's stroke in on scroll, then floats it gently forever. */
function useDoodle(float: "rotate" | "bob" | "drift", delay = 0) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const paths = svg.querySelectorAll<SVGPathElement | SVGCircleElement>("path, circle");

    paths.forEach((p) => {
      const length = "getTotalLength" in p ? (p as SVGPathElement).getTotalLength() : 200;
      gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: svg, start: "top 90%" },
      delay,
    });
    tl.to(paths, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out", stagger: 0.15 });

    let floatTween: gsap.core.Tween;
    if (float === "rotate") {
      floatTween = gsap.to(svg, { rotation: 360, duration: 40, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
    } else if (float === "bob") {
      floatTween = gsap.to(svg, { y: -14, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    } else {
      floatTween = gsap.to(svg, { x: 10, y: -10, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      floatTween.kill();
    };
  }, [float, delay]);

  return ref;
}

export function SquiggleDoodle({ className, delay }: DoodleProps) {
  const ref = useDoodle("drift", delay);
  return (
    <svg
      ref={ref}
      className={className}
      width="120"
      height="60"
      viewBox="0 0 120 60"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 30C14 8 24 8 34 30C44 52 54 52 64 30C74 8 84 8 94 30C100 42 106 42 116 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RingDoodle({ className, delay }: DoodleProps) {
  const ref = useDoodle("rotate", delay);
  return (
    <svg
      ref={ref}
      className={className}
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="45"
        cy="45"
        r="36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="6 8"
      />
      <circle cx="45" cy="9" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PlusDoodle({ className, delay }: DoodleProps) {
  const ref = useDoodle("bob", delay);
  return (
    <svg
      ref={ref}
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path d="M20 4V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 20H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function StarDoodle({ className, delay }: DoodleProps) {
  const ref = useDoodle("rotate", delay);
  return (
    <svg
      ref={ref}
      className={className}
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M27 2C27 16 30 24 38 27C30 30 27 38 27 52C27 38 24 30 16 27C24 24 27 16 27 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArcDoodle({ className, delay }: DoodleProps) {
  const ref = useDoodle("drift", delay);
  return (
    <svg
      ref={ref}
      className={className}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 70C6 35 35 6 70 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
