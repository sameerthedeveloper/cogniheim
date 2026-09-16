import { useReveal } from "../lib/useReveal";

export function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="border-t border-line py-28 md:py-40">
      <div ref={ref} className="ch-container flex flex-col items-start">
        <p data-reveal className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          Contact
        </p>
        <h2
          data-reveal
          className="font-display mt-8 max-w-2xl text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.1] text-text"
        >
          Have a problem worth solving?
        </h2>
        <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Tell us what you're trying to build, improve, or simplify.
        </p>
        <a
          data-reveal
          href="mailto:hello@cogniheim.com"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-[15px] font-medium text-[#04140f] transition-transform hover:scale-[1.03]"
        >
          Start a conversation
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
