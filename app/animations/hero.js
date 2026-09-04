import gsap from 'gsap';

// The Apple product-page opener: headline words sharpen into focus one
// after another (blur + rise), then the supporting line and CTAs follow.
export function animateHeroIntro(reducedMotion) {
  const words = gsap.utils.toArray('.hero-word');
  const typed = document.querySelector('.hero-typed');
  const subhead = document.querySelector('.hero-subhead');
  const actions = document.querySelector('.hero-actions');
  const doodles = gsap.utils.toArray('.hero-doodle');

  if (reducedMotion || !words.length) {
    gsap.set([words, typed, subhead, actions], { opacity: 1, y: 0, filter: 'blur(0px)' });
    gsap.set(doodles, { opacity: 1 });
    return;
  }

  gsap.set(words, { opacity: 0, y: 22, filter: 'blur(10px)' });
  gsap.set([typed, subhead, actions], { opacity: 0, y: 16 });

  const tl = gsap.timeline({ delay: 0.1 });
  tl.to(words, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.05,
  })
    .to(typed, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5')
    .to(subhead, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
    .to(actions, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.45')
    // Opacity only — the doodles' rotation/bob is owned entirely by CSS
    // keyframes (globals.css), so GSAP never touches their transform.
    .to(doodles, { opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out' }, '-=0.3');
}
