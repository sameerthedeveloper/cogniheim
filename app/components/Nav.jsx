'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import gsap from 'gsap';
import { cn } from '../lib/utils.js';

// `spy` links point at homepage sections; the scroll-spy only highlights
// them when that section exists on the current page.
const LINKS = [
  { href: '/#work', spy: '#work', label: 'Work' },
  { href: '/#capabilities', spy: '#capabilities', label: 'Capabilities' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
];

const CTA = { href: '/contact', label: 'Contact' };
const SPIED = LINKS.filter((l) => l.spy);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const listRef = useRef(null);
  const indicatorRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const mobileListRef = useRef(null);
  const tlRef = useRef(null);
  const hasToggled = useRef(false);

  // Scroll-spy: highlight whichever section currently owns the middle
  // band of the viewport.
  useEffect(() => {
    const sections = SPIED.map((l) => document.querySelector(l.spy)).filter(Boolean);
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

    const target = active && list.querySelector(`a[data-spy="${active}"]`);
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

  // The mobile panel expands and collapses with GSAP. One timeline at a
  // time: a new toggle kills the one in flight, so a quick open-close-open
  // tap sequence continues from wherever the panel currently is instead of
  // stacking tweens that fight over its height.
  useEffect(() => {
    const panel = mobilePanelRef.current;
    if (!panel) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = gsap.utils.toArray('[data-mobile-item]', mobileListRef.current);

    tlRef.current?.kill();

    // First render, menu closed: nothing to animate, just make sure it's hidden.
    if (!hasToggled.current && !open) {
      gsap.set(panel, { display: 'none', height: 0, opacity: 0 });
      return;
    }
    hasToggled.current = true;

    // Reduced motion: state change only. Display must be set too, or the
    // Tailwind `hidden` class keeps the open panel invisible.
    if (reducedMotion) {
      gsap.set(panel, { display: open ? 'block' : 'none', height: open ? 'auto' : 0, opacity: open ? 1 : 0 });
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    if (open) {
      gsap.set(panel, { display: 'block' });
      const tl = gsap.timeline();
      tl.to(panel, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }).fromTo(
        items,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power3.out', overwrite: 'auto' },
        '-=0.25'
      );
      tlRef.current = tl;
    } else {
      const tl = gsap.timeline({ onComplete: () => gsap.set(panel, { display: 'none' }) });
      tl.to(items, { opacity: 0, y: -6, duration: 0.15, stagger: { each: 0.02, from: 'end' }, ease: 'power2.in', overwrite: 'auto' }).to(
        panel,
        { height: 0, opacity: 0, duration: 0.3, ease: 'power3.inOut' },
        '-=0.08'
      );
      tlRef.current = tl;
    }
  }, [open]);

  useEffect(() => () => tlRef.current?.kill(), []);

  // Close the menu the way people expect: Escape, a tap outside the header,
  // or the viewport growing to desktop width (where the panel is hidden but
  // `open` would otherwise stay true).
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e) => e.key === 'Escape' && close();
    const onPointer = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) close();
    };
    const mq = window.matchMedia('(min-width: 768px)');
    const onMq = (e) => e.matches && close();

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-4 top-4 z-50 mx-auto w-auto max-w-5xl border border-white/10 bg-noir/90  shadow-[0_8px_30px_-14px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:inset-x-10 sm:top-6 sm:px-0',
        // Constant radius: at the 56px closed height 28px is a full pill, and
        // it stays smooth while the panel grows (a class swap here snapped).
        'flex flex-col rounded-[28px]',
      )}
    >
<nav
  ref={navRef}
  className="mx-auto flex h-14 w-full max-w-full items-center justify-between px-5 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr] md:pl-4 md:pr-2"
>
        <Link
          href="/"
          data-nav-item
          className="relative flex shrink-0 items-center justify-center md:justify-self-start mt-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt="Cogniheim"
            className="h-10 w-auto object-contain transition-transform duration-200 hover:scale-105"
          />
        </Link>

        <ul ref={listRef} className="relative hidden items-center gap-8 md:flex md:justify-self-center">
          <span
            ref={indicatorRef}
            className="pointer-events-none absolute -bottom-2.25 left-0 h-0.5 rounded-full bg-accent opacity-0"
          />
          {LINKS.map((link) => (
            <li key={link.href} data-nav-item>
              <Link
                href={link.href}
                data-spy={link.spy}
                className={`text-[13px] transition-colors ${
                  active === link.spy ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
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
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" aria-hidden="true" />
          </a>

          <Link
            href={CTA.href}
            data-nav-item
            className="magnetic rounded-full bg-accent-strong px-5 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            {CTA.label}
          </Link>
        </div>

        <button
          type="button"
          data-nav-item
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="-m-2.5 rounded-full p-2.5 text-white md:hidden"
        >
          <span className="relative block h-5 w-5" aria-hidden="true">
            <Menu
              className={cn(
                'absolute inset-0 h-5 w-5 transition-[opacity,transform] duration-300 motion-reduce:transition-none',
                open ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100',
              )}
            />
            <X
              className={cn(
                'absolute inset-0 h-5 w-5 transition-[opacity,transform] duration-300 motion-reduce:transition-none',
                open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0',
              )}
            />
          </span>
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </nav>

      <div id="mobile-nav" ref={mobilePanelRef} className="hidden w-full overflow-hidden md:hidden" style={{ height: 0, opacity: 0 }}>
        <ul ref={mobileListRef} className="flex flex-col gap-1 border-t border-white/10 px-5 pb-5 pt-4">
          {LINKS.map((link) => (
            <li key={link.href} data-mobile-item>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-3 text-base ${active === link.spy ? 'text-accent' : 'text-white/80'}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li data-mobile-item className="pt-2">
            <Link
              href={CTA.href}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center rounded-full bg-accent-strong text-base font-medium text-white"
            >
              {CTA.label}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
