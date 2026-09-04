// Periodically retargets the hero gradient to a random background-position
// — the CSS `transition` on .hero-gradient-bg (globals.css) does the
// actual easing, so this only needs to pick a new random spot every so
// often via setInterval (timers, unlike rAF-driven tweens, keep firing
// regardless of tab/tween throttling).
export function initHeroGradientShift(reducedMotion) {
  if (reducedMotion) return;

  const bg = document.querySelector('.hero-gradient-bg');
  if (!bg) return;

  const randomPosition = () => {
    const x = 20 + Math.random() * 60; // keep within the middle band so it never fully flattens to an edge
    const y = 20 + Math.random() * 60;
    bg.style.backgroundPosition = `${x}% ${y}%`;
  };

  const interval = setInterval(randomPosition, 5000);
  return () => clearInterval(interval);
}
