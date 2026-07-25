import type { Metadata } from 'next';
import type { Route } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { IconArrowLeft, IconArrowRight, IconClock } from '@tabler/icons-react';

import { Heading } from '@/components/common/heading';
import { SEO_CONFIG } from '@/config/seo.config';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';
import { getAbsoluteUrl } from '@/utils/seo/get-absolute-url';

import { WikiBreadcrumbs } from '../../components/wiki-breadcrumbs';
import { WikiJsonLd } from '../../components/wiki-json-ld';
import { WikiLevelChip } from '../../components/wiki-level-chip';
import { WikiMarkdownContent } from '../../components/wiki-markdown-content';
import { WikiTableOfContents } from '../../components/wiki-table-of-contents';
import { WIKI_SEO_DEFAULTS } from '../../lib/wiki-contract';
import {
  getNotebookNotes,
  getNoteMarkdown,
  getPublicNote,
} from '../../lib/wiki-data';
import { formatWikiDate, getWikiNotePath } from '../../lib/wiki-format';
import { getWikiNotionIdKey } from '../../lib/wiki-mappers';
import { getWikiHeadings } from '../../lib/wiki-markdown';

type NotePageProps = {
  params: Promise<{ notebookSlug: string; noteSlug: string }>;
};

export const runtime = 'nodejs';
export const revalidate = 300;

export const generateMetadata = async ({
  params,
}: NotePageProps): Promise<Metadata> => {
  const { notebookSlug, noteSlug } = await params;
  const result = await getPublicNote(notebookSlug, noteSlug);

  if (!result) {
    notFound();
  }

  const { note, notebook } = result;

  if (notebookSlug !== notebook.slug || noteSlug !== note.slug) {
    permanentRedirect(getWikiNotePath(notebook.slug, note.slug));
  }

  return createPageMetadata({
    title: note.seo.title,
    description: note.seo.description,
    path: getWikiNotePath(notebook.slug, note.slug),
    image: {
      url: `/seo/wiki/${notebook.slug}.png`,
      alt: notebook.seo.imageAlt,
      width: WIKI_SEO_DEFAULTS.image.width,
      height: WIKI_SEO_DEFAULTS.image.height,
    },
    openGraphType: 'article',
  });
};

const NotePage = async ({ params }: NotePageProps) => {
  const { notebookSlug, noteSlug } = await params;
  const result = await getPublicNote(notebookSlug, noteSlug);

  if (!result) {
    notFound();
  }

  const { notebook, note } = result;

  if (notebookSlug !== notebook.slug || noteSlug !== note.slug) {
    permanentRedirect(getWikiNotePath(notebook.slug, note.slug));
  }

  const [content, notebookNotes] = await Promise.all([
    getNoteMarkdown(note.id),
    getNotebookNotes(notebook.id),
  ]);

  const currentIndex = notebookNotes.findIndex(({ id }) => id === note.id);
  const previousNote =
    currentIndex > 0 ? notebookNotes[currentIndex - 1] : undefined;
  const nextNote =
    currentIndex >= 0 && currentIndex < notebookNotes.length - 1
      ? notebookNotes[currentIndex + 1]
      : undefined;
  const headings = getWikiHeadings(content.markdown);
  const canonicalPath = getWikiNotePath(notebook.slug, note.slug);
  const canonicalUrl = getAbsoluteUrl(canonicalPath);
  const internalLinks = Object.fromEntries(
    notebookNotes.map((candidate) => [
      getWikiNotionIdKey(candidate.id),
      getWikiNotePath(notebook.slug, candidate.slug),
    ]),
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: note.title,
        name: note.seo.title,
        description: note.seo.description,
        author: {
          '@type': 'Person',
          name: SEO_CONFIG.siteName,
          url: getAbsoluteUrl('/'),
        },
        dateModified: note.updatedAt,
        datePublished: note.createdAt,
        inLanguage: 'es-CO',
        mainEntityOfPage: canonicalUrl,
        url: canonicalUrl,
        image: `/seo/wiki/${notebook.slug}.png`,
        isPartOf: {
          '@type': 'CollectionPage',
          name: notebook.title,
          url: getAbsoluteUrl(`/wiki/${notebook.slug}`),
        },
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
            item: getAbsoluteUrl(`/wiki/${notebook.slug}`),
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: note.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full xl:relative xl:left-1/2 xl:w-[62rem] xl:-translate-x-1/2 2xl:w-[68rem]">
      <WikiJsonLd value={jsonLd} />

      <WikiBreadcrumbs
        items={[
          { href: '/', label: 'Inicio' },
          { href: '/wiki', label: 'Wiki' },
          {
            href: `/wiki/${notebook.slug}`,
            label: notebook.title,
          },
          { label: note.title },
        ]}
      />

      <article className="mt-8">
        <header className="max-w-[76ch] border-b border-ink-800 pb-10">
          <Link
            href={`/wiki/${notebook.slug}`}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-700/80 bg-ink-900/20 px-4 text-sm font-medium text-ink-200 outline-none transition-colors hover:border-ink-500 hover:bg-ink-900/60 hover:text-ink-50 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-main motion-reduce:transition-none"
          >
            <IconArrowLeft
              aria-hidden="true"
              size={17}
              className="transition-transform group-hover:-translate-x-0.5 motion-reduce:transform-none"
            />
            Volver a {notebook.title}
          </Link>

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-brand-300">
            {notebook.title}
          </p>
          <Heading className="mt-3 max-w-[18ch] break-normal text-balance text-[clamp(2.4rem,7vw,4.8rem)] leading-[0.98] tracking-[-0.04em]">
            {note.title}
          </Heading>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-ink-200 sm:text-lg">
            {note.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink-800 pt-5">
            <dl className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ink-300">
              <div className="inline-flex items-center gap-1.5">
                <dt className="sr-only">Última actualización</dt>
                <IconClock
                  aria-hidden="true"
                  className="text-ink-400"
                  size={15}
                />
                <dd>
                  Actualizada{' '}
                  <time dateTime={note.updatedAt}>
                    {formatWikiDate(note.updatedAt)}
                  </time>
                </dd>
              </div>

              {note.level && (
                <div>
                  <dt className="sr-only">Nivel</dt>
                  <dd>
                    <WikiLevelChip level={note.level} />
                  </dd>
                </div>
              )}
            </dl>

            {note.level && note.topics.length > 0 && (
              <span
                aria-hidden="true"
                className="hidden h-4 w-px bg-ink-700 sm:block"
              />
            )}

            {note.topics.length > 0 && (
              <ul
                aria-label="Temas"
                className="flex flex-wrap items-center gap-1.5"
              >
                {note.topics.map((topic) => (
                  <li
                    key={topic.id}
                    className="inline-flex items-center gap-1 text-xs text-ink-300"
                  >
                    <span aria-hidden="true" className="text-ink-500">
                      #
                    </span>
                    {topic.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        <div
          className={
            headings.length >= 3
              ? 'mt-11 grid gap-8 xl:grid-cols-[minmax(0,1fr)_14.5rem] xl:items-start xl:gap-12'
              : 'mt-11'
          }
        >
          <WikiMarkdownContent
            content={content}
            internalLinks={internalLinks}
          />

          {headings.length >= 3 && <WikiTableOfContents headings={headings} />}
        </div>
      </article>

      {(previousNote || nextNote) && (
        <nav
          aria-label="Navegación entre notas"
          className="mt-14 grid gap-4 border-t border-ink-800 pt-8 sm:grid-cols-2"
        >
          {previousNote && (
            <NoteNavigationLink
              href={getWikiNotePath(notebook.slug, previousNote.slug)}
              label="Nota anterior"
              title={previousNote.title}
              direction="previous"
            />
          )}
          {nextNote && (
            <NoteNavigationLink
              href={getWikiNotePath(notebook.slug, nextNote.slug)}
              label="Nota siguiente"
              title={nextNote.title}
              direction="next"
            />
          )}
        </nav>
      )}
    </main>
  );
};

const NoteNavigationLink = ({
  href,
  label,
  title,
  direction,
}: {
  href: `/wiki/${string}/${string}`;
  label: string;
  title: string;
  direction: 'previous' | 'next';
}) => (
  <Link
    href={href as Route}
    className={[
      'group flex min-h-28 flex-col justify-between rounded-2xl border border-ink-800 bg-ink-900/10 p-5 outline-none transition-colors hover:border-ink-600 hover:bg-ink-900/40 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-main motion-reduce:transition-none',
      direction === 'next'
        ? 'items-end text-right sm:col-start-2'
        : 'items-start',
    ].join(' ')}
  >
    <span className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-300">
      {direction === 'previous' && (
        <IconArrowLeft aria-hidden="true" size={15} />
      )}
      {label}
      {direction === 'next' && <IconArrowRight aria-hidden="true" size={15} />}
    </span>
    <span className="mt-4 line-clamp-2 font-semibold text-ink-100 transition-colors group-hover:text-brand-300">
      {title}
    </span>
  </Link>
);

export default NotePage;
