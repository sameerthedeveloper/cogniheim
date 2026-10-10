import type { MetadataRoute } from 'next';
import { PAGES, SITE_URL } from './lib/site.js';

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority,
  }));
}
