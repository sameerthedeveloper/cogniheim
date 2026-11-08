import gsap from 'gsap';

// The Apple product-page opener: headline words sharpen into focus one
// after another (blur + rise), then the supporting line and CTAs follow.
export function animateHeroIntro(reducedMotion) {
  const eyebrow = document.querySelector('.hero-eyebrow');
  const title = document.querySelector('.hero-title');
  const subtitle = document.querySelector('.hero-subtitle');
  const description = document.querySelector('.hero-description');
  const actions = document.querySelector('.hero-actions');
  const board = document.querySelector('.hero-board');
  const rows = board ? board.querySelectorAll('li') : [];

  if (reducedMotion || !title) {
    if (eyebrow) gsap.set(eyebrow, { opacity: 1, y: 0, filter: 'blur(0px)' });
    if (title) gsap.set(title, { opacity: 1, y: 0, filter: 'blur(0px)' });
    if (subtitle) gsap.set(subtitle, { opacity: 1, y: 0, filter: 'blur(0px)' });
    if (description) gsap.set(description, { opacity: 1, y: 0, filter: 'blur(0px)' });
    if (actions) gsap.set(actions, { opacity: 1, y: 0, filter: 'blur(0px)' });
    if (board) gsap.set([board, ...rows], { opacity: 1, x: 0, y: 0 });
    return;
  }

  gsap.set([eyebrow, title, subtitle, description, actions].filter(Boolean), { opacity: 0, y: 16, filter: 'blur(8px)' });

  if (board) gsap.set([board, ...rows], { opacity: 0, y: 24 });

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

  if (subtitle) {
    tl.to(subtitle, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' }, '-=0.5');
  }

  if (description) {
    tl.to(description, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' }, '-=0.4');
  }

  if (actions) {
    tl.to(actions, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, '-=0.45');
  }

  // The board lands last: panel first, then each project row in turn.
  if (board) {
    tl.to(board, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.5);
    tl.to(rows, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12 }, '-=0.3');
  }
}
