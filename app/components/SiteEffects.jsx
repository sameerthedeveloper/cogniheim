'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { animateHeroIntro } from '../animations/hero.js';
import { initScrollReveals } from '../animations/reveal.js';
import { animateSectionHeadings } from '../animations/sectionHeadings.js';
import { initMagneticHover } from '../animations/magneticHover.js';
import { initJourneyProgress } from '../animations/journeyProgress.js';

// Scroll choreography: a word-by-word hero intro, cascading section
// reveals, scroll-triggered word reveals on section headings and the
// process rail fill — all riding on Lenis smooth scroll.
export default function SiteEffects() {
  // Re-run on every route change: the layout persists across client-side
  // navigation, so each new page needs its own reveals and triggers.
  const pathname = usePathname();

  useEffect(() => {
    // The /flute motion-capture studio renders the page inside a 3D stage;
    // scroll choreography and smooth scroll would fight it.
    if (window.location.pathname.startsWith('/flute')) return;

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lenis;
    let tick;
    if (!reducedMotion) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    animateHeroIntro(reducedMotion);
    initScrollReveals(reducedMotion);
    animateSectionHeadings(reducedMotion);
    initMagneticHover(reducedMotion);
    initJourneyProgress(reducedMotion);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}
