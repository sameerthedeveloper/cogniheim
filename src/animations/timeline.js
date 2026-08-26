import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The "build log" rail: a signal line draws down the Journey section as you
// scroll, with each entry fading in as the rail reaches it.
export function animateTimeline(reducedMotion) {
  const timeline = document.querySelector('.timeline');
  const rail = document.querySelector('.timeline-rail-fill');
  const items = document.querySelectorAll('.timeline-item');

  if (!timeline || !items.length) return;

  if (reducedMotion) {
    if (rail) gsap.set(rail, { scaleY: 1 });
    gsap.set(items, { opacity: 1, y: 0 });
    return;
  }

  if (rail) {
    gsap.to(rail, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 75%',
        end: 'bottom 70%',
        scrub: 0.6,
      },
    });
  }

  items.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: index * 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
    });
  });
}
