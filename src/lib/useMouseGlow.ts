import { useEffect, useRef, useCallback } from "react";

/**
 * Tracks mouse position within an element and sets --mouse-x / --mouse-y
 * CSS custom properties (in px relative to the element's top-left) so CSS
 * radial-gradient spotlights can follow the pointer.
 */
export function useMouseGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return ref;
}
