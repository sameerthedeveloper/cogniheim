'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { animateHeroIntro } from '../animations/hero.js';
import { initScrollReveals } from '../animations/reveal.js';
import { animateHeroTyped } from '../animations/typed.js';
import { initCardLift } from '../animations/cardHover.js';
import { animateWorkThumbs } from '../animations/workReveal.js';
import { initCursorLabel } from '../animations/cursorLabel.js';
import { initHeroGradientPan } from '../animations/heroGradientPan.js';
import { animateSectionHeadings } from '../animations/sectionHeadings.js';
import { initMagneticHover } from '../animations/magneticHover.js';
import { initJourneyProgress } from '../animations/journeyProgress.js';

// Apple-style scroll choreography: a word-by-word hero intro, cascading
// section reveals, tactile card-hover lift, a cinematic settle-in on work
// thumbnails, a cursor-follow label on the spotlight project, and
// scroll-triggered word reveals on section headings — all riding on
// Lenis smooth scroll so the scrub stays buttery.
export default function SiteEffects() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lenis;
    if (!reducedMotion) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    animateHeroIntro(reducedMotion);
    animateHeroTyped(reducedMotion);
    initScrollReveals(reducedMotion);
    initCardLift(reducedMotion);
    animateWorkThumbs(reducedMotion);
    initCursorLabel(reducedMotion);
    const stopGradientPan = initHeroGradientPan(reducedMotion);
    animateSectionHeadings(reducedMotion);
    initMagneticHover(reducedMotion);
    initJourneyProgress(reducedMotion);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    window.addEventListener('load', () => ScrollTrigger.refresh());

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      lenis?.destroy();
      stopGradientPan?.();
    };
  }, []);

  return null;
}
