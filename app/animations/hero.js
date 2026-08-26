import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateHero(reducedMotion) {
  const els = [
    document.querySelector('.hero-eyebrow'),
    document.querySelector('.hero-name'),
    document.querySelector('.hero-bio'),
    document.querySelector('.hero-actions'),
  ].filter(Boolean);

  if (!els.length) return;

  if (reducedMotion) {
    gsap.set(els, { opacity: 1, y: 0 });
    return;
  }

  gsap.set(els, { opacity: 0, y: 20 });

  gsap.to(els, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.2,
    stagger: 0.1,
    ease: 'power3.out',
  });
}

// The hero photo + code-snippet card fade/scale in on load — this is the
// first thing a visitor sees, so it's a simple entrance rather than a
// scroll-scrubbed reveal (there's no separate scroll distance for it
// anymore now that the photo lives inside the hero's first viewport).
export function animateHeroImage(reducedMotion) {
  const media = document.querySelector('.hero-media');
  const code = document.querySelector('.hero-code');
  if (!media) return;

  if (reducedMotion) {
    gsap.set([media, code].filter(Boolean), { opacity: 1, scale: 1, y: 0 });
    return;
  }

  gsap.set(media, { opacity: 0, scale: 1.04 });
  gsap.to(media, { opacity: 1, scale: 1, duration: 1.1, delay: 0.25, ease: 'power3.out' });

  if (code) {
    gsap.set(code, { opacity: 0, y: 12 });
    gsap.to(code, { opacity: 1, y: 0, duration: 0.7, delay: 0.9, ease: 'power2.out' });
  }
}

// Ambient depth cue as the hero scrolls out of view — the photo drifts
// slower than the page (classic parallax), the watermark glyph drifts the
// opposite way. Scrub-based so touch and wheel scrolling both track it
// exactly. Targets .hero-photo (not .hero-media) and pre-seeds yPercent on
// the watermark so its existing CSS vertical-centering transform survives
// GSAP taking over the transform property.
export function animateHeroParallax(reducedMotion) {
  const hero = document.querySelector('.hero');
  const photo = document.querySelector('.hero-photo');
  const watermark = document.querySelector('.hero-watermark');
  if (!hero || reducedMotion) return;

  if (photo) {
    gsap.to(photo, {
      y: 70,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
    });
  }

  if (watermark) {
    gsap.set(watermark, { yPercent: -50 });
    gsap.to(watermark, {
      y: -90,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
    });
  }
}
