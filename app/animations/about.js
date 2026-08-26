import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ported from the reference repo's about.js: portrait scroll-parallax +
// floating tag chips, each with its own scrub-linked rotation/translate.
export function animateAbout(reducedMotion) {
  const about = document.querySelector('.about');
  const portrait = document.querySelector('.about-portrait');
  if (!about || reducedMotion) return;

  // Portrait parallax runs at every width now (previously desktop-only) —
  // it's a plain scroll-scrub with no layout/pin dependency, so mobile
  // handles it fine. The floating tag chips stay desktop-only since
  // .about-tags is display:none on mobile anyway (nothing to animate).
  if (portrait) {
    const distance = window.innerWidth <= 700 ? -40 : -100;
    gsap.to(portrait, {
      y: distance,
      rotation: window.innerWidth <= 700 ? 0 : -12,
      scrollTrigger: {
        trigger: about,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  if (window.innerWidth <= 1000) return;

  const tags = [
    { id: '#tag-1', y: -140, rotation: -20 },
    { id: '#tag-2', y: -90, rotation: 35 },
    { id: '#tag-3', y: -180, rotation: 60 },
    { id: '#tag-4', y: -160, rotation: -30 },
    { id: '#tag-5', y: -100, rotation: 50 },
  ];

  tags.forEach(({ id, y, rotation }) => {
    const el = document.querySelector(id);
    if (!el) return;
    gsap.to(el, {
      y,
      rotation,
      scrollTrigger: {
        trigger: about,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
}
