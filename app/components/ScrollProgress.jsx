'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// A 2px accent line under the nav that fills left-to-right with scroll
// position — a quiet, functional "how far through the page" cue.
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bar = barRef.current;
    if (!bar || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: 0.3,
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      className="fixed inset-x-4 top-20 z-40 h-[2px] overflow-hidden rounded-full bg-transparent sm:inset-x-10 sm:top-[5.5rem]"
      aria-hidden="true"
    >
      <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
    </div>
  );
}
