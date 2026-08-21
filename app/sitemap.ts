import type { MetadataRoute } from 'next';

import { SEO_CONFIG } from './config/seo.config';
import { getAbsoluteUrl } from './utils/seo/get-absolute-url';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  if (!SEO_CONFIG.indexingEnabled) {
    return [];
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl('/'),
    },
    {
      url: getAbsoluteUrl('/services'),
    },
  ];

  return [...staticPages];
};

export default sitemap;
