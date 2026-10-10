import LegalPage from '../components/LegalPage';
import { CONTACT, FOUNDER, pageMetadata } from '../lib/site.js';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How the Cogniheim website handles personal information: what is collected, why, and how to contact the operator at info@cogniheim.com.',
  path: '/privacy',
});

const mail = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;

const SECTIONS = [
  {
    heading: 'Who operates this website',
    body: (
      <>
        <p>
          This website, cogniheim.com, is operated by Cogniheim, an early-stage, founder-led venture run by {FOUNDER.name}{' '}
          in Chennai, Tamil Nadu, India. Cogniheim is not currently a registered or incorporated company.
        </p>
        <p>Contact for any privacy question: {mail}.</p>
      </>
    ),
  },
  {
    heading: 'What information we collect',
    body: (
      <>
        <p>
          The website has no accounts, no sign-up and no payment features, and it does not use analytics or advertising
          trackers. It does not set cookies of its own.
        </p>
        <p>
          The only personal information we receive is what you choose to send us: if you email {mail} or use the contact
          form, we receive your name, email address and message.
        </p>
        <p>
          The contact form does not send data to a Cogniheim server. It opens your own email app with the message
          pre-filled, and nothing reaches us until you send that email.
        </p>
      </>
    ),
  },
  {
    heading: 'How we use it',
    body: (
      <>
        <p>We use messages you send only to read and reply to them, and to keep a record of the conversation.</p>
        <p>We do not sell personal information, and we do not use it for advertising.</p>
      </>
    ),
  },
  {
    heading: 'Third-party services',
    body: (
      <>
        <p>
          The website is served by a hosting provider, which, like any web host, may process technical data such as IP
          addresses and request logs to deliver the site and keep it secure. The site’s typeface is bundled with the
          site rather than loaded from an external font service.
        </p>
        <p>
          Links to external sites (for example GitHub, LinkedIn, Instagram and project sites) are governed by those
          sites’ own policies. Emails you send pass through your email provider and ours.
        </p>
      </>
    ),
  },
  {
    heading: 'Retention and your choices',
    body: (
      <>
        <p>
          We keep correspondence for as long as it is useful to the conversation or needed for our records. You can ask
          us to access, correct or delete what we hold about you by emailing {mail}.
        </p>
      </>
    ),
  },
  {
    heading: 'Cookies',
    body: <p>The site does not use non-essential cookies, so there is no cookie banner. If that changes, this page will be updated first.</p>,
  },
  {
    heading: 'Changes',
    body: (
      <p>
        We may update this policy as the website changes. The current version is always the one on this page.
        {/* Founder: add an "effective date" here only once a date is decided and reviewed. */}
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Privacy Policy"
      intro="What the Cogniheim website collects, why, and how to reach the operator about it."
      sections={SECTIONS}
    />
  );
}
