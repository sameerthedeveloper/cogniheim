const PHRASES = [
  'Frontend Developer',
  'I build with React & Next.js',
  'I ship offline-first PWAs',
  'I care about accessibility',
];

// A quiet, chrome-free typing cycle under the hero headline — no terminal
// prompt, just the accent-colored line typing out, holding, and clearing
// to the next phrase. The cursor stays solid while text is actively
// changing and blinks (CSS) only when idle between phrases.
export function animateHeroTyped(reducedMotion) {
  const el = document.querySelector('.hero-typed-text');
  const cursor = document.querySelector('.hero-typed-cursor');
  if (!el) return;

  if (reducedMotion) {
    el.textContent = PHRASES[0];
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
    const phrase = PHRASES[phraseIndex];
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
    const phrase = PHRASES[phraseIndex];
    setTyping(true);

    if (charIndex >= 0) {
      el.textContent = phrase.slice(0, charIndex);
      charIndex -= 1;
      setTimeout(deleteNext, DELETE_MS);
    } else {
      phraseIndex = (phraseIndex + 1) % PHRASES.length;
      charIndex = 0;
      setTyping(false);
      setTimeout(typeNext, GAP_MS);
    }
  };

  setTimeout(typeNext, 1100);
}
