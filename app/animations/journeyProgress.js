import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The journey rail fills in step with how far a visitor has actually
// scrolled through it — an accent line drawing itself down the base
// rail, lighting each dot as the fill reaches it. It's the one place on
// the timeline where motion answers the visitor directly: how far along
// this story you are is exactly how far you've scrolled.
export function initJourneyProgress(reducedMotion) {
  const rail = document.querySelector('.journey-rail');
  const fill = document.querySelector('.journey-rail-fill');
  const dots = gsap.utils.toArray('.journey-dot');
  if (!rail || !fill || !dots.length) return;

  if (reducedMotion) {
    gsap.set(fill, { scaleY: 1 });
    dots.forEach((dot) => dot.classList.add('is-passed'));
    return;
  }

  const trigger = ScrollTrigger.create({
    trigger: rail,
    start: 'top center',
    end: 'bottom center',
    scrub: 0.4,
    onUpdate: (self) => {
      gsap.set(fill, { scaleY: self.progress });
      dots.forEach((dot, i) => {
        const passed = self.progress >= i / (dots.length - 1) - 0.02;
        dot.classList.toggle('is-passed', passed);
      });
    },
  });

  return () => trigger.kill();
}
