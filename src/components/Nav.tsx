import { useEffect, useState } from "react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-40 m-3 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? " backdrop-blur-xl border border-line rounded-full h-20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="ch-container flex h-20 items-center justify-between">
        <a href="#top" className="flex items-center">
          <img
            src="/logo.png"
            alt="Cogniheim"
            className="h-15 w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor
              className="text-[13px] font-medium tracking-wide text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-magnetic
          data-magnetic-strength="0.5"
          data-cursor="view"
          className="hidden rounded-full border border-line bg-surface px-5 py-2 text-[13px] font-medium text-text transition-all hover:border-accent/60 hover:bg-accent/10 md:inline-flex"
        >
          Start a project
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-text transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-text transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line bg-bg px-6 py-4 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-sm text-muted transition-colors hover:bg-surface hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
