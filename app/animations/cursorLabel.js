import gsap from 'gsap';

// A "View details" pill that tracks the pointer across the spotlight
// work card — the one signature interactive moment in the work grid,
// kept to a single card rather than scattered across all six.
export function initCursorLabel(reducedMotion) {
  if (reducedMotion) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const spotlight = document.querySelector('.work-spotlight');
  const label = spotlight?.querySelector('.cursor-label');
  if (!spotlight || !label) return;

  const x = gsap.quickTo(label, 'x', { duration: 0.45, ease: 'power3' });
  const y = gsap.quickTo(label, 'y', { duration: 0.45, ease: 'power3' });

  spotlight.addEventListener('pointermove', (event) => {
    const rect = spotlight.getBoundingClientRect();
    x(event.clientX - rect.left);
    y(event.clientY - rect.top);
  });

  spotlight.addEventListener('pointerenter', () => {
    gsap.to(label, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
  });

  spotlight.addEventListener('pointerleave', () => {
    gsap.to(label, { opacity: 0, scale: 0.75, duration: 0.3, ease: 'power2.out' });
  });
}
