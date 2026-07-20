import type { MetadataRoute } from 'next';

import { SEO_CONFIG } from './config/seo.config';
import { getAbsoluteUrl } from './utils/seo/get-absolute-url';

const robots = (): MetadataRoute.Robots => {
  if (!SEO_CONFIG.indexingEnabled) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: getAbsoluteUrl('/sitemap.xml'),
  };
};

export default robots;
