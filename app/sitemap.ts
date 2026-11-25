import type { MetadataRoute } from 'next';

import { getProjectList } from '@/sanity/lib/fetchers/project.fetcher';

import { SEO_CONFIG } from './config/seo.config';
import { getAbsoluteUrl } from './utils/seo/get-absolute-url';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  if (!SEO_CONFIG.indexingEnabled) {
    return [];
  }

  const projects = await getProjectList();

  return [
    { url: getAbsoluteUrl('/') },
    { url: getAbsoluteUrl('/projects') },

    ...projects.map(({ slug }) => ({
      url: getAbsoluteUrl(`/projects/${slug}`),
    })),
  ];
};

export default sitemap;
