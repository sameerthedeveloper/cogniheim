import gsap from 'gsap';

export function initNav(reducedMotion) {
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.nav-overlay');
  if (!toggle || !overlay) return;

  const items = overlay.querySelectorAll('.nav-overlay-links li, .nav-overlay-col');
  let isOpen = false;
  let isAnimating = false;
  let scrollY = 0;

  gsap.set(items, { opacity: 0, y: '100%' });

  function open() {
    isAnimating = true;
    overlay.hidden = false;
    overlay.style.pointerEvents = 'all';
    toggle.setAttribute('aria-expanded', 'true');

    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    if (reducedMotion) {
      gsap.set(overlay, { opacity: 1 });
      gsap.set(items, { opacity: 1, y: '0%' });
      isAnimating = false;
      return;
    }

    gsap.to(overlay, {
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        isAnimating = false;
      },
    });

    gsap.to(items, {
      opacity: 1,
      y: '0%',
      duration: 0.75,
      stagger: 0.075,
      ease: 'power4.out',
    });
  }

  function close() {
    isAnimating = true;
    overlay.style.pointerEvents = 'none';
    toggle.setAttribute('aria-expanded', 'false');

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);

    if (reducedMotion) {
      overlay.hidden = true;
      gsap.set(items, { opacity: 0, y: '100%' });
      isAnimating = false;
      return;
    }

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        overlay.hidden = true;
        gsap.set(items, { opacity: 0, y: '100%' });
        isAnimating = false;
      },
    });
  }

  toggle.addEventListener('click', () => {
    if (isAnimating) {
      gsap.killTweensOf([overlay, items]);
      isAnimating = false;
    }
    isOpen = !isOpen;
    isOpen ? open() : close();
  });

  overlay.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      if (isOpen) {
        isOpen = false;
        close();
      }
    })
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      isOpen = false;
      close();
    }
  });
}
