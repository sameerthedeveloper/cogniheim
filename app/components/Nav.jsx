'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '../lib/utils.js';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#stack', label: 'Stack' },
  { href: '#work', label: 'Work' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const listRef = useRef(null);
  const indicatorRef = useRef(null);

  // Scroll-spy: highlight whichever section currently owns the middle
  // band of the viewport.
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Slide a small indicator under the active link, following it precisely
  // via measured positions rather than a CSS transition guess.
  useEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const target = active && list.querySelector(`a[href="${active}"]`);
    if (!target) {
      gsap.to(indicator, { opacity: 0, duration: 0.2 });
      return;
    }

    const listBox = list.getBoundingClientRect();
    const linkBox = target.getBoundingClientRect();

    gsap.to(indicator, {
      opacity: 1,
      x: linkBox.left - listBox.left,
      width: linkBox.width,
      duration: 0.45,
      ease: 'power3.out',
    });
  }, [active]);

  return (
    <header
      className={cn(
        'fixed inset-x-4 top-4 z-50 border border-line bg-surface-3/80 shadow-[0_8px_30px_-14px_rgba(61,57,41,0.35)] backdrop-blur-xl transition-[border-radius] duration-300 sm:inset-x-10 sm:top-6',
        open ? 'rounded-[28px]' : 'rounded-full'
      )}
    >
      <nav className="mx-auto flex h-14 max-w-wide items-center justify-between px-5 sm:px-8">
        <a href="#top" className="text-[15px] font-semibold tracking-tight text-ink">
          Mohamed Sameer
        </a>

        <ul ref={listRef} className="relative hidden items-center gap-8 md:flex">
          <span
            ref={indicatorRef}
            className="pointer-events-none absolute -bottom-[9px] left-0 h-0.5 rounded-full bg-accent opacity-0"
          />
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-[13px] transition-colors ${
                  active === link.href ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          target="_blank"
          className="hidden text-[13px] text-accent transition-opacity hover:opacity-70 md:inline-block"
        >
          Resume
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-line px-5 pb-5 pt-1 md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2 text-[15px] ${active === link.href ? 'text-accent' : 'text-ink'}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/resume.pdf" target="_blank" onClick={() => setOpen(false)} className="block py-2 text-[15px] text-accent">
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
