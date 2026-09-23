'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '../lib/utils.js';

function GitHubMark({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.582 2 12.253c0 4.512 2.865 8.33 6.84 9.683.5.095.682-.218.682-.484 0-.238-.009-.866-.013-1.697-2.782.606-3.37-1.34-3.37-1.34-.454-1.153-1.11-1.458-1.11-1.458-.907-.621.069-.608.069-.608 1.005.071 1.536 1.033 1.536 1.033.893 1.533 2.341 1.09 2.912.834.09-.647.35-1.09.636-1.338-2.221-.253-4.555-1.114-4.555-4.95 0-1.093.39-1.988 1.03-2.687-.103-.252-.448-1.272.098-2.653 0 0 .843-.27 2.759 1.028A9.56 9.56 0 0 1 12 6.84c.854 0 1.716.115 2.52.337 1.914-1.298 2.758-1.028 2.758-1.028.547 1.381.203 2.401.1 2.653.64.699 1.03 1.594 1.03 2.687 0 3.839-2.337 4.694-4.566 4.942.359.31.679.922.679 1.856 0 1.339-.012 2.415-.012 2.744 0 .268.179.58.688.482A10.263 10.263 0 0 0 22 12.253C22 6.582 17.523 2 12 2Z" />
    </svg>
  );
}

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const listRef = useRef(null);
  const indicatorRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const mobileListRef = useRef(null);

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

  // Entrance moment: the pill drops in and the links cascade after it
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = headerRef.current;
    const items = gsap.utils.toArray('[data-nav-item]');

    if (reducedMotion) {
      gsap.set(header, { opacity: 1, y: 0 });
      gsap.set(items, { opacity: 1, y: 0 });
    } else {
      gsap.set(header, { opacity: 0, y: -18 });
      gsap.set(items, { opacity: 0, y: -8 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(header, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }).to(
        items,
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
        '-=0.3'
      );
    }
  }, []);

  // The mobile panel expands/collapses with GSAP rather than snapping in
  // and out with the conditional render, and its links cascade in after.
  useEffect(() => {
    const panel = mobilePanelRef.current;
    if (!panel) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = gsap.utils.toArray('[data-mobile-item]', mobileListRef.current);

    if (reducedMotion) {
      gsap.set(panel, { height: open ? 'auto' : 0, opacity: open ? 1 : 0 });
      return;
    }

    if (open) {
      gsap.set(panel, { display: 'block' });
      gsap.set(items, { opacity: 0, x: -10 });
      const tl = gsap.timeline();
      tl.to(panel, { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.out' }).to(
        items,
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, ease: 'power3.out' },
        '-=0.15'
      );
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => gsap.set(panel, { display: 'none' }),
      });
    }
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-4 top-4 z-50 mx-auto w-auto max-w-5xl border border-white/10 bg-noir/90 px-4 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:inset-x-10 sm:top-6 sm:px-0',
        open ? 'flex flex-col rounded-[28px]' : 'flex rounded-full',
      )}
    >
      <nav ref={navRef} className="mx-auto flex h-14 w-full max-w-full items-center justify-between px-5 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          data-nav-item
          className="relative flex shrink-0 items-center justify-center md:justify-self-start"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Cogniheim"
            className="h-10 w-auto object-contain transition-transform duration-200 hover:scale-105"
          />
        </a>

        <ul ref={listRef} className="relative hidden items-center gap-8 md:flex md:justify-self-center">
          <span
            ref={indicatorRef}
            className="pointer-events-none absolute -bottom-2.25 left-0 h-0.5 rounded-full bg-accent opacity-0"
          />
          {LINKS.map((link) => (
            <li key={link.href} data-nav-item>
              <a
                href={link.href}
                className={`text-[13px] transition-colors ${
                  active === link.href ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-3 md:flex md:justify-self-end">
          <a
            href="https://github.com/sameerthedeveloper"
            target="_blank"
            rel="noreferrer"
            data-nav-item
            aria-label="GitHub profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-accent hover:text-accent"
          >
            <GitHubMark className="h-4 w-4" />
          </a>

          <a
            href="#contact"
            data-nav-item
            className="magnetic rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Start the Build
          </a>
        </div>

        <button
          type="button"
          data-nav-item
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </nav>

      <div id="mobile-nav" ref={mobilePanelRef} className="hidden w-full overflow-hidden md:hidden" style={{ height: 0, opacity: 0 }}>
        <ul ref={mobileListRef} className="flex flex-col gap-1 border-t border-white/10 px-5 pb-5 pt-4">
          {LINKS.map((link) => (
            <li key={link.href} data-mobile-item>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-[15px] ${active === link.href ? 'text-accent' : 'text-white/80'}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
