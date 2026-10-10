import { Footer } from './ui/footer-7';
import { BRAND, CONTACT, FOOTER_LINKS, FOUNDER, LEGAL_LINKS, SOCIAL_LINKS } from '../lib/site.js';

// One footer for every page, so the business identity reads identically
// everywhere: name, founder, location, email, domain.
export default function SiteFooter() {
  return (
    <Footer
      description={`${BRAND.tagline}. An early-stage, founder-led software venture building web products, SaaS and practical digital tools.`}
      founder={{ label: FOUNDER.name, href: '/about' }}
      location={BRAND.location}
      email={CONTACT.email}
      nav={FOOTER_LINKS}
      legal={LEGAL_LINKS}
      socials={SOCIAL_LINKS}
    />
  );
}
