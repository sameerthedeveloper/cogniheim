import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Work thumbnails start slightly zoomed in and settle to their resting
// scale as they scroll into view — a one-shot cinematic entrance, distinct
// from the hover zoom (which lives on the image itself, not this wrapper,
// so the two scales compound instead of fighting over one transform).
export function animateWorkThumbs(reducedMotion) {
  const wraps = gsap.utils.toArray('.work-thumb-wrap');
  if (!wraps.length) return;

  if (reducedMotion) {
    gsap.set(wraps, { scale: 1 });
    return;
  }

  gsap.set(wraps, { scale: 1.12 });

  ScrollTrigger.batch(wraps, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.08,
      }),
  });
}
