import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import { StatusBadge } from '../components/ui/status-badge';
import { FOUNDER_NODE, ORGANIZATION_NODE, WEBSITE_NODE, SITE_URL, WORK, breadcrumbNode, pageMetadata } from '../lib/site.js';

const description =
  'Products and projects from Cogniheim, with an honest status for each: CinemaFocus (live client site), GROS (interactive prototype) and ClearBiz (in development).';

export const metadata = pageMetadata({ title: 'Products & Projects', description, path: '/products' });

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_NODE,
    FOUNDER_NODE,
    WEBSITE_NODE,
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/products#page`,
      url: `${SITE_URL}/products`,
      name: 'Cogniheim products and projects',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      breadcrumb: { '@id': `${SITE_URL}/products#breadcrumb` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: WORK.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CreativeWork',
            name: p.name,
            description: p.summary,
            image: `${SITE_URL}${p.image}`,
            creator: { '@id': `${SITE_URL}/#organization` },
            ...(p.href ? { url: p.href } : {}),
          },
        })),
      },
    },
    breadcrumbNode('Products & Projects', '/products'),
  ],
};

const STATUS_NOTE = {
  Live: 'Publicly accessible.',
  Prototype: 'An interactive demo using sample data. Not publicly released.',
  'In development': 'Being built. Not yet released.',
};

function altFor(project) {
  return project.slug === 'clearbiz'
    ? 'ClearBiz product overview artwork (concept visual)'
    : `${project.name} — ${project.category} project screenshot`;
}

export default function ProductsPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />

      <PageHero eyebrow="PRODUCTS & PROJECTS" title="What Cogniheim has built, and what it is building.">
        <p>
          Every project below is shown with its real status. Anything that is not publicly available yet is marked as
          such.
        </p>
      </PageHero>

      <section aria-label="Projects" className="bg-surface-2 px-5 py-20 sm:px-8 sm:py-24">
        <ul className="mx-auto grid max-w-wide gap-8 lg:grid-cols-1">
          {WORK.map((project, i) => (
            <li
              key={project.slug}
              className="grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-2"
            >
              <div className={`relative aspect-16/10 bg-noir ${i % 2 ? 'lg:order-2' : ''}`}>
                {project.image && (
                  <Image
                    src={project.image}
                    alt={altFor(project)}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={project.status} />
                  {project.category && <span className="text-sm text-faint">{project.category}</span>}
                </div>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{project.name}</h2>
                {project.brand && <p className="mt-1 text-sm text-faint">{project.brand}</p>}

                <p className="mt-5 leading-relaxed text-muted">{project.description}</p>
                <p className="mt-3 text-sm text-faint">{STATUS_NOTE[project.status]}</p>

                <dl className="mt-6 grid gap-1 text-sm sm:grid-cols-[6rem_1fr]">
                  <dt className="text-faint">Technologies</dt>
                  <dd className="text-ink">
                    {project.stack.length ? project.stack.join(' · ') : 'Not yet listed'}
                  </dd>
                </dl>

                <div className="mt-8">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 font-medium text-accent-hover underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                    >
                      Visit {project.href.replace('https://', '')}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-ink">No public link yet — forthcoming.</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-wide text-sm text-faint">
          Questions about a project?{' '}
          <Link href="/contact" className="text-accent-hover underline underline-offset-4">
            Get in touch
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
