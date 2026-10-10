import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/site.js';

// Search and AI answer-engine crawlers are welcome on all public pages.
// Listed explicitly so the policy is unambiguous to generative-search bots.
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/flute'] },
      { userAgent: AI_BOTS, allow: '/', disallow: ['/flute'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
