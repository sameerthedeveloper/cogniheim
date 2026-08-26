import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Each card alternates image/text sides via CSS (nth-child(even) flips
// flex-direction and the slide-in offset). Here we just animate every
// card's icon, content, and image into place as it scrolls into view —
// direction is already baked into each element's CSS "from" transform.
export function animateServices(reducedMotion) {
  const cards = gsap.utils.toArray('.service-card');
  if (!cards.length) return;

  const icons = document.querySelectorAll('.service-icon');
  const contents = document.querySelectorAll('.service-card-content');
  const thumbs = document.querySelectorAll('.service-thumb');

  if (reducedMotion) {
    gsap.set(icons, { scale: 1 });
    gsap.set([...contents, ...thumbs], { opacity: 1, x: 0 });
    return;
  }

  cards.forEach((card) => {
    const icon = card.querySelector('.service-icon');
    const content = card.querySelector('.service-card-content');
    const thumb = card.querySelector('.service-thumb');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 78%',
      },
    });

    if (content) tl.to(content, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 0);
    if (thumb) tl.to(thumb, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 0.05);
    if (icon) {
      tl.to(icon, { scale: 1, duration: 0.6, ease: 'power4.out' }, 0.2);
    }
  });
}
