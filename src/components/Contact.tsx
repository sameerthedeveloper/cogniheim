import { useReveal } from "../lib/useReveal";
import { useContent } from "../content/ContentContext";
import { PlusDoodle, RingDoodle } from "./Doodles";

export function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  const { contact } = content;

  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col justify-center border-t border-line py-24"
    >
      <RingDoodle className="pointer-events-none absolute right-[12%] top-[18%] hidden text-accent/30 lg:block" />
      <PlusDoodle className="pointer-events-none absolute bottom-[20%] right-[24%] hidden text-muted/30 lg:block" delay={0.3} />
      <div ref={ref} className="ch-container flex flex-col items-start">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          {contact.eyebrow}
        </p>
        <h2
          data-reveal
          className="font-display mt-8 max-w-2xl text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.1] text-text"
        >
          {contact.heading}
        </h2>
        <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          {contact.sub}
        </p>
        <a
          data-reveal
          data-magnetic
          data-cursor="view"
          href="mailto:hello@cogniheim.com"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-[15px] font-medium text-[#04140f] transition-transform"
        >
          {contact.cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
