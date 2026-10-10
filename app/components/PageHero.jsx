// Opening block for secondary pages — same eyebrow / tight-tracked headline
// language as the homepage hero, without the full-height mesh.
export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-surface-3 px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
      <div className="mx-auto max-w-wide">
        <p className="reveal text-sm tracking-[0.2em] text-accent-hover">{eyebrow}</p>
        <h1 className="reveal mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {children && <div className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{children}</div>}
      </div>
    </section>
  );
}
