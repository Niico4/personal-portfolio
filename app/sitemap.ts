import type { MetadataRoute } from 'next';

import { getWikiSitemap } from '@/(pages)/wiki/lib/wiki-data';
import { getWikiNotePath } from '@/(pages)/wiki/lib/wiki-format';

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
    {
      url: getAbsoluteUrl('/wiki'),
    },
  ];

  let wikiPages: MetadataRoute.Sitemap = [];

  try {
    const { notebooks, notes } = await getWikiSitemap();
    const notebooksById = new Map(
      notebooks.map((notebook) => [notebook.id, notebook]),
    );

    wikiPages = [
      ...notebooks.map((notebook) => ({
        url: getAbsoluteUrl(`/wiki/${notebook.slug}`),
        ...(notebook.updatedAt
          ? { lastModified: new Date(notebook.updatedAt) }
          : {}),
      })),
      ...notes.flatMap((note) => {
        const notebook = notebooksById.get(note.notebookId);

        if (!notebook) {
          return [];
        }

        return [
          {
            url: getAbsoluteUrl(getWikiNotePath(notebook.slug, note.slug)),
            lastModified: new Date(note.updatedAt),
          },
        ];
      }),
    ];
  } catch {
    // Keep the rest of the portfolio discoverable during a Notion outage.
  }

  return [...staticPages, ...wikiPages];
};

export default sitemap;
