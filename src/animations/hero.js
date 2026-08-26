import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateHero(reducedMotion) {
  const line1 = document.querySelector('.hero-line-1');
  const line2 = document.querySelector('.hero-line-2');
  const footer = document.querySelector('.hero-footer');

  if (!line1 || !line2) return;

  if (reducedMotion) {
    gsap.set([line1, line2, footer], { opacity: 1, x: 0, y: 0 });
    return;
  }

  gsap.set(line1, { xPercent: -8, opacity: 0 });
  gsap.set(line2, { xPercent: 4, opacity: 0 });
  gsap.set(footer, { opacity: 0, y: 16 });

  const tl = gsap.timeline({ delay: 0.15 });
  tl.to(line1, { xPercent: -2, opacity: 1, duration: 1, ease: 'power3.out' })
    .to(line2, { xPercent: 8, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.85')
    .to(footer, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
}

// Ported from the reference repo's hero.js: as the hero image enters, it
// unfurls from off-screen-below/rotated/small into place, scrubbed to scroll.
export function animateHeroImage(reducedMotion) {
  const holder = document.querySelector('.hero-image');
  const inner = document.querySelector('.hero-img-inner');
  if (!holder || !inner) return;

  if (reducedMotion) {
    gsap.set(inner, { y: '0%', scale: 1, rotation: 0 });
    return;
  }

  gsap.set(inner, { y: '-110%', scale: 0.25, rotation: -15 });

  ScrollTrigger.create({
    trigger: holder,
    start: 'top bottom',
    end: 'top top',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.set(inner, {
        y: `${-110 + 110 * progress}%`,
        scale: 0.25 + 0.75 * progress,
        rotation: -15 + 15 * progress,
      });
    },
  });
}
