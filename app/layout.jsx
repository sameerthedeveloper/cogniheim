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
  title: 'Mohamed Sameer S — Frontend Developer',
  description:
    "I'm Mohamed Sameer S, a frontend developer building real, live, offline-capable web apps with React, Next.js, and Tailwind. Based in Chennai, open to internships.",
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
