import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type FloatIconProps = {
  icon: LucideIcon;
  className?: string;
  size?: number;
  float?: "rotate" | "bob" | "drift";
  delay?: number;
  strokeWidth?: number;
};

/** A decorative icon that fades/scales in on scroll, then floats forever. */
export function FloatIcon({
  icon: Icon,
  className,
  size = 28,
  float = "bob",
  delay = 0,
  strokeWidth = 1.5,
}: FloatIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { autoAlpha: 1, scale: 1 });
      return;
    }

    gsap.set(el, { autoAlpha: 0, scale: 0.6 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%" },
      delay,
    });
    tl.to(el, { autoAlpha: 1, scale: 1, duration: 0.9, ease: "back.out(1.8)" });

    let floatTween: gsap.core.Tween;
    if (float === "rotate") {
      floatTween = gsap.to(el, { rotation: 360, duration: 36, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
    } else if (float === "bob") {
      floatTween = gsap.to(el, { y: -12, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    } else {
      floatTween = gsap.to(el, { x: 8, y: -8, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      floatTween.kill();
    };
  }, [float, delay]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <Icon size={size} strokeWidth={strokeWidth} />
    </div>
  );
}
