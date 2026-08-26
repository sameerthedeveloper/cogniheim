import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { createIcons, Activity, ExternalLink, Mail, ArrowDown, LayoutTemplate, WifiOff, Accessibility, FileText } from 'lucide';

import './style.css';
import './sections.css';

createIcons({
  icons: { Activity, ExternalLink, Mail, ArrowDown, LayoutTemplate, WifiOff, Accessibility, FileText },
});

import { animateHero, animateHeroImage } from './animations/hero.js';
import { initNav } from './animations/nav.js';
import { animateAbout } from './animations/about.js';
import { animateWork } from './animations/work.js';
import { animateTimeline } from './animations/timeline.js';
import { animateServices } from './animations/services.js';
import { initCursor } from './animations/cursor.js';

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
