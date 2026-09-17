import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LINKS = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // entry animation
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: -20 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 },
    );
  }, []);

  return (
    <header
      ref={headerRef}
      style={{ visibility: "hidden" }}
      className={`fixed inset-x-0 mx-auto top-0 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "top-3 rounded-full border border-white/[0.08] bg-[rgba(13,13,14,0.7)] shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
          : "top-0 bg-transparent"
      }`}
    >
      <div className="flex h-[72px] items-center justify-between px-6 md:px-8">
        <a href="#top" className="flex items-center" data-cursor="nav">
          <img
            src="/logo.png"
            alt="Cogniheim"
            className="h-12 w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="nav"
              className="rounded-full px-4 py-1.5 text-[13px] font-medium tracking-wide text-muted/80 transition-colors duration-300 hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-magnetic
          data-magnetic-strength="0.4"
          data-cursor="interact"
          className="ch-btn-glow hidden rounded-full bg-accent px-6 py-2 text-[13px] font-medium text-[#04140f] md:inline-flex"
        >
          Start a project
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          data-cursor="interact"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-text transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-text transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/[0.06] bg-[rgba(13,13,14,0.9)] backdrop-blur-xl px-6 py-4 md:hidden rounded-b-2xl">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
