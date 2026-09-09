import gsap from 'gsap';

// The floating pill condenses a couple of pixels once a visitor actually
// starts reading, then relaxes back the moment they're near the top —
// driven by scroll position rather than a hover or click, so it reads as
// the page responding to the visitor instead of decoration.
export function initNavCondense(navEl, reducedMotion, onToggle) {
  if (!navEl) return () => {};

  const REST = 56;
  const CONDENSED = 46;

  if (reducedMotion) {
    return () => {};
  }

  const setHeight = gsap.quickTo(navEl, 'height', { duration: 0.45, ease: 'power3.out' });

  let condensed = false;
  const handleScroll = () => {
    const next = window.scrollY > 28;
    if (next === condensed) return;
    condensed = next;
    setHeight(next ? CONDENSED : REST);
    onToggle?.(next);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener('scroll', handleScroll);
}
