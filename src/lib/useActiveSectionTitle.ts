import { useEffect } from "react";

type Section = { id: string; label: string };

/** Updates document.title to reflect whichever section is currently in view while scrolling, falling back to baseTitle when none is. */
export function useActiveSectionTitle(sections: Section[], baseTitle: string) {
  useEffect(() => {
    const elements = sections
      .map(({ id, label }) => {
        const el = document.getElementById(id);
        return el ? { el, label } : null;
      })
      .filter((s): s is { el: HTMLElement; label: string } => s !== null);

    if (elements.length === 0) return;

    const visible = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target, entry.intersectionRatio);
          else visible.delete(entry.target);
        }

        let topLabel: string | null = null;
        let topRatio = 0;
        for (const { el, label } of elements) {
          const ratio = visible.get(el) ?? 0;
          if (ratio > topRatio) {
            topRatio = ratio;
            topLabel = label;
          }
        }

        document.title = topLabel && topLabel !== elements[0].label ? `${topLabel} — Cogniheim` : baseTitle;
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const { el } of elements) observer.observe(el);

    return () => {
      observer.disconnect();
      document.title = baseTitle;
    };
  }, [sections, baseTitle]);
}
