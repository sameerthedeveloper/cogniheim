import PageShell from './PageShell';
import PageHero from './PageHero';

// Shared layout for the plain-language legal pages: a hero, a review notice,
// and a readable single column of titled sections.
export default function LegalPage({ eyebrow, title, intro, sections }) {
  return (
    <PageShell>
      <PageHero eyebrow={eyebrow} title={title}>
        <p>{intro}</p>
      </PageHero>

      <section className="bg-surface-2 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-muted" role="note">
            <strong className="font-semibold text-ink">Plain-language draft, not legal advice.</strong> This page is
            written to describe how the Cogniheim website actually works today. It has not been reviewed by a lawyer
            and is not a substitute for professional legal advice.
          </p>

          <div className="mt-12 space-y-12">
            {sections.map(({ heading, body }) => (
              <section key={heading} aria-labelledby={`h-${heading.replace(/\W+/g, '-').toLowerCase()}`}>
                <h2
                  id={`h-${heading.replace(/\W+/g, '-').toLowerCase()}`}
                  className="text-2xl font-semibold tracking-tight text-ink"
                >
                  {heading}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-muted [&_a]:text-accent-hover [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc">
                  {body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
