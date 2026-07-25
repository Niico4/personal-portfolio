import type { Metadata } from 'next';
import { IconNotebookOff } from '@tabler/icons-react';

import { Heading } from '@/components/common/heading';
import { SEO_CONFIG } from '@/config/seo.config';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';
import { getAbsoluteUrl } from '@/utils/seo/get-absolute-url';

import { NotebookCard } from './components/notebook-card';
import { WikiJsonLd } from './components/wiki-json-ld';
import { WIKI_SEO_DEFAULTS } from './lib/wiki-contract';
import { getPublicNotebooks } from './lib/wiki-data';

export const runtime = 'nodejs';
export const revalidate = 300;

export const metadata: Metadata = createPageMetadata({
  title: WIKI_SEO_DEFAULTS.title,
  description: WIKI_SEO_DEFAULTS.description,
  path: '/wiki',
  image: WIKI_SEO_DEFAULTS.image,
});

const WikiPage = async () => {
  const notebooks = await getPublicNotebooks();
  const wikiUrl = getAbsoluteUrl('/wiki');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: WIKI_SEO_DEFAULTS.title,
        description: WIKI_SEO_DEFAULTS.description,
        url: wikiUrl,
        inLanguage: 'es-CO',
        image: getAbsoluteUrl(WIKI_SEO_DEFAULTS.image.url),
        author: {
          '@type': 'Person',
          name: SEO_CONFIG.siteName,
          url: getAbsoluteUrl('/'),
        },
        isPartOf: {
          '@type': 'WebSite',
          name: SEO_CONFIG.applicationName,
          url: getAbsoluteUrl('/'),
        },
        hasPart: notebooks.map((notebook) => ({
          '@type': 'CollectionPage',
          name: notebook.title,
          url: getAbsoluteUrl(`/wiki/${notebook.slug}`),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: getAbsoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Wiki',
            item: wikiUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto flex w-full flex-col gap-10 sm:gap-12 xl:relative xl:left-1/2 xl:w-[62rem] xl:-translate-x-1/2 2xl:w-[68rem]">
      <WikiJsonLd value={jsonLd} />

      <header className="max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
          Documentación personal
        </p>
        <Heading className="mt-3">Wiki</Heading>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-ink-200 sm:text-lg">
          {WIKI_SEO_DEFAULTS.description}
        </p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink-800 pt-5">
          <div className="min-w-24">
            <dt className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-300">
              Notebooks
            </dt>
            <dd className="mt-1 font-mono text-base font-medium text-ink-50">
              {notebooks.length}
            </dd>
          </div>
        </dl>
      </header>

      <section aria-labelledby="wiki-notebooks-title">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <h2
              id="wiki-notebooks-title"
              className="text-2xl font-bold tracking-[-0.025em] text-ink-50 sm:text-3xl"
            >
              Notebooks
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-300">
              Colecciones de notas organizadas por área de estudio.
            </p>
          </div>
        </div>

        {notebooks.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {notebooks.map((notebook, index) => (
              <li key={notebook.id}>
                <NotebookCard notebook={notebook} priority={index === 0} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-ink-700 bg-ink-900/20 px-6 py-12 text-center">
            <IconNotebookOff
              aria-hidden="true"
              className="mx-auto size-8 text-ink-400"
              stroke={1.5}
            />
            <h2 className="mt-4 text-lg font-semibold text-ink-100">
              Todavía no hay notebooks públicos
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-300">
              Cuando haya una colección lista para compartir, aparecerá aquí.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default WikiPage;
