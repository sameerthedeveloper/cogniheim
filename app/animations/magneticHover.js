import gsap from 'gsap';

// A subtle magnetic pull on primary buttons — the button drifts a few
// pixels toward the cursor within its own bounds, and springs back on
// leave. Kept small (a fraction of the button's size) so it complements
// the custom cursor's snap-to-bounds behavior instead of fighting it.
export function initMagneticHover(reducedMotion) {
  if (reducedMotion) return;
  if (window.matchMedia('(hover: none)').matches) return;

  gsap.utils.toArray('.magnetic').forEach((el) => {
    const moveX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });

    const handleMove = (event) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      moveX(relX * 0.25);
      moveY(relY * 0.35);
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);
  });
}
