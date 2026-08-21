// src/app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingChatBot } from '@/components/FloatingChatBot';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LanguageProvider } from '@/context/LanguageContext';
import { site } from '@/lib/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const description =
  'AI engineer specialising in retrieval-augmented generation and automation. Projects, writing, and an assistant that has read the whole site.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.shortName}`,
  },
  description,
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description,
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The inline script below and the language switcher both touch <html>,
    // so React is told not to flag the difference.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-canvas text-ink antialiased`}
      >
        {/* Enables the scroll-reveal CSS before anything paints. Without
            JavaScript the class is never added and content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-reveal')",
          }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#04211d]"
        >
          Skip to content
        </a>

        <LanguageProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />

          {/* Reachable from every page. */}
          <FloatingChatBot />
          <ScrollReveal />
        </LanguageProvider>
      </body>
    </html>
  );
}
