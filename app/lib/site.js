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

/** Bump when page content changes materially; feeds sitemap lastModified and JSON-LD dateModified. */
export const LAST_UPDATED = '2026-11-08';

/** Services offered, as structured data (Organization.makesOffer). Mirrors the home page. */
export const SERVICES_SEO = [
  ['Product strategy', 'Testing an idea before building: who it is for, the smallest version that proves it, and what is likely to fail.'],
  ['Product design', 'Interface and product design that makes complicated software feel obvious to use.'],
  ['Software engineering', 'Production web applications with sound architecture, tests where they matter and clear documentation.'],
  ['SaaS development', 'Sign-in, billing, multi-tenancy and the infrastructure that SaaS products need to survive real users.'],
];

export const KNOWS_ABOUT = [
  'Web application development',
  'SaaS product development',
  'Product design',
  'Next.js',
  'React',
  'Firebase',
  'Amazon Web Services',
  'Tailwind CSS',
];

export const BRAND = {
  name: 'Cogniheim',
  tagline: 'Web product and SaaS studio in Chennai',
  slogan: 'World of Thinkers',
  description:
    'Cogniheim is a founder-led software studio in Chennai, India, building web products, SaaS applications and practical digital tools.',
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
  eyebrow: 'Contact',
  title: 'Tell us what you want to build.',
  description:
    'Share a few lines about the problem and where you are. You will get a reply from the founder, not a sales queue.',
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
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/logo.webp`,
    contentUrl: `${SITE_URL}/logo.webp`,
    caption: BRAND.name,
  },
  image: `${SITE_URL}/opengraph-image`,
  slogan: BRAND.slogan,
  email: CONTACT.email,
  description: BRAND.description,
  knowsAbout: KNOWS_ABOUT,
  areaServed: 'Worldwide',
  address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: CONTACT.email,
    url: `${SITE_URL}/contact`,
    availableLanguage: ['English'],
  },
  founder: { '@id': `${SITE_URL}/#founder` },
  makesOffer: SERVICES_SEO.map(([name, description]) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name, description, provider: { '@id': `${SITE_URL}/#organization` } },
  })),
  sameAs: SOCIAL_LINKS.filter((l) => l.label !== 'GitHub').map((l) => l.href),
};

export const FOUNDER_NODE = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#founder`,
  name: FOUNDER.name,
  jobTitle: FOUNDER.role,
  description: FOUNDER.bio,
  knowsAbout: KNOWS_ABOUT,
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
  inLanguage: 'en-IN',
  description: BRAND.description,
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

/** What each status means, in plain words. Shown on /products and in the project modal. */
export const STATUS_NOTE = {
  Live: 'Publicly accessible.',
  Prototype: 'An interactive demo using sample data. Not publicly released.',
  'In development': 'Being built. Not yet released.',
  Planning: 'Being planned. Not yet built or released.',
};

export const WORK = [
  {
    name: 'CinemaFocus',
    slug: 'cinemafocus',
    href: 'https://cinemafocus.in',
    image: '/projects/cinemafocus-showroom.webp',
    summary:
      'An image-forward, editorial site for a premium home-cinema and hi-fi audio brand, built to hold up next to its physical showrooms.',
    category: 'Digital Product',
    kind: 'site',
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
    image: '/projects/recordlab-editor.webp',
    summary:
      'A lab-record builder for engineering students: type the aim, algorithm and code once, get a print-ready fair copy.',
    category: 'Education / Productivity',
    appCategory: 'EducationalApplication',
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
    appCategory: 'BusinessApplication',
    stack: ['JavaScript', 'Tailwind CSS', 'Puter.js'],
    description:
      "GROS connects a local business's products, website, search presence, feedback and conversations into one growth layer. GROS is in planning. An early interactive prototype explored a business overview, SEO checks, a product shelf, AI-assisted feedback analysis and an enquiry queue. Messaging channels, payments, shipping and marketplace integrations are planned, not built.",
    highlight: 'In planning — commerce integrations come later',
    status: 'Planning',
  },
  {
    name: 'ClearBiz',
    slug: 'clearbiz',
    brand: 'by Cogniheim',
    href: 'https://clearbiz.cogniheim.com',
    // Real dashboard capture; payment amounts masked.
    image: '/projects/clearbiz-dashboard.webp',
    summary:
      'A simple workspace for small businesses to run their day-to-day — invoices, quotes, expenses, customers and reports in one place.',
    category: 'Business Management / SaaS',
    appCategory: 'BusinessApplication',
    stack: ['Vite', 'React', 'Firebase', 'Tailwind CSS'],
    description:
      'ClearBiz is a business management app for small and local businesses: one simple workspace for invoices, quotes, expenses, customers, vendors, banking, accounting and reports, instead of scattered spreadsheets and notebooks. It is live now.',
    highlight: 'Live at clearbiz.cogniheim.com',
    status: 'Live',
  },
  {
    name: 'CloudBase',
    slug: 'cloudbase',
    brand: 'by Cogniheim',
    // Real capture of the Projects screen; AWS account IDs masked.
    image: '/projects/cloudbase-explorer.webp',
    summary: 'A read-only AWS explorer: see your Lambda, S3, DynamoDB and other resources in one visual workspace.',
    category: 'Cloud / Developer Tools',
    appCategory: 'DeveloperApplication',
    stack: [],
    description:
      'CloudBase connects to an AWS account and shows only the services and items you choose. Group them into projects, browse one at a time or across all of them, and see Lambda, API Gateway, DynamoDB, S3, CloudFront, Cognito, IAM and CloudWatch without living in the AWS console. CloudBase only reads: it never changes anything in AWS. It is in development, with no public release yet.',
    highlight: 'Read-only by design',
    status: 'In development',
  },
];

/**
 * Structured data for one project. Client sites are a CreativeWork; Cogniheim's
 * own products are a WebApplication. Unreleased products carry no `url`, and
 * nothing here states a price, rating or user count (none is verified).
 */
export function projectNode(p) {
  const base = {
    '@id': `${SITE_URL}/products#${p.slug}`,
    name: p.name,
    description: `${p.summary} Status: ${p.status}.`,
    image: `${SITE_URL}${p.image}`,
    creator: { '@id': `${SITE_URL}/#organization` },
    ...(p.href ? { url: p.href } : {}),
  };
  if (p.kind === 'site') return { '@type': 'CreativeWork', ...base };
  return {
    '@type': 'WebApplication',
    ...base,
    applicationCategory: p.appCategory,
    operatingSystem: 'Web',
    ...(p.stack?.length ? { keywords: p.stack.join(', ') } : {}),
    author: { '@id': `${SITE_URL}/#organization` },
  };
}

/** Home page WebPage node: names the main entity and marks the passages voice assistants may read aloud. */
export const HOME_PAGE_NODE = {
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: `${BRAND.name} | ${BRAND.tagline}`,
  description: BRAND.description,
  inLanguage: 'en-IN',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  primaryImageOfPage: { '@id': `${SITE_URL}/#logo` },
  dateModified: LAST_UPDATED,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#top h1', '.hero-description', '#faq'] },
};

/* -------------------------------------------------------------------------- */
/* FAQ — shared by the visible accordion, FAQPage JSON-LD and llms.txt        */
/* -------------------------------------------------------------------------- */

export const FAQ_ITEMS = [
  {
    question: 'What is Cogniheim?',
    answer:
      'A founder-led software venture in Chennai, India. We design and build web products and SaaS, from strategy to shipped code.',
  },
  {
    question: 'What has Cogniheim built?',
    answer:
      'CinemaFocus (a client site for a home-cinema and hi-fi audio brand), Record Lab (a lab-record builder for engineering students) and ClearBiz (a business management app) are live. CloudBase, a read-only AWS explorer, is in development, and GROS, a growth workspace for local businesses, is in planning.',
  },
  {
    question: 'How is Cogniheim different from a typical agency?',
    answer:
      'There are no handoffs between strategist, designer and developer. The person shaping your product is the person building it.',
  },
  {
    question: 'Do you build only websites, or full products?',
    answer:
      'Full products: web apps, SaaS platforms, and the infrastructure behind them, including sign-in, databases, hosting and billing.',
  },
  {
    question: 'Which technologies does Cogniheim use?',
    answer:
      'Mostly Next.js, React, Vite, TypeScript and Tailwind CSS on the front end, with Firebase and AWS behind them. We choose the stack that fits the product.',
  },
  {
    question: "What's the typical project timeline?",
    answer:
      'It depends on scope. A focused MVP usually takes weeks, not months. You get a real estimate after the first conversation, not a generic range.',
  },
  {
    question: 'Do you work with early-stage founders?',
    answer:
      'Yes, and with established companies too. Early-stage work is where getting the thinking right before the build matters most.',
  },
  {
    question: 'Who founded Cogniheim?',
    answer: 'Cogniheim was founded by Mohamed Sameer S and is based in Chennai, Tamil Nadu, India.',
  },
  {
    question: 'Is Cogniheim a registered company?',
    answer:
      'Not yet. Cogniheim is an early-stage, bootstrapped, founder-led venture with no outside funding. It is not an incorporated company, and formal registration is still under consideration.',
  },
  {
    question: 'How do we start?',
    answer: 'Email us or use the form below. The first step is a conversation, not a contract.',
  },
];
