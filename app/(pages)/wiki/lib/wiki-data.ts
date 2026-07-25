import 'server-only';

import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import {
  isFullPage,
  type PageObjectResponse,
  type QueryDataSourceParameters,
} from '@notionhq/client';

import { getNotionClient, getWikiNotionConfig } from './notion-client';
import {
  WIKI_PROPERTIES,
  WIKI_PROPERTY_IDS,
  WIKI_REVALIDATE_SECONDS,
} from './wiki-contract';
import { getWikiError, WikiError } from './wiki-errors';
import {
  getWikiNotionIdKey,
  isWikiNotionIdKey,
  mapWikiNotebook,
  mapWikiNote,
  mapWikiSitemapNotebook,
  mapWikiSitemapNote,
  mapWikiTopic,
} from './wiki-mappers';
import type {
  WikiMarkdown,
  WikiNotebook,
  WikiNote,
  WikiSitemapNotebook,
  WikiSitemapNote,
  WikiTopic,
} from './wiki.types';

type QueryWithoutCursor = Omit<QueryDataSourceParameters, 'start_cursor'>;

const NOTEBOOK_PROPERTIES = Object.values(WIKI_PROPERTY_IDS.notebooks);
const NOTE_PROPERTIES = Object.values(WIKI_PROPERTY_IDS.notes);
const TOPIC_PROPERTIES = Object.values(WIKI_PROPERTY_IDS.topics);

const queryAllPages = async (
  query: QueryWithoutCursor,
): Promise<PageObjectResponse[]> => {
  const notion = getNotionClient();
  const pages: PageObjectResponse[] = [];
  let startCursor: string | undefined;

  do {
    const response = await notion.dataSources.query({
      ...query,
      start_cursor: startCursor,
      page_size: 100,
      result_type: 'page',
    });

    pages.push(...response.results.filter(isFullPage));
    startCursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined;
  } while (startCursor);

  return pages;
};

const publicNotebookFilter: QueryDataSourceParameters['filter'] = {
  and: [
    {
      property: WIKI_PROPERTIES.notebooks.published,
      checkbox: { equals: true },
    },
    {
      property: WIKI_PROPERTIES.notebooks.archive,
      checkbox: { does_not_equal: true },
    },
    {
      property: WIKI_PROPERTIES.notebooks.slug,
      rich_text: { is_not_empty: true },
    },
  ],
};

const publicNoteFilter: QueryDataSourceParameters['filter'] = {
  and: [
    {
      property: WIKI_PROPERTIES.notes.status,
      status: { does_not_equal: 'Borrador' },
    },
    {
      property: WIKI_PROPERTIES.notes.archive,
      checkbox: { does_not_equal: true },
    },
    {
      property: WIKI_PROPERTIES.notes.slug,
      rich_text: { is_not_empty: true },
    },
  ],
};

const publicTopicFilter: QueryDataSourceParameters['filter'] = {
  property: WIKI_PROPERTIES.topics.published,
  checkbox: { equals: true },
};

const loadPublicTopics = async (): Promise<WikiTopic[]> => {
  const { topicsDataSourceId } = getWikiNotionConfig();
  const pages = await queryAllPages({
    data_source_id: topicsDataSourceId,
    filter: publicTopicFilter,
    filter_properties: TOPIC_PROPERTIES,
  });

  return pages.map(mapWikiTopic);
};

const getPersistentPublicTopics = unstable_cache(
  async () => {
    try {
      return await loadPublicTopics();
    } catch (error) {
      throw getWikiError(error);
    }
  },
  ['notion-wiki-topics-v1'],
  {
    revalidate: WIKI_REVALIDATE_SECONDS,
    tags: ['notion-wiki'],
  },
);

const getPublicTopics = cache(getPersistentPublicTopics);

const loadPublicNotebooks = async (): Promise<WikiNotebook[]> => {
  const { notebooksDataSourceId } = getWikiNotionConfig();
  const pages = await queryAllPages({
    data_source_id: notebooksDataSourceId,
    filter: publicNotebookFilter,
    filter_properties: NOTEBOOK_PROPERTIES,
    sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
  });

  const notebooks = pages.map(mapWikiNotebook);
  const notebookSlugs = new Set<string>();

  for (const notebook of notebooks) {
    if (notebookSlugs.has(notebook.slug)) {
      throw new WikiError(
        'schema',
        `Duplicate public Wiki notebook slug: ${notebook.slug}`,
      );
    }

    notebookSlugs.add(notebook.slug);
  }

  return notebooks;
};

const getPersistentPublicNotebooks = unstable_cache(
  async () => {
    try {
      return await loadPublicNotebooks();
    } catch (error) {
      throw getWikiError(error);
    }
  },
  ['notion-wiki-notebooks-v5'],
  {
    revalidate: WIKI_REVALIDATE_SECONDS,
    tags: ['notion-wiki'],
  },
);

export const getPublicNotebooks = cache(getPersistentPublicNotebooks);

const loadPublicNotes = async (
  topics: WikiTopic[],
  notebookId?: string,
): Promise<WikiNote[]> => {
  const { notesDataSourceId } = getWikiNotionConfig();
  const topicsById = new Map(topics.map((topic) => [topic.id, topic]));
  const filter: QueryDataSourceParameters['filter'] = notebookId
    ? {
        and: [
          {
            property: WIKI_PROPERTIES.notes.status,
            status: { does_not_equal: 'Borrador' },
          },
          {
            property: WIKI_PROPERTIES.notes.archive,
            checkbox: { does_not_equal: true },
          },
          {
            property: WIKI_PROPERTIES.notes.slug,
            rich_text: { is_not_empty: true },
          },
          {
            property: WIKI_PROPERTIES.notes.notebook,
            relation: { contains: notebookId },
          },
        ],
      }
    : publicNoteFilter;

  const pages = await queryAllPages({
    data_source_id: notesDataSourceId,
    filter,
    filter_properties: NOTE_PROPERTIES,
    sorts: [
      { property: WIKI_PROPERTIES.notes.order, direction: 'ascending' },
      { timestamp: 'last_edited_time', direction: 'descending' },
    ],
  });

  return pages.map((page) => mapWikiNote(page, topicsById));
};

const loadWikiSitemap = async (): Promise<{
  notebooks: WikiSitemapNotebook[];
  notes: WikiSitemapNote[];
}> => {
  try {
    const { notebooksDataSourceId, notesDataSourceId } = getWikiNotionConfig();
    const [notebookPages, notePages] = await Promise.all([
      queryAllPages({
        data_source_id: notebooksDataSourceId,
        filter: publicNotebookFilter,
        filter_properties: [
          WIKI_PROPERTY_IDS.notebooks.edited,
          WIKI_PROPERTY_IDS.notebooks.slug,
        ],
      }),
      queryAllPages({
        data_source_id: notesDataSourceId,
        filter: publicNoteFilter,
        filter_properties: [
          WIKI_PROPERTY_IDS.notes.edited,
          WIKI_PROPERTY_IDS.notes.notebook,
          WIKI_PROPERTY_IDS.notes.slug,
        ],
      }),
    ]);
    const notebooks = notebookPages.map(mapWikiSitemapNotebook);
    const publicNotebookIds = new Set(notebooks.map(({ id }) => id));
    const notes = notePages
      .map(mapWikiSitemapNote)
      .filter((note) => publicNotebookIds.has(note.notebookId));
    const noteSlugs = new Set<string>();

    for (const note of notes) {
      const scopedSlug = `${note.notebookId}/${note.slug}`;

      if (noteSlugs.has(scopedSlug)) {
        throw new WikiError(
          'schema',
          `Duplicate public Wiki note slug in notebook: ${note.slug}`,
        );
      }

      noteSlugs.add(scopedSlug);
    }

    return {
      notes,
      notebooks,
    };
  } catch (error) {
    throw getWikiError(error);
  }
};

const getPersistentWikiSitemap = unstable_cache(
  loadWikiSitemap,
  ['notion-wiki-sitemap-v1'],
  {
    revalidate: WIKI_REVALIDATE_SECONDS,
    tags: ['notion-wiki'],
  },
);

export const getWikiSitemap = cache(getPersistentWikiSitemap);

const loadNotebookNotes = async (notebookId: string): Promise<WikiNote[]> => {
  try {
    const topics = await getPublicTopics();
    const notes = await loadPublicNotes(topics, notebookId);
    const noteSlugs = new Set<string>();

    for (const note of notes) {
      if (noteSlugs.has(note.slug)) {
        throw new WikiError(
          'schema',
          `Duplicate public Wiki note slug in notebook: ${note.slug}`,
        );
      }

      noteSlugs.add(note.slug);
    }

    return notes;
  } catch (error) {
    throw getWikiError(error);
  }
};

const getPersistentNotebookNotes = unstable_cache(
  loadNotebookNotes,
  ['notion-wiki-notebook-notes-v4'],
  {
    revalidate: WIKI_REVALIDATE_SECONDS,
    tags: ['notion-wiki'],
  },
);

export const getNotebookNotes = cache(getPersistentNotebookNotes);

export const getPublicNotebook = cache(
  async (identifier: string): Promise<WikiNotebook | null> => {
    const notebooks = await getPublicNotebooks();
    const slugMatch = notebooks.find(
      (notebook) => notebook.slug === identifier,
    );

    if (slugMatch) {
      return slugMatch;
    }

    const notionIdKey = getWikiNotionIdKey(identifier);

    if (!isWikiNotionIdKey(notionIdKey)) {
      return null;
    }

    return (
      notebooks.find(
        (notebook) => getWikiNotionIdKey(notebook.id) === notionIdKey,
      ) ?? null
    );
  },
);

export const getPublicNote = cache(
  async (
    notebookIdentifier: string,
    noteIdentifier: string,
  ): Promise<{ notebook: WikiNotebook; note: WikiNote } | null> => {
    const notebook = await getPublicNotebook(notebookIdentifier);

    if (!notebook) {
      return null;
    }

    const notes = await getNotebookNotes(notebook.id);
    const noteBySlug = notes.find(
      (candidate) =>
        candidate.slug === noteIdentifier &&
        candidate.notebookId === notebook.id,
    );

    if (noteBySlug) {
      return { notebook, note: noteBySlug };
    }

    const notionIdKey = getWikiNotionIdKey(noteIdentifier);

    if (!isWikiNotionIdKey(notionIdKey)) {
      return null;
    }

    const note = notes.find(
      (candidate) =>
        getWikiNotionIdKey(candidate.id) === notionIdKey &&
        candidate.notebookId === notebook.id,
    );

    return note ? { notebook, note } : null;
  },
);

const loadNoteMarkdown = async (pageId: string): Promise<WikiMarkdown> => {
  try {
    const response = await getNotionClient().pages.retrieveMarkdown({
      page_id: pageId,
    });

    return {
      markdown: response.markdown,
      truncated: response.truncated,
      unknownBlockIds: response.unknown_block_ids,
    };
  } catch (error) {
    throw getWikiError(error);
  }
};

const getPersistentNoteMarkdown = unstable_cache(
  loadNoteMarkdown,
  ['notion-wiki-markdown-v1'],
  {
    revalidate: WIKI_REVALIDATE_SECONDS,
    tags: ['notion-wiki'],
  },
);

export const getNoteMarkdown = cache(getPersistentNoteMarkdown);
