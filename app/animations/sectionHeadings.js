import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The hero's word-by-word "sharpen into focus" treatment, reused as a
// scroll-triggered reveal for section headings — ties the typographic
// language together without repeating the hero's on-load timeline.
export function animateSectionHeadings(reducedMotion) {
  const words = gsap.utils.toArray('.section-word');
  if (!words.length) return;

  if (reducedMotion) {
    gsap.set(words, { opacity: 1, y: 0, filter: 'blur(0px)' });
    return;
  }

  gsap.set(words, { opacity: 0, y: 18, filter: 'blur(8px)' });

  ScrollTrigger.batch(words, {
    start: 'top 85%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.04,
      }),
  });
}
