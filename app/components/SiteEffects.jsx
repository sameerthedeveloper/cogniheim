'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { createIcons, Activity, ExternalLink, Mail, ArrowDown, LayoutTemplate, WifiOff, Accessibility, FileText } from 'lucide';

import { animateHero, animateHeroImage } from '../animations/hero.js';
import { initNav } from '../animations/nav.js';
import { animateAbout } from '../animations/about.js';
import { animateWork } from '../animations/work.js';
import { animateTimeline } from '../animations/timeline.js';
import { animateServices } from '../animations/services.js';
import { initCursor } from '../animations/cursor.js';

// Bootstraps the exact same vanilla GSAP/Lenis setup as the original
// src/main.js, run once on mount. Guarded so React StrictMode's
// double-invoke in dev doesn't double-init (reactStrictMode is also off
// in next.config.mjs, but this guard keeps it safe either way).
export default function SiteEffects() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    createIcons({
      icons: { Activity, ExternalLink, Mail, ArrowDown, LayoutTemplate, WifiOff, Accessibility, FileText },
    });

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion) {
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    animateHero(reducedMotion);
    animateHeroImage(reducedMotion);
    initNav(reducedMotion);
    animateAbout(reducedMotion);
    animateWork(reducedMotion);
    animateTimeline(reducedMotion);
    animateServices(reducedMotion);
    initCursor(reducedMotion);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    window.addEventListener('load', () => ScrollTrigger.refresh());

    // If the viewport is resized after the initial triggers were measured
    // (e.g. narrowing the window or toggling devtools device mode after
    // load), re-measure everything so trigger positions match the new
    // layout instead of staying pinned to stale desktop-width numbers.
    // work.js/services.js already rebuild their own triggers on resize;
    // this covers the rest (timeline.js included) with one global refresh.
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener('resize', handleResize);
  }, []);

  return null;
}
