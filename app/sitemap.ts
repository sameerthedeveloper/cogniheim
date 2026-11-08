import type { MetadataRoute } from 'next';
import { LAST_UPDATED, PAGES, SITE_URL, WORK } from './lib/site.js';

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: LAST_UPDATED,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority,
    // Project screenshots are indexable assets of the products page.
    ...(path === '/products' ? { images: WORK.map((p: { image: string }) => `${SITE_URL}${p.image}`) } : {}),
  }));
}
