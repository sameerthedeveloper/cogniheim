import { Inter } from 'next/font/google';
import './globals.css';
import SiteEffects from './components/SiteEffects.jsx';
import CustomCursor from './components/CustomCursor.jsx';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://cogniheim.in'),
  applicationName: 'Cogniheim',
  title: {
    default: 'Cogniheim — Technology & Product Studio',
    template: '%s | Cogniheim',
  },
  description:
    'Cogniheim is a technology and product studio focused on building modern web products, software, and SaaS experiences.',
  keywords: [
    'Cogniheim',
    'technology product studio',
    'software development company',
    'SaaS development company',
    'web application development',
    'digital product development',
  ],
  authors: [{ name: 'S. Mohamed Sameer' }],
  creator: 'S. Mohamed Sameer',
  publisher: 'Cogniheim',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo.png',
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
    url: 'https://cogniheim.in',
    siteName: 'Cogniheim',
    title: 'Cogniheim — Technology & Product Studio',
    description:
      'Cogniheim is a technology and product studio focused on building modern web products, software, and SaaS experiences.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Cogniheim technology and product studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cogniheim — Technology & Product Studio',
    description:
      'Cogniheim is a technology and product studio focused on building modern web products, software, and SaaS experiences.',
    images: ['/logo.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
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
