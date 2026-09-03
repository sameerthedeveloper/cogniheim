import gsap from 'gsap';

// Persistent, non-scroll-triggered animation — loops continuously in the
// background regardless of scroll position, giving the page a bit of life
// even while a visitor sits still reading. Kept subtle on purpose: a gentle
// float on the About section's tag chips (desktop only — .about-tags is
// display:none on mobile, so there's nothing to animate there).
export function initAmbient(reducedMotion) {
  if (reducedMotion) return;

  if (window.innerWidth > 1000) {
    // about.js already owns `y`/`rotation` on these chips via a scroll-scrub
    // tween — animate `x` here instead so the two loops don't fight over the
    // same transform property.
    const tags = gsap.utils.toArray('.about-tag');
    tags.forEach((tag, i) => {
      gsap.to(tag, {
        x: '+=10',
        duration: 2.4 + i * 0.3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
      });
    });
  }
}
