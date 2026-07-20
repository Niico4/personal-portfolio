import 'server-only';

import { SEO_CONFIG } from '@/config/seo.config';

export type SitePath = '/' | `/${string}`;

export const getAbsoluteUrl = (path: SitePath): string => {
  return new URL(path, SEO_CONFIG.siteUrl).toString();
};
