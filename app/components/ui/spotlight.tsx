'use client';

import { useRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils.js';

// Spotlight Card (21st.dev pattern): a soft accent glow follows the pointer
// across the card. Pointer-only; on touch and under reduced motion it never
// shows, so the card stays a plain surface.
export function Spotlight({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--sx', `${e.clientX - r.left}px`);
        el.style.setProperty('--sy', `${e.clientY - r.top}px`);
      }}
      className={cn('group/spot relative', className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100 motion-reduce:hidden [@media(hover:none)]:hidden"
        style={{
          background:
            'radial-gradient(320px circle at var(--sx, 50%) var(--sy, 50%), color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)',
        }}
      />
      {children}
    </div>
  );
}
