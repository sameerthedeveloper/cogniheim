import './style.css';
import './sections.css';

export const metadata = {
  title: 'Mohamed Sameer S — Frontend Developer',
  description:
    "Mohamed Sameer S — frontend developer building real, live, offline-capable web apps. React, Next.js, Tailwind. Based in Chennai, open to internships.",
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- kept identical to the
            original index.html <link> intentionally, to guarantee zero visual diff rather
            than risk next/font's self-hosted output rendering subtly differently */}
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,400..900;1,62..125,400..900&family=Fraunces:ital,opsz,wght@0,9..144,400..500;1,9..144,500&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
