'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Real controls get the iPadOS treatment: the pointer doesn't just grow
// in place, it snaps onto the control and takes its exact size, shape
// (border-radius) and position, staying locked there until the pointer
// leaves — as if the pointer becomes the button. That "freeze at the
// control's center" only reads as intentional on small controls though —
// on a large project card (300px+), freezing the cursor while the mouse
// keeps moving just looks stuck. Anything taller than GLOW_MAX_HEIGHT
// (buttons/pills/nav links stay well under it, cards don't) instead gets
// a soft accent glow that keeps tracking the real pointer.
const SNAP_SELECTOR = 'a, button, [role="button"]';
const TEXT_SELECTOR = 'input, textarea';
// Skill chips do their own brand-color fill + shadow on hover
// (globals.css .skill-chip) — the cursor just gets out of the way
// instead of snapping onto them, so nothing fights that reveal.
const HIDE_SELECTOR = '.skill-chip';
const DEFAULT_SIZE = 30;
const SNAP_PADDING = 6;
const GLOW_MAX_HEIGHT = 80;
const GLOW_SIZE = 90;

// A single morphing pointer (iPadOS-style) in the site's accent color —
// replaces the system cursor on hover-capable, fine-pointer devices
// only. Circle by default, snaps to fill+match the shape of buttons and
// links, thins into a caret over text fields.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const pointerRef = useRef(null);

  // Server and the first client render must both output null (no way to
  // know pointer capabilities during SSR), so this flips to true only
  // after mount — a deliberate one-time extra render, not the cascading
  // setState-in-effect pattern the lint rule normally warns about.
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (canHover && !reducedMotion) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const html = document.documentElement;
    html.classList.add('cursor-none-active');

    const dot = dotRef.current;
    const pointer = pointerRef.current;

    gsap.set(pointer, { xPercent: -50, yPercent: -50, width: DEFAULT_SIZE, height: DEFAULT_SIZE, borderRadius: 9999 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const moveX = gsap.quickTo(pointer, 'x', { duration: 0.25, ease: 'power3' });
    const moveY = gsap.quickTo(pointer, 'y', { duration: 0.25, ease: 'power3' });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });

    let visible = false;
    let snapped = null; // the element currently locked onto, or null

    // `overwrite: 'auto'` on every opacity/color tween below matters:
    // plain gsap.to() calls don't kill a same-property tween already in
    // flight on their own (that's exactly why x/y tracking above uses
    // quickTo instead). Hovering quickly between chips/buttons/text
    // fields fires these in tight succession, and without an explicit
    // overwrite a longer, earlier tween can finish after a later one and
    // silently win — e.g. leaving a chip (opacity -> 1) then re-entering
    // one (opacity -> 0) could settle back on 1 once the first tween's
    // longer duration ran out.
    const reveal = () => {
      if (visible) return;
      visible = true;
      gsap.to([dot, pointer], { opacity: 1, duration: 0.25, overwrite: 'auto' });
    };

    const snapToElement = (el) => {
      const rect = el.getBoundingClientRect();
      const radius = getComputedStyle(el).borderRadius;
      moveX(rect.left + rect.width / 2);
      moveY(rect.top + rect.height / 2);
      gsap.to(pointer, {
        width: rect.width + SNAP_PADDING * 2,
        height: rect.height + SNAP_PADDING * 2,
        borderRadius: radius === '0px' ? 4 : radius,
        duration: 0.35,
        ease: 'back.out(1.8)',
        overwrite: 'auto',
      });
      // Plain rgba (not color-mix()) — GSAP interpolates color tweens by
      // parsing rgb components directly, and can't decompose an unresolved
      // CSS color function, which would make this snap instead of fade.
      gsap.to(pointer, {
        backgroundColor: 'rgba(217, 119, 87, 0.14)',
        borderColor: 'rgba(217, 119, 87, 0)',
        duration: 0.25,
        overwrite: 'auto',
      });
      gsap.to(dot, { opacity: 0, duration: 0.15, overwrite: 'auto' });
    };

    const hideCursor = () => {
      gsap.to([dot, pointer], { opacity: 0, duration: 0.15, overwrite: 'auto' });
    };

    const releaseSnap = () => {
      gsap.to(pointer, {
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
        borderRadius: 9999,
        opacity: 1,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.to(pointer, {
        backgroundColor: 'rgba(217, 119, 87, 0)',
        borderColor: 'rgba(217, 119, 87, 0.7)',
        duration: 0.25,
        overwrite: 'auto',
      });
      gsap.to(dot, { opacity: 1, duration: 0.2, overwrite: 'auto' });
    };

    const enterText = () => {
      gsap.to(pointer, { width: 2, height: 22, borderRadius: 2, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(pointer, {
        backgroundColor: 'rgba(217, 119, 87, 1)',
        borderColor: 'rgba(217, 119, 87, 0)',
        duration: 0.2,
        overwrite: 'auto',
      });
      gsap.to(dot, { opacity: 0, duration: 0.15, overwrite: 'auto' });
    };

    // Large tappable areas (project cards) — a soft glow that keeps
    // following the actual cursor, rather than freezing to the card's
    // center like a small button would.
    const enterGlow = () => {
      gsap.to(pointer, { width: GLOW_SIZE, height: GLOW_SIZE, borderRadius: 9999, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(pointer, {
        backgroundColor: 'rgba(217, 119, 87, 0.16)',
        borderColor: 'rgba(217, 119, 87, 0.4)',
        duration: 0.25,
        overwrite: 'auto',
      });
      gsap.to(dot, { opacity: 0.5, duration: 0.15, overwrite: 'auto' });
    };

    const handleMove = (event) => {
      reveal();
      dotX(event.clientX);
      dotY(event.clientY);

      // While snapped to a control, the pointer stays locked to its
      // bounds (set once in handleOver) rather than tracking raw
      // movement — that "the pointer becomes the button" stillness is
      // the actual iPadOS trait, not just a bigger cursor.
      if (snapped && snapped.mode === 'snap') return;

      moveX(event.clientX);
      moveY(event.clientY);
    };

    const handleLeaveWindow = () => {
      visible = false;
      gsap.to([dot, pointer], { opacity: 0, duration: 0.2, overwrite: 'auto' });
    };

    const handleOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const textEl = target.closest(TEXT_SELECTOR);
      const hideEl = target.closest(HIDE_SELECTOR);
      const snapEl = target.closest(SNAP_SELECTOR);

      if (textEl) {
        if (snapped?.el === textEl) return;
        snapped = { el: textEl, mode: 'text' };
        enterText();
      } else if (hideEl) {
        if (snapped?.el === hideEl) return;
        snapped = { el: hideEl, mode: 'hidden' };
        hideCursor();
      } else if (snapEl) {
        if (snapped?.el === snapEl) return;
        const isLarge = snapEl.getBoundingClientRect().height > GLOW_MAX_HEIGHT;
        snapped = { el: snapEl, mode: isLarge ? 'glow' : 'snap' };
        if (isLarge) enterGlow();
        else snapToElement(snapEl);
      }
    };

    const handleOut = (event) => {
      const related = event.relatedTarget;
      if (related instanceof Element && snapped && (related === snapped.el || snapped.el.contains(related))) return;
      snapped = null;
      releaseSnap();
    };

    const handleDown = () => {
      if (!snapped) gsap.to(pointer, { scale: 0.75, duration: 0.15 });
    };
    const handleUp = () => gsap.to(pointer, { scale: 1, duration: 0.25 });

    window.addEventListener('pointermove', handleMove);
    document.addEventListener('mouseleave', handleLeaveWindow);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);

    return () => {
      html.classList.remove('cursor-none-active');
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseleave', handleLeaveWindow);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <span ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <span ref={pointerRef} className="custom-cursor-pointer" aria-hidden="true" />
    </>
  );
}
