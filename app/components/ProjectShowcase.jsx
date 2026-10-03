'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { NotchedProjectCard } from './ui/notched-project-card';
import ProjectModal from './ProjectModal.jsx';
import { cn } from '../lib/utils.js';

gsap.registerPlugin(ScrollTrigger);

// WORK as a horizontal strip driven by page scroll: on md+ (motion allowed)
// the strip pins mid-screen and scrolling down slides it sideways until the
// last card is in view, then the page carries on. Phones and reduced-motion
// visitors get the same strip as a native snap-scroll/swipe row instead —
// pinning is jumpy on touch and is exactly the motion they've opted out of.
// The existing ProjectModal stays the full write-up behind each cover.
export default function ProjectShowcase({ work }) {
  const [active, setActive] = useState(null);
  const [pinned, setPinned] = useState(false);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const triggerRef = useRef(null);

  // Decide the mode first; the pinned layout (w-max track, fixed card
  // widths) has to be in the DOM before ScrollTrigger measures it.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      setPinned(true);
      return () => setPinned(false);
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // Full-bleed while pinned: the viewport spans the screen, and the
    // track's side padding re-aligns the first and last card with the
    // section's content edges.
    // Grab the content column now — once pinned, the viewport's parent is
    // ScrollTrigger's pin-spacer, not the section's content column.
    const content = viewport.parentElement;
    const align = () => {
      // Measured against the viewport itself: 100vw includes the scrollbar.
      const pad = content.getBoundingClientRect().left - viewport.getBoundingClientRect().left;
      gsap.set(track, { paddingLeft: pad, paddingRight: pad });
    };
    align();
    ScrollTrigger.addEventListener('refreshInit', align);

    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: viewport,
        start: 'center center',
        // 1.5× the travel so the slide reads as calm, not a whip-pan.
        end: () => `+=${distance() * 1.5}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    triggerRef.current = tween.scrollTrigger;
    // The pin adds scroll length; re-measure every trigger further down.
    ScrollTrigger.refresh();

    return () => {
      triggerRef.current = null;
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.removeEventListener('refreshInit', align);
      gsap.set(track, { clearProps: 'transform,paddingLeft,paddingRight' });
    };
  }, [pinned, work.length]);

  // Tabbing to a card that's still off to the side scrolls the page to the
  // point in the pin where that card has slid into view.
  const revealCard = (index) => {
    const st = triggerRef.current;
    if (!st || work.length < 2) return;
    const y = st.start + (st.end - st.start) * (index / (work.length - 1));
    window.scrollTo({ top: y, behavior: 'auto' });
  };

  return (
    <>
      {/* Native strip: bleeds to the section gutters. Pinned: bleeds to the
          screen edges (the section clips the overflow on the x axis). */}
      <div
        ref={viewportRef}
        className={cn('overflow-hidden', pinned ? 'ml-[calc(50%-50vw)] w-screen' : '-mx-5 sm:-mx-8')}
      >
        <ul
          ref={trackRef}
          tabIndex={pinned ? undefined : 0}
          aria-label="Projects"
          className={cn(
            'flex gap-6 px-5 pb-6 sm:px-8 md:gap-8',
            pinned
              ? 'w-max will-change-transform'
              : 'snap-x snap-mandatory overflow-x-auto scroll-px-5 scrollbar-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:scroll-px-8 [&::-webkit-scrollbar]:hidden',
          )}
        >
          {work.map((project, index) => (
            <li
              key={project.slug ?? project.name}
              onFocus={pinned ? () => revealCard(index) : undefined}
              className={cn(
                'shrink-0 snap-start',
                pinned ? 'w-[min(60vw,32rem)]' : 'w-[85%] sm:w-[60%] lg:w-[calc((100%-4rem)/2.35)]',
              )}
            >
              <NotchedProjectCard project={project} onOpen={() => setActive(project)} />
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
