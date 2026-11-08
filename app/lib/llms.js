import {
  BRAND,
  CONTACT,
  FAQ_ITEMS,
  FOUNDER,
  KNOWS_ABOUT,
  LAST_UPDATED,
  SERVICES_SEO,
  SITE_URL,
  SOCIAL_LINKS,
  STATUS_NOTE,
  WORK,
} from './site.js';

/*
 * llms.txt and llms-full.txt are generated from the same data as the pages,
 * so what AI answer engines read can never drift from what visitors see.
 */

const facts = () =>
  [
    `- Name: ${BRAND.name}`,
    `- What it is: ${BRAND.description}`,
    `- Founder: ${FOUNDER.name} (${FOUNDER.href})`,
    `- Location: ${BRAND.location}`,
    `- Stage: ${BRAND.stage}. Not a registered or incorporated company. No external funding.`,
    `- Services: ${SERVICES_SEO.map(([n]) => n.toLowerCase()).join(', ')}`,
    `- Contact: ${CONTACT.email}`,
    `- Social: ${SOCIAL_LINKS.map((l) => l.href).join(', ')}`,
  ].join('\n');

export function llmsTxt() {
  return `# ${BRAND.name}

> ${BRAND.description} Founder: ${FOUNDER.name}. ${BRAND.name} is not yet a registered company and has no external funding.

## Key pages
- [Home](${SITE_URL}/): what ${BRAND.name} does, process, and FAQ
- [Products & Projects](${SITE_URL}/products): ${WORK.map((p) => `${p.name} (${p.status.toLowerCase()})`).join(', ')}
- [About](${SITE_URL}/about): story, focus areas and verified facts about the venture
- [Contact](${SITE_URL}/contact): email ${CONTACT.email} or send a message
- [Full text for LLMs](${SITE_URL}/llms-full.txt)
- [Privacy](${SITE_URL}/privacy)
- [Terms](${SITE_URL}/terms)

## Facts
${facts()}

Last updated: ${LAST_UPDATED}
`;
}

export function llmsFullTxt() {
  const projects = WORK.map(
    (p) =>
      `### ${p.name}${p.brand ? ` (${p.brand})` : ''}
- Status: ${p.status}. ${STATUS_NOTE[p.status] ?? ''}
- Category: ${p.category}
- Built with: ${p.stack?.length ? p.stack.join(', ') : 'not listed'}
- Link: ${p.href ?? 'no public link yet'}
- ${p.description}`,
  ).join('\n\n');

  const faq = FAQ_ITEMS.map(({ question, answer }) => `### ${question}\n${answer}`).join('\n\n');
  const services = SERVICES_SEO.map(([n, d]) => `- **${n}:** ${d}`).join('\n');

  return `# ${BRAND.name}: full reference

> ${BRAND.description}

Source: ${SITE_URL}. Last updated: ${LAST_UPDATED}. Everything below is also visible on the website; nothing here claims a legal entity, funding, customer count or founding date, because none is verified.

## Facts
${facts()}

## Topics
${KNOWS_ABOUT.join(', ')}

## Services
${services}

## Projects and products
${projects}

## Founder
${FOUNDER.bio}

## Frequently asked questions
${faq}
`;
}
