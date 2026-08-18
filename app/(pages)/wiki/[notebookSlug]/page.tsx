import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { IconArrowLeft, IconNotes } from '@tabler/icons-react';
import Link from 'next/link';

import { Heading } from '@/components/atoms/common/heading';
import { SEO_CONFIG } from '@/config/seo.config';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';
import { getAbsoluteUrl } from '@/utils/seo/get-absolute-url';

import { NoteExplorer } from '../components/note-explorer';
import { WikiBreadcrumbs } from '../components/wiki-breadcrumbs';
import { WikiImage } from '../components/wiki-image';
import { WikiJsonLd } from '../components/wiki-json-ld';
import { WIKI_SEO_DEFAULTS } from '../lib/wiki-contract';
import {
  getNotebookNotes,
  getPublicNotebook,
  getPublicNotebooks,
} from '../lib/wiki-data';
import { formatWikiDate, getWikiNotePath } from '../lib/wiki-format';

type NotebookPageProps = {
  params: Promise<{ notebookSlug: string }>;
};

export const runtime = 'nodejs';
export const revalidate = 300;

export const generateStaticParams = async () => {
  const notebooks = await getPublicNotebooks();
  return notebooks.map(({ slug }) => ({ notebookSlug: slug }));
};

export const generateMetadata = async ({
  params,
}: NotebookPageProps): Promise<Metadata> => {
  const { notebookSlug } = await params;
  const notebook = await getPublicNotebook(notebookSlug);

  if (!notebook) {
    notFound();
  }

  if (notebookSlug !== notebook.slug) {
    permanentRedirect(`/wiki/${notebook.slug}`);
  }

  return createPageMetadata({
    title: notebook.seo.title,
    description: notebook.seo.description,
    path: `/wiki/${notebook.slug}`,
    image: {
      url: `/seo/wiki/${notebook.slug}.png`,
      alt: notebook.seo.imageAlt,
      width: WIKI_SEO_DEFAULTS.image.width,
      height: WIKI_SEO_DEFAULTS.image.height,
    },
  });
};

const NotebookPage = async ({ params }: NotebookPageProps) => {
  const { notebookSlug } = await params;
  const notebook = await getPublicNotebook(notebookSlug);

  if (!notebook) {
    notFound();
  }

  if (notebookSlug !== notebook.slug) {
    permanentRedirect(`/wiki/${notebook.slug}`);
  }

  const notes = await getNotebookNotes(notebook.id);
  const updatedAt = formatWikiDate(notebook.updatedAt);
  const canonical = `/wiki/${notebook.slug}` as const;
  const canonicalUrl = getAbsoluteUrl(canonical);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: notebook.seo.title,
        headline: notebook.title,
        description: notebook.seo.description,
        url: canonicalUrl,
        inLanguage: 'es-CO',
        image: `/seo/wiki/${notebook.slug}.png`,
        ...(notebook.updatedAt ? { dateModified: notebook.updatedAt } : {}),
        author: {
          '@type': 'Person',
          name: SEO_CONFIG.siteName,
          url: getAbsoluteUrl('/'),
        },
        isPartOf: {
          '@type': 'CollectionPage',
          name: 'Wiki',
          url: getAbsoluteUrl('/wiki'),
        },
        hasPart: notes.map((note) => ({
          '@type': 'TechArticle',
          name: note.title,
          url: getAbsoluteUrl(getWikiNotePath(notebook.slug, note.slug)),
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
            item: getAbsoluteUrl('/wiki'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: notebook.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto flex w-full flex-col gap-10 sm:gap-12 xl:relative xl:left-1/2 xl:w-[62rem] xl:-translate-x-1/2 2xl:w-[68rem]">
      <WikiJsonLd value={jsonLd} />

      <WikiBreadcrumbs
        items={[
          { href: '/', label: 'Inicio' },
          { href: '/wiki', label: 'Wiki' },
          { label: notebook.title },
        ]}
      />

      <header>
        <Link
          href="/wiki"
          className="group mb-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-700/80 bg-ink-900/20 px-4 text-sm font-medium text-ink-200 outline-none transition-colors hover:border-ink-500 hover:bg-ink-900/60 hover:text-ink-50 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-main motion-reduce:transition-none"
        >
          <IconArrowLeft
            aria-hidden="true"
            size={17}
            className="transition-transform group-hover:-translate-x-0.5 motion-reduce:transform-none"
          />
          Volver a la Wiki
        </Link>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-stretch lg:gap-12">
          <div className="flex min-w-0 flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-300">
              Notebook
            </p>
            <Heading className="mt-3 max-w-[16ch] text-balance">
              {notebook.title}
            </Heading>
            <p className="mt-5 max-w-2xl text-pretty leading-8 text-ink-200 sm:text-lg">
              {notebook.description}
            </p>

            <dl className="mt-6 flex flex-wrap gap-x-7 gap-y-3 border-t border-ink-800 pt-4 text-xs">
              <div>
                <dt className="font-medium uppercase tracking-[0.12em] text-ink-300">
                  Contenido
                </dt>
                <dd className="mt-1 text-ink-200">
                  {notes.length === 1
                    ? '1 nota pública'
                    : `${notes.length} notas públicas`}
                </dd>
              </div>

              {updatedAt && (
                <div>
                  <dt className="font-medium uppercase tracking-[0.12em] text-ink-300">
                    Actualización
                  </dt>
                  <dd className="mt-1 text-ink-200">
                    <time dateTime={notebook.updatedAt ?? undefined}>
                      {updatedAt}
                    </time>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-ink-700/80 bg-ink-900 shadow-sm lg:aspect-auto lg:min-h-56">
            {notebook.cover ? (
              <WikiImage
                src={notebook.cover.url}
                alt=""
                priority
                sizes="(min-width: 1024px) 20rem, 100vw"
                className="object-cover"
              />
            ) : (
              <IconNotes
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-ink-700"
                stroke={1.2}
              />
            )}
          </div>
        </div>
      </header>

      <section aria-labelledby="notebook-notes-title">
        <h2
          id="notebook-notes-title"
          className="mb-5 text-2xl font-bold tracking-[-0.025em] text-ink-50 sm:text-3xl"
        >
          Notas
        </h2>

        <NoteExplorer
          notes={notes.map((note) => ({
            href: getWikiNotePath(notebook.slug, note.slug),
            title: note.title,
            level: note.level,
            topics: note.topics.map(({ name }) => name),
            updatedAt: formatWikiDate(note.updatedAt),
          }))}
        />
      </section>
    </main>
  );
};

export default NotebookPage;
