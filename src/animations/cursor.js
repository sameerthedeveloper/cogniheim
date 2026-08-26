import gsap from 'gsap';

const HOVER_SELECTOR = 'a, button';

export function initCursor(reducedMotion) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (reducedMotion || isTouch) return;

  document.documentElement.classList.add('has-cursor');

  const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' });

  gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

  let revealed = false;

  window.addEventListener('mousemove', (e) => {
    dotX(e.clientX);
    dotY(e.clientY);
    ringX(e.clientX);
    ringY(e.clientY);

    if (!revealed) {
      revealed = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    }
  });

  document.addEventListener('mouseleave', () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
  });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVER_SELECTOR)) {
      ring.classList.add('is-hover');
      gsap.to(dot, { opacity: 0, duration: 0.2 });
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(HOVER_SELECTOR)) {
      ring.classList.remove('is-hover');
      gsap.to(dot, { opacity: 1, duration: 0.2 });
    }
  });
}
