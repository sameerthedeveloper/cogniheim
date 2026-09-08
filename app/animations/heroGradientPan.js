import gsap from 'gsap';

// Pans the hero's oversized gradient (globals.css sets background-size to
// give this room to travel) back and forth between three points on a slow
// loop. GSAP tweens backgroundPosition directly rather than relying on a
// CSS animation, so it rides the same ticker as every other motion on the
// page and pauses cleanly with the rest when the tab is hidden.
export function initHeroGradientPan(reducedMotion) {
  const el = document.querySelector('.hero-gradient-bg');
  if (!el || reducedMotion) return;

  gsap.set(el, { backgroundPosition: '15% 20%' });

  const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
  tl.to(el, { backgroundPosition: '85% 55%', duration: 9 }).to(el, {
    backgroundPosition: '35% 90%',
    duration: 9,
  });

  return () => tl.kill();
}
