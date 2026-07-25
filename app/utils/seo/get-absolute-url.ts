import 'server-only';

import { SEO_CONFIG } from '@/config/seo.config';

export const getAbsoluteUrl = (pathOrUrl: string): string => {
  return new URL(pathOrUrl, SEO_CONFIG.siteUrl).toString();
};
