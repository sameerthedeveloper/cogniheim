// Splits heading text into per-word spans so it can be revealed
// word-by-word on scroll (animations/sectionHeadings.js) — the same
// treatment the hero's headline uses on load, reused here as a
// scroll-triggered variant to tie the site's typographic language
// together across sections.
export default function SplitHeading({ text, as: Tag = 'h2', className }) {
  return (
    <Tag className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="section-word inline-block">
          {word}&nbsp;
        </span>
      ))}
    </Tag>
  );
}
