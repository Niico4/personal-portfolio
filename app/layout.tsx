import type { Metadata } from 'next';

import { dmSans } from './fonts';
import { SEO_CONFIG } from './config/seo.config';

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
      name: SEO_CONFIG.siteName,
    },
  ],

  creator: SEO_CONFIG.siteName,
  publisher: SEO_CONFIG.siteName,

  robots: SEO_CONFIG.indexingEnabled
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },

  openGraph: {
    type: 'website',
    locale: SEO_CONFIG.locale,
    siteName: SEO_CONFIG.siteName,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [SEO_CONFIG.defaultImage],
  },

  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [
      {
        url: SEO_CONFIG.defaultImage.url,
        alt: SEO_CONFIG.defaultImage.alt,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SEO_CONFIG.language} className="bg-main">
      <body
        className={`${dmSans.className} custom-theme min-h-dvh overflow-x-hidden overscroll-none bg-main text-ink-20 font-light antialiased`}
      >
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
