import type { MetadataRoute } from 'next';

import { SEO_CONFIG } from './config/seo.config';
import { getAbsoluteUrl } from './utils/seo/get-absolute-url';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    ...(SEO_CONFIG.indexingEnabled && {
      sitemap: getAbsoluteUrl('/sitemap.xml'),
    }),
  };
};

export default robots;
