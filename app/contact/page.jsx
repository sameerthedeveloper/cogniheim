import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import ContactForm from '../components/ContactForm';
import {
  BRAND,
  CONTACT,
  FOUNDER,
  FOUNDER_NODE,
  ORGANIZATION_NODE,
  SITE_URL,
  WEBSITE_NODE,
  breadcrumbNode,
  pageMetadata,
} from '../lib/site.js';

const description =
  'Contact Cogniheim, a founder-led software venture in Chennai, India. Email info@cogniheim.com or send a message about a project, product or collaboration.';

export const metadata = pageMetadata({ title: 'Contact', description, path: '/contact' });

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_NODE,
    FOUNDER_NODE,
    WEBSITE_NODE,
    {
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#page`,
      url: `${SITE_URL}/contact`,
      name: 'Contact Cogniheim',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/contact#breadcrumb` },
    },
    breadcrumbNode('Contact', '/contact'),
  ],
};

const DETAILS = [
  ['Business', BRAND.name],
  ['Founder', FOUNDER.name],
  ['Location', BRAND.location],
  ['Website', SITE_URL.replace('https://', ''), SITE_URL],
  ['Email', CONTACT.email, `mailto:${CONTACT.email}`],
];

export default function ContactPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />

      <PageHero eyebrow="CONTACT" title="Contact Cogniheim.">
        <p>
          The quickest way to reach Cogniheim is email. Tell us the problem, the constraint, or the idea you&apos;re
          weighing and we&apos;ll reply personally.
        </p>
      </PageHero>

      <section aria-labelledby="contact-form-heading" className="bg-noir px-5 py-24 text-white sm:px-8">
        <div className="mx-auto max-w-wide">
          <ContactForm
            email={CONTACT.email}
            intro={
              <>
                <h2 id="contact-form-heading" className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  Send a message
                </h2>
                <p className="mt-4 max-w-xl text-white/60">
                  There is no server behind this form. Submitting opens your own email app with the message filled in,
                  and nothing is sent until you press send there.
                </p>
              </>
            }
            aside={
              <dl className="divide-y divide-white/10 rounded-2xl border border-white/10">
                {DETAILS.map(([term, value, href]) => (
                  <div key={term} className="grid gap-1 px-5 py-4 sm:grid-cols-[6rem_1fr] sm:gap-4">
                    <dt className="text-sm text-white/55">{term}</dt>
                    <dd>
                      {href ? (
                        <a
                          href={href}
                          className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-accent"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            }
          />
        </div>
      </section>
    </PageShell>
  );
}
