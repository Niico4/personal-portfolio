import type { MetadataRoute } from 'next';

import { getProjectSlugs } from '@/sanity/lib/fetchers/project.fetcher';

import { SEO_CONFIG } from './config/seo.config';
import { getAbsoluteUrl } from './utils/seo/get-absolute-url';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  if (!SEO_CONFIG.indexingEnabled) {
    return [];
  }

  const projects = await getProjectSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl('/'),
    },
    {
      url: getAbsoluteUrl('/portfolio'),
    },
    {
      url: getAbsoluteUrl('/services'),
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map(({ slug }) => ({
    url: getAbsoluteUrl(`/portfolio/${slug}`),
  }));

  return [...staticPages, ...projectPages];
};

export default sitemap;
