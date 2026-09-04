import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// One consistent, Apple-quiet scroll reveal: elements rise, sharpen out
// of a slight blur, and fade in as they cross into view. Grouped with
// ScrollTrigger.batch so siblings inside the same section cascade in
// with a short stagger instead of popping in independently.
export function initScrollReveals(reducedMotion) {
  const els = gsap.utils.toArray('.reveal');
  if (!els.length) return;

  if (reducedMotion) {
    gsap.set(els, { opacity: 1, y: 0, filter: 'blur(0px)' });
    return;
  }

  gsap.set(els, { opacity: 0, y: 28, filter: 'blur(6px)' });

  ScrollTrigger.batch(els, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
      }),
  });
}
