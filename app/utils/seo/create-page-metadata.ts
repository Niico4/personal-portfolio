import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/config/seo.config';

type SeoPath = '/' | `/${string}`;

export type SeoImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

type CreatePageMetadataParams = {
  title: string;
  description: string;
  path: SeoPath;
  socialTitle?: string;
  image?: SeoImage;
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

export const createPageMetadata = ({
  title,
  description,
  path,
  socialTitle = title,
  image = SEO_CONFIG.defaultImage,
  absoluteTitle = false,
  noIndex = false,
}: CreatePageMetadataParams): Metadata => {
  const shouldIndex = SEO_CONFIG.indexingEnabled && !noIndex;

  return {
    title: absoluteTitle
      ? {
          absolute: title,
        }
      : title,

    description,

    alternates: {
      canonical: path,
    },

    robots: shouldIndex
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
      url: path,
      title: socialTitle,
      description,
      images: [image],
    },

    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [
        {
          url: image.url,
          alt: image.alt,
        },
      ],
    },
  };
};
