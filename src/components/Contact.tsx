import { useState } from "react";
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
      className="relative flex min-h-screen flex-col justify-center border-t border-line py-24"
    >
      <FloatIcon icon={MessageCircle} float="bob" size={30} className="pointer-events-none absolute right-[12%] top-[18%] hidden text-accent/30 lg:block" />
      <FloatIcon icon={Plus} float="drift" delay={0.3} size={22} className="pointer-events-none absolute bottom-[20%] right-[24%] hidden text-muted/40 lg:block" />
      <div ref={ref} className="ch-container flex flex-col items-start">
        <h2
          data-reveal
          className="font-display max-w-2xl text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.1] text-text"
        >
          {contact.heading}
        </h2>
        <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          {contact.sub}
        </p>
        <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
          <a
            data-magnetic
            data-cursor="view"
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-[15px] font-medium text-[#04140f] shadow-[0_0_0_0_rgba(57,185,176,0)] transition-all duration-300 hover:shadow-[0_8px_32px_-4px_rgba(57,185,176,0.45)]"
          >
            {contact.cta}
            <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            data-cursor="view"
            aria-label={copied ? "Email copied" : `Copy ${EMAIL}`}
            className="group inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-4 text-[15px] font-medium text-text transition-colors hover:border-accent/50"
          >
            <span className="tabular-nums">{copied ? "Copied" : EMAIL}</span>
            {copied ? (
              <Check size={15} strokeWidth={2} className="text-accent" />
            ) : (
              <Copy size={15} strokeWidth={2} className="text-muted transition-colors group-hover:text-accent" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
