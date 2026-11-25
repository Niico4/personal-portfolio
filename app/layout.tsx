import type { Metadata } from 'next';

import { cn } from '@/lib/utils';

import { SEO_CONFIG } from './config/seo.config';
import { monaSans, syne } from './fonts';

import '@/globals.css';

export const metadata: Metadata = {
  metadataBase: SEO_CONFIG.siteUrl,

  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },

  description: SEO_CONFIG.defaultDescription,
  applicationName: SEO_CONFIG.applicationName,

  authors: [
    {
      name: SEO_CONFIG.author.name,
      url: SEO_CONFIG.siteUrl,
    },
  ],

  creator: SEO_CONFIG.author.name,
  publisher: SEO_CONFIG.author.name,

  robots: {
    index: SEO_CONFIG.indexingEnabled,
    follow: SEO_CONFIG.indexingEnabled,
  },

  openGraph: {
    type: 'website',
    siteName: SEO_CONFIG.siteName,
    locale: SEO_CONFIG.locale,
    title: SEO_CONFIG.social.title,
    description: SEO_CONFIG.social.description,
    images: [SEO_CONFIG.defaultImage],
  },

  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.social.title,
    description: SEO_CONFIG.social.description,
    images: [SEO_CONFIG.defaultImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SEO_CONFIG.language}
      className={cn(
        'scrollbar-thin',
        'scrollbar-thumb-brand',
        'scrollbar-track-background',
        'hover:scrollbar-thumb-brand/95',
        monaSans.variable,
        syne.variable,
      )}
    >
      <body className="bg-background font-sans text-fg-default antialiased">
        {children}
      </body>
    </html>
  );
}
