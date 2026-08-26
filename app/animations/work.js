import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ported from the reference repo's featured-work.js: a pinned section where
// the title track scrubs horizontally while a scattered field of preview
// cards flies toward the camera in 3D, staggered per card, alongside a
// progress-dot indicator row. Disabled at/below 1000px, matching the source.
const CARD_POSITIONS = [
  { left: '18%', top: '18%' },
  { left: '74%', top: '14%' },
  { left: '48%', top: '48%' },
  { left: '14%', top: '72%' },
  { left: '80%', top: '66%' },
  { left: '46%', top: '86%' },
];

const PROJECT_IMAGES = {
  'cinemafocus.in': '/projects/cinemafocus.webp',
  SalahSync: '/projects/salahsync.webp',
  RetailFlow: '/projects/retailflow.webp',
  IslamicTamilPod: '/projects/islamictamilpod.svg',
  OpenNotes: '/projects/opennotes.webp',
  'FoodGuard 2.0': '/projects/foodguard.webp',
};

export function animateWork(reducedMotion) {
  const section = document.querySelector('.work');
  const pin = document.querySelector('.work-pin');
  const titles = document.querySelector('.work-titles');
  const titleItems = document.querySelectorAll('.work-title-item');
  const cardsLayer = document.querySelector('.work-cards');
  const indicatorContainer = document.querySelector('.work-indicator');

  if (!section || !pin || !titles || !cardsLayer || !indicatorContainer) return;
  if (reducedMotion) return;

  let scrollTriggerInstance = null;

  const initAnimations = () => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }
    if (window.innerWidth <= 1000) return;

    // Progress-dot indicators — one "0N" label + 10 dots per project.
    indicatorContainer.innerHTML = '';
    titleItems.forEach((_, i) => {
      const num = document.createElement('span');
      num.className = 'indicator-num';
      num.textContent = String(i + 1).padStart(2, '0');
      indicatorContainer.appendChild(num);
      for (let d = 0; d < 10; d++) {
        const dot = document.createElement('span');
        dot.className = 'indicator';
        indicatorContainer.appendChild(dot);
      }
    });

    // Flying preview cards, one per project, scattered across the layer.
    cardsLayer.innerHTML = '';
    const cards = CARD_POSITIONS.map((pos, i) => {
      const card = document.createElement('div');
      card.className = 'work-card';
      card.style.left = pos.left;
      card.style.top = pos.top;
      const label = titleItems[i]?.dataset.preview ?? `Project ${i + 1}`;
      const src = PROJECT_IMAGES[label];
      if (src) {
        const img = document.createElement('img');
        img.className = 'project-thumb';
        img.src = src;
        img.alt = `${label} preview`;
        img.loading = 'lazy';
        card.appendChild(img);
      } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-img';
        placeholder.dataset.label = `Preview — ${label}`;
        card.appendChild(placeholder);
      }
      cardsLayer.appendChild(card);
      gsap.set(card, { xPercent: -50, yPercent: -50, z: -1500, scale: 0 });
      return card;
    });

    const moveDistance = Math.max(titles.scrollWidth - pin.clientWidth, 0);
    const indicators = () => indicatorContainer.querySelectorAll('.indicator');

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      pinType: 'fixed',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(titles, { x: -moveDistance * self.progress });

        cards.forEach((card, index) => {
          const staggerOffset = index * 0.075;
          const scaledProgress = (self.progress - staggerOffset) * 2;
          const individualProgress = Math.max(0, Math.min(1, scaledProgress));
          const newZ = -1500 + 3000 * individualProgress;
          const scale = Math.max(0, Math.min(1, individualProgress * 10));
          gsap.set(card, { z: newZ, scale });

          const titleEl = titleItems[index];
          if (titleEl) titleEl.classList.toggle('active', individualProgress > 0.5);
        });

        const dots = indicators();
        const perDot = 1 / dots.length;
        dots.forEach((dot, i) => {
          gsap.to(dot, { opacity: self.progress > i * perDot ? 1 : 0.2, duration: 0.3 });
        });
      },
    });
  };

  initAnimations();
  window.addEventListener('resize', initAnimations);
}

// Mobile fallback (≤1000px, where the pinned 3D gallery above is disabled):
// each list row fades/slides in as it enters view, and its thumbnail gets a
// small independent parallax drift — same depth-cue idea as the desktop
// gallery, scaled down to suit a compact list row.
export function animateWorkMobile(reducedMotion) {
  const items = document.querySelectorAll('.work-list-mobile > li');
  if (!items.length || reducedMotion) return;

  let triggers = [];

  const initAnimations = () => {
    triggers.forEach((t) => t.kill());
    triggers = [];
    if (window.innerWidth > 1000) return;

    items.forEach((item) => {
      const thumb = item.querySelector('.work-thumb');

      gsap.set(item, { opacity: 0, y: 24 });
      const tween = gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 92%' },
      });
      triggers.push(tween.scrollTrigger);

      if (thumb) {
        const parallax = gsap.to(thumb, {
          y: -12,
          ease: 'none',
          scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
        triggers.push(parallax.scrollTrigger);
      }
    });
  };

  initAnimations();
  window.addEventListener('resize', initAnimations);
}
