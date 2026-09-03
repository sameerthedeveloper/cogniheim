import gsap from 'gsap';

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
