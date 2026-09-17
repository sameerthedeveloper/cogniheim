import { useState, useEffect, useRef } from "react";
import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";
import { MessageCircle, Plus, ArrowRight, Copy, Check } from "lucide-react";
import { FloatIcon } from "./FloatIcon";

const EMAIL = "hello@cogniheim.com";

export function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { contact } = content;
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [shimmer, setShimmer] = useState(false);

  // trigger shimmer once heading scrolls into view
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShimmer(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable; the mailto link still works
    }
  };

  return (
    <section
      id="contact"
      className="ch-section relative"
    >
      <FloatIcon icon={MessageCircle} float="bob" size={24} className="pointer-events-none absolute right-[12%] top-[18%] hidden text-accent/20 lg:block" />
      <FloatIcon icon={Plus} float="drift" delay={0.3} size={18} className="pointer-events-none absolute bottom-[20%] right-[24%] hidden text-muted/25 lg:block" />
      <div ref={ref} className="ch-container flex flex-col items-start">
        <h2
          ref={headingRef}
          data-reveal
          className={`font-display max-w-2xl text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.1] text-text ${shimmer ? "ch-shimmer" : ""}`}
        >
          {contact.heading}
        </h2>
        <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          {contact.sub}
        </p>
        <div data-reveal className="mt-12 flex flex-wrap items-center gap-4">
          <a
            data-magnetic
            data-cursor="interact"
            href={`mailto:${EMAIL}`}
            className="ch-btn-glow group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-[15px] font-medium text-[#04140f]"
          >
            {contact.cta}
            <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            data-cursor="interact"
            aria-label={copied ? "Email copied" : `Copy ${EMAIL}`}
            className="ch-btn-outline-glow group inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] px-6 py-4 text-[15px] font-medium text-text"
          >
            <span className="tabular-nums">{copied ? "Copied" : EMAIL}</span>
            {copied ? (
              <Check size={15} strokeWidth={2} className="text-accent" />
            ) : (
              <Copy size={15} strokeWidth={2} className="text-muted transition-colors duration-300 group-hover:text-accent" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
