import gsap from 'gsap';

// The Apple product-page opener: headline words sharpen into focus one
// after another (blur + rise), then the supporting line and CTAs follow.
export function animateHeroIntro(reducedMotion) {
  const eyebrow = document.querySelector('.hero-eyebrow');
  const title = document.querySelector('.hero-title');
  const description = document.querySelector('.hero-description');
  const actions = document.querySelector('.hero-actions');

  if (reducedMotion || !title) {
    if (eyebrow) gsap.set(eyebrow, { opacity: 1, y: 0, filter: 'blur(0px)' });
    if (title) gsap.set(title, { opacity: 1, y: 0, filter: 'blur(0px)' });
    if (description) gsap.set(description, { opacity: 1, y: 0, filter: 'blur(0px)' });
    if (actions) gsap.set(actions, { opacity: 1, y: 0, filter: 'blur(0px)' });
    return;
  }

  gsap.set([eyebrow, title, description, actions].filter(Boolean), { opacity: 0, y: 16, filter: 'blur(8px)' });

  const tl = gsap.timeline({ delay: 0.1 });

  if (eyebrow) {
    tl.to(eyebrow, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.7,
      ease: 'power3.out',
    });
  }

  if (title) {
    tl.to(title, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.5');
  }

  if (description) {
    tl.to(description, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' }, '-=0.4');
  }

  if (actions) {
    tl.to(actions, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, '-=0.45');
  }
}
