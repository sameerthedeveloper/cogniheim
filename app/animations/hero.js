import gsap from 'gsap';

export function animateHero(reducedMotion) {
  const line1 = document.querySelector('.hero-line-1');
  const line2 = document.querySelector('.hero-line-2');
  const footer = document.querySelector('.hero-footer');

  if (!line1 || !line2) return;

  if (reducedMotion) {
    gsap.set([line1, line2, footer], { opacity: 1, x: 0, y: 0 });
    return;
  }

  gsap.set(line1, { xPercent: -8, opacity: 0 });
  gsap.set(line2, { xPercent: 4, opacity: 0 });
  gsap.set(footer, { opacity: 0, y: 16 });

  const tl = gsap.timeline({ delay: 0.15 });
  tl.to(line1, { xPercent: -2, opacity: 1, duration: 1, ease: 'power3.out' })
    .to(line2, { xPercent: 8, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.85')
    .to(footer, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
}

const TYPED_PHRASES = [
  'Frontend Developer',
  'Builds with React & Next.js',
  'Ships offline-first PWAs',
  'Cares about accessibility',
];

// A small terminal-style typewriter under the name — types a phrase out,
// holds, deletes it, and moves to the next, looping forever. The cursor
// stays solid while text is actively changing and only blinks (handled by
// the .hero-typed-cursor CSS animation) once it's sitting idle between
// phrases, matching how a real terminal caret behaves.
export function animateHeroTyped(reducedMotion) {
  const el = document.querySelector('.hero-typed-text');
  const cursor = document.querySelector('.hero-typed-cursor');
  if (!el) return;

  if (reducedMotion) {
    el.textContent = TYPED_PHRASES[0];
    return;
  }

  const TYPE_MS = 55;
  const DELETE_MS = 30;
  const HOLD_MS = 1600;
  const GAP_MS = 300;

  let phraseIndex = 0;
  let charIndex = 0;

  const setTyping = (isTyping) => cursor?.classList.toggle('is-typing', isTyping);

  const typeNext = () => {
    const phrase = TYPED_PHRASES[phraseIndex];
    setTyping(true);

    if (charIndex <= phrase.length) {
      el.textContent = phrase.slice(0, charIndex);
      charIndex += 1;
      setTimeout(typeNext, TYPE_MS);
    } else {
      setTyping(false);
      setTimeout(deleteNext, HOLD_MS);
    }
  };

  const deleteNext = () => {
    const phrase = TYPED_PHRASES[phraseIndex];
    setTyping(true);

    if (charIndex >= 0) {
      el.textContent = phrase.slice(0, charIndex);
      charIndex -= 1;
      setTimeout(deleteNext, DELETE_MS);
    } else {
      phraseIndex = (phraseIndex + 1) % TYPED_PHRASES.length;
      charIndex = 0;
      setTyping(false);
      setTimeout(typeNext, GAP_MS);
    }
  };

  setTimeout(typeNext, 900);
}
