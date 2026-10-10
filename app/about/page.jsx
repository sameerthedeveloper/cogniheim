import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import { Button } from '../components/ui/button';
import {
  BRAND,
  CONTACT,
  FOUNDER,
  FOUNDER_NODE,
  ORGANIZATION_NODE,
  SITE_URL,
  SOCIAL_LINKS,
  WEBSITE_NODE,
  breadcrumbNode,
  pageMetadata,
} from '../lib/site.js';

const description =
  'Cogniheim is an early-stage, founder-led software venture in Chennai, India, started by Mohamed Sameer S to build practical, reliable web products and SaaS.';

export const metadata = pageMetadata({ title: 'About', description, path: '/about' });

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_NODE,
    FOUNDER_NODE,
    WEBSITE_NODE,
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#page`,
      url: `${SITE_URL}/about`,
      name: 'About Cogniheim',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/about#breadcrumb` },
    },
    breadcrumbNode('About', '/about'),
  ],
};

const FACTS = [
  ['Name', BRAND.name],
  ['Founder', FOUNDER.name],
  ['Location', BRAND.location],
  ['Stage', BRAND.stage],
  ['Legal status', 'Not yet formally registered as a company'],
  ['External funding', 'None'],
  ['Website', 'cogniheim.com'],
  ['Email', CONTACT.email],
];

const FOCUS = [
  ['Software development', 'Custom software and modern web applications, from first prototype to production.'],
  ['SaaS products', "Cogniheim's own products, currently GROS and ClearBiz, plus the infrastructure SaaS needs."],
  ['Business software', 'Practical tools that replace scattered spreadsheets and manual workflows.'],
  ['AI-powered features', 'Useful, grounded AI capabilities inside products — only where they solve a real problem.'],
];

const github = SOCIAL_LINKS.find((l) => l.label === 'GitHub');

export default function AboutPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />

      <PageHero eyebrow="ABOUT COGNIHEIM" title="Practical software, built by the person who designs it.">
        <p>
          Cogniheim is an early-stage, founder-led software venture based in Chennai, India, building web products,
          SaaS applications and useful digital tools.
        </p>
      </PageHero>

      <section aria-labelledby="story-heading" className="bg-surface-2 px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-wide gap-10 lg:grid-cols-[0.75fr_1.5fr] lg:gap-20">
          <h2 id="story-heading" className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Our story
          </h2>
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-muted">
            <p>
              Cogniheim is an early-stage, founder-led software venture established to build practical, reliable, and
              thoughtfully designed digital products.
            </p>
            <p>
              We focus on software development, web applications, SaaS products, and useful technology that solves
              real problems.
            </p>
          </div>
        </div>

        <ul className="mx-auto mt-14 grid max-w-wide gap-4 sm:grid-cols-2">
          {FOCUS.map(([title, body]) => (
            <li key={title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="founder-heading" className="px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-wide gap-10 lg:grid-cols-[0.75fr_1.5fr] lg:gap-20">
          <h2 id="founder-heading" className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Founder
          </h2>
          <div className="max-w-2xl">
            <p className="text-2xl font-semibold tracking-tight text-ink">{FOUNDER.name}</p>
            <p className="mt-1 text-muted">
              {FOUNDER.role}, Cogniheim · {FOUNDER.location}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">{FOUNDER.bio}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-accent-hover">
              <li>
                <a
                  href={FOUNDER.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                >
                  Personal website
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                >
                  GitHub
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="stage-heading" className="bg-surface-2 px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-wide gap-10 lg:grid-cols-[0.75fr_1.5fr] lg:gap-20">
          <h2 id="stage-heading" className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Current stage
          </h2>
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-muted">
              Cogniheim is an early-stage, founder-led, bootstrapped venture with no external funding. It is not yet
              a registered or incorporated company.
            </p>
            <dl className="mt-10 divide-y divide-line rounded-2xl border border-line bg-surface">
              {FACTS.map(([term, value]) => (
                <div key={term} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-sm text-faint">{term}</dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button as={Link} href="/products">
                See the products
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button as={Link} href="/contact" variant="ghost">
                Contact Cogniheim
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
