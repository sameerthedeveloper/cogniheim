import { faGithub, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

/*
 * Single source of truth for Cogniheim's public identity. Every page, the
 * footer, the metadata and the structured data read from here so the name,
 * founder, location and contact details can never drift apart.
 *
 * Nothing here claims a legal entity, registration number, funding,
 * customer count or founding date — none of those is verified.
 */

export const SITE_URL = 'https://cogniheim.com';

export const BRAND = {
  name: 'Cogniheim',
  tagline: 'Independent software & product studio',
  description:
    'Cogniheim is a founder-led software venture based in Chennai, India, building modern web products, SaaS applications, and practical digital tools for businesses and individuals.',
  location: 'Chennai, Tamil Nadu, India',
  stage: 'Early-stage, founder-led, bootstrapped',
};

export const FOUNDER = {
  name: 'Mohamed Sameer S',
  role: 'Founder',
  location: 'Chennai, Tamil Nadu, India',
  // Founder's personal site, already linked from the original footer.
  // No personal LinkedIn URL is verifiable from the repository.
  href: 'https://mohamedsameer.tech',
  bio: 'Mohamed Sameer S is a software developer and the founder of Cogniheim. He focuses on building modern web applications, SaaS products, and practical software solutions, with an emphasis on thoughtful user experience, reliable engineering, and maintainable technology.',
};

export const CONTACT = {
  email: 'info@cogniheim.com',
};

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cogniheim', icon: faLinkedinIn },
  { label: 'Instagram', href: 'https://www.instagram.com/cogniheim', icon: faInstagram },
  { label: 'GitHub', href: 'https://github.com/sameerthedeveloper', icon: faGithub },
];

export const FOOTER_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const LEGAL_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

/** Pages that appear in the sitemap. Keep in sync with app/sitemap.ts. */
export const PAGES = [
  { path: '/', priority: 1 },
  { path: '/about', priority: 0.8 },
  { path: '/products', priority: 0.8 },
  { path: '/contact', priority: 0.7 },
  { path: '/privacy', priority: 0.3 },
  { path: '/terms', priority: 0.3 },
];

/**
 * Per-page metadata. A child `openGraph` replaces the layout's wholesale in
 * Next, so the shared fields are repeated here on purpose.
 */
export function pageMetadata({ title, description, path }) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      siteName: BRAND.name,
      title: `${title} | ${BRAND.name}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${BRAND.name}`,
      description,
    },
  };
}

/** Structured-data nodes. Plain `Organization` — never Corporation/LLC. */
export const ORGANIZATION_NODE = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  email: CONTACT.email,
  description: BRAND.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
  founder: { '@id': `${SITE_URL}/#founder` },
  sameAs: SOCIAL_LINKS.filter((l) => l.label !== 'GitHub').map((l) => l.href),
};

export const FOUNDER_NODE = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#founder`,
  name: FOUNDER.name,
  jobTitle: FOUNDER.role,
  url: FOUNDER.href,
  worksFor: { '@id': `${SITE_URL}/#organization` },
  address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
  sameAs: [SOCIAL_LINKS.find((l) => l.label === 'GitHub').href],
};

export const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BRAND.name,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

/** BreadcrumbList for a secondary page (Google: breadcrumb structured data). */
export function breadcrumbNode(name, path) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${path}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: BRAND.name, item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

/** FAQPage node built from visible `{ question, answer }` items. */
export function faqNode(items) {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    url: SITE_URL,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* PROJECTS                                                                   */
/* -------------------------------------------------------------------------- */

export const WORK = [
  {
    name: 'CinemaFocus',
    slug: 'cinemafocus',
    href: 'https://cinemafocus.in',
    image: '/projects/cinemafocus.webp',
    summary:
      'An image-forward, editorial site for a premium home-cinema and hi-fi audio brand, built to hold up next to its physical showrooms.',
    category: 'Digital Product',
    stack: ['Next.js', 'Tailwind CSS', 'AWS'],
    description:
      'A premium home-cinema and hi-fi audio brand needed a web experience that matched the craftsmanship of the hardware it sells — most competitors in this space look like generic e-commerce templates. We built a clean, image-forward, editorial-feeling site on Next.js designed to hold up next to premium physical showrooms, not just look good in a browser.',
    highlight: 'Built to match a premium, craftsmanship-led brand',
    status: 'Live',
    featured: true,
  },
    {
    name: 'Record Lab',
    slug: 'record-lab',
    brand: 'by Cogniheim',
    href: 'https://record-lab.vercel.app',
    image: '/projects/recordlab.png',
    summary:
      'A lab-record builder for engineering students: type the aim, algorithm and code once, get a print-ready fair copy.',
    category: 'Education / Productivity',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    description:
      'Record Lab replaces rewriting lab records by hand. Students fill in one panel and watch it lay out on true A4 pages, with their register number watermarked behind every page. It exports to PDF, Word or print, turns program output into terminal-style screenshots (macOS, Linux, CMD, PowerShell), lets them customise the heading table borders, and keeps records in subject folders synced to their account. AI-assisted drafting helps with the aim, algorithm and viva questions. Built for Crescent CSE students.',
    highlight: 'Live, used for real lab-record season',
    status: 'Live',
  },
  {
    name: 'GROS',
    slug: 'gros',
    brand: 'by Cogniheim',
    // Real capture of the interactive prototype's Command view (demo data).
    image: '/projects/gros.webp',
    summary:
      'A growth workspace for local businesses — products, search presence, customer feedback and enquiries in one place.',
    category: 'Local Business / Commerce',
    stack: ['JavaScript', 'Tailwind CSS', 'Puter.js'],
    description:
      "GROS connects a local business's products, website, search presence, feedback and conversations into one growth layer. The current interactive prototype covers a business overview, SEO checks, a product shelf, AI-assisted feedback analysis and an enquiry queue. Messaging channels, payments, shipping and marketplace integrations are planned, not built.",
    highlight: 'Interactive prototype — commerce integrations are next',
    status: 'Prototype',
  },
  {
    name: 'ClearBiz',
    slug: 'clearbiz',
    brand: 'by Cogniheim',
    // Product overview artwork supplied for ClearBiz (concept visuals).
    image: '/projects/clearbiz.webp',
    summary:
      'A simple workspace for small businesses to run their day-to-day — invoices, quotes, expenses, customers and reports in one place.',
    category: 'Business Management / SaaS',
    stack: [],
    description:
      'ClearBiz is a business management app for small and local businesses: one simple workspace for invoices, quotes, expenses, customers, vendors, banking, accounting and reports, instead of scattered spreadsheets and notebooks. It is still in development.',
    status: 'In development',
  },
];
