import { Inter } from 'next/font/google';
import './globals.css';
import SiteEffects from './components/SiteEffects.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import { BRAND, FOUNDER, SITE_URL } from './lib/site.js';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const TITLE = `${BRAND.name} — ${BRAND.tagline}`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND.name,
  title: {
    default: TITLE,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  authors: [{ name: FOUNDER.name }],
  creator: FOUNDER.name,
  publisher: BRAND.name,
  icons: {
    icon: '/favico.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: BRAND.name,
    title: TITLE,
    description: BRAND.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: BRAND.description,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f1ea',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SiteEffects />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
