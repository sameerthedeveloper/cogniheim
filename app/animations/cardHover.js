import gsap from 'gsap';

// A tactile lift + shadow bloom on hover/focus for card grids — GSAP
// quickTo so repeated, fast pointer movement stays smooth instead of
// queuing up competing tweens.
export function initCardLift(reducedMotion) {
  if (reducedMotion) return;

  gsap.utils.toArray('.lift-card').forEach((card) => {
    const y = gsap.quickTo(card, 'y', { duration: 0.4, ease: 'power3.out' });
    const scale = gsap.quickTo(card, 'scale', { duration: 0.4, ease: 'power3.out' });

    const enter = () => {
      y(-6);
      scale(1.015);
    };
    const leave = () => {
      y(0);
      scale(1);
    };

    card.addEventListener('pointerenter', enter);
    card.addEventListener('pointerleave', leave);
    card.addEventListener('focusin', enter);
    card.addEventListener('focusout', leave);
  });
}
