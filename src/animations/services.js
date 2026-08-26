import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ported from the reference repo's services.js: each card (but the last)
// pins in place while its inner content scrubs upward as the next card
// arrives, ending once the contact CTA reaches the bottom of the viewport.
// Disabled at/below 1000px, matching the source.
export function animateServices(reducedMotion) {
  const services = gsap.utils.toArray('.service-card');
  const contactCta = document.querySelector('.contact-cta');
  if (!services.length || !contactCta) return;

  const icons = document.querySelectorAll('.service-icon');

  if (reducedMotion) {
    gsap.set(icons, { scale: 1 });
    return;
  }

  let instances = [];

  const initAnimations = () => {
    instances.forEach((instance) => instance?.kill());
    instances = [];

    if (window.innerWidth <= 1000) {
      gsap.set(icons, { scale: 1 });
      return;
    }

    gsap.set(icons, { scale: 0 });
    const iconAnim = gsap.to(icons, {
      scale: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.services',
        start: 'top 60%',
      },
    });
    instances.push(iconAnim.scrollTrigger);

    services.forEach((service, index) => {
      const isLast = index === services.length - 1;
      const inner = service.querySelector('.service-card-inner');
      if (isLast) return;

      const pinTrigger = ScrollTrigger.create({
        trigger: service,
        start: 'top top',
        endTrigger: contactCta,
        end: 'top 90%',
        pin: true,
        pinType: 'fixed',
        pinSpacing: false,
      });
      instances.push(pinTrigger);

      const scrollAnimation = gsap.to(inner, {
        y: `-${(services.length - index) * 14}vh`,
        ease: 'none',
        scrollTrigger: {
          trigger: service,
          start: 'top top',
          endTrigger: contactCta,
          end: 'top 90%',
          scrub: true,
        },
      });
      instances.push(scrollAnimation.scrollTrigger);
    });
  };

  initAnimations();
  window.addEventListener('resize', initAnimations);
}
