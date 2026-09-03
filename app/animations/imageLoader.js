import gsap from 'gsap';

const IMAGE_SELECTOR = '.project-thumb, .service-thumb, .work-thumb';

// Every real photo on the site gets a skeleton shimmer (CSS, see
// .img-skeleton in sections.css) behind it until it finishes loading,
// then fades in with GSAP instead of popping in abruptly. Images already
// cached/complete by the time this runs skip straight to visible.
export function initImageLoader(reducedMotion) {
  const images = document.querySelectorAll(IMAGE_SELECTOR);
  if (!images.length) return;

  images.forEach((img) => {
    img.classList.add('img-skeleton');

    const reveal = () => {
      img.classList.remove('img-skeleton');
      if (reducedMotion) {
        gsap.set(img, { opacity: 1 });
      } else {
        gsap.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      reveal();
    } else {
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', () => img.classList.remove('img-skeleton'), { once: true });
    }
  });
}
