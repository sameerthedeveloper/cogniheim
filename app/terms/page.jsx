import LegalPage from '../components/LegalPage';
import { CONTACT, pageMetadata } from '../lib/site.js';

export const metadata = pageMetadata({
  title: 'Terms of Use',
  description: 'Terms for using the Cogniheim website: permitted use, intellectual property, and limitations.',
  path: '/terms',
});

const mail = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;

const SECTIONS = [
  {
    heading: 'About these terms',
    body: (
      <p>
        These terms apply to your use of cogniheim.com, operated by Cogniheim, an early-stage, founder-led venture based
        in Chennai, India that is not currently a registered or incorporated company. By using the site you agree to
        them. If you don’t agree, please don’t use the site.
      </p>
    ),
  },
  {
    heading: 'Permitted use',
    body: (
      <>
        <p>You may browse the site and share its pages for lawful, personal or business-evaluation purposes. Please don’t:</p>
        <ul>
          <li>attempt to disrupt, probe or gain unauthorised access to the site or its infrastructure;</li>
          <li>scrape the site in a way that harms its performance;</li>
          <li>use the contact details to send spam or unlawful content;</li>
          <li>present Cogniheim’s content or branding as your own or as an endorsement of you.</li>
        </ul>
      </>
    ),
  },
  {
    heading: 'Intellectual property',
    body: (
      <p>
        The Cogniheim name, logo, written content, design and code of this website belong to Cogniheim and its founder,
        except where noted. Third-party names, logos and project artwork (including client projects) belong to their
        respective owners. Open-source components remain under their own licences. Contact {mail} if you’d like to
        use any of this material.
      </p>
    ),
  },
  {
    heading: 'Project information',
    body: (
      <p>
        Descriptions of products and projects reflect their status when written. Products marked prototype or in
        development are not released, may change, and may never be released. Nothing on this site is an offer,
        quotation or contract; any engagement would be agreed separately and in writing.
      </p>
    ),
  },
  {
    heading: 'Disclaimers and limitation of liability',
    body: (
      <p>
        The site is provided “as is” and “as available”, without warranties of any kind. To the extent permitted by
        applicable law, Cogniheim is not liable for any loss arising from your use of, or inability to use, the site or
        from content on sites we link to. Nothing in these terms limits liability that cannot lawfully be limited.
      </p>
    ),
  },
  {
    heading: 'Governing law and changes',
    body: (
      <p>
        {/* Founder/lawyer: confirm governing-law and jurisdiction wording before relying on it. */}
        These terms are intended to be read under the laws of India. We may update them as the site changes; the version
        on this page is the current one. Questions: {mail}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Terms of Use"
      intro="The ground rules for using the Cogniheim website."
      sections={SECTIONS}
    />
  );
}
