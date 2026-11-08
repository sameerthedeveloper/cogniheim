import type { MetadataRoute } from 'next';
import { BRAND } from './lib/site.js';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: BRAND.name,
    description: BRAND.description,
    start_url: '/',
    display: 'browser',
    lang: 'en-IN',
    categories: ['business', 'productivity', 'technology'],
    background_color: '#f4f1ea',
    theme_color: '#f4f1ea',
    icons: [{ src: '/favico.png', type: 'image/png' }],
  };
}
