import type {
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client';

import { WIKI_NOTE_LEVELS, WIKI_PROPERTIES } from './wiki-contract';
import { WikiError } from './wiki-errors';
import type {
  WikiMedia,
  WikiNotebook,
  WikiNote,
  WikiSitemapNotebook,
  WikiSitemapNote,
  WikiTopic,
} from './wiki.types';

type PageProperty = PageObjectResponse['properties'][string];

const schemaError = (propertyName: string, expectedType: string): WikiError =>
  new WikiError(
    'schema',
    `Notion property "${propertyName}" must be ${expectedType}.`,
  );

const getProperty = (
  page: PageObjectResponse,
  propertyName: string,
): PageProperty => {
  const property = page.properties[propertyName];

  if (!property) {
    throw schemaError(propertyName, 'present');
  }

  return property;
};

const getPlainText = (items: RichTextItemResponse[]): string =>
  items
    .map(({ plain_text: plainText }) => plainText)
    .join('')
    .trim();

const getTitle = (page: PageObjectResponse, propertyName: string): string => {
  const property = getProperty(page, propertyName);

  if (property.type !== 'title') {
    throw schemaError(propertyName, 'a title');
  }

  const title = getPlainText(property.title);

  if (!title) {
    throw new WikiError(
      'schema',
      `Notion property "${propertyName}" cannot be empty.`,
    );
  }

  return title;
};

const getRichText = (
  page: PageObjectResponse,
  propertyName: string,
): string | null => {
  const property = getProperty(page, propertyName);

  if (property.type !== 'rich_text') {
    throw schemaError(propertyName, 'rich text');
  }

  return getPlainText(property.rich_text) || null;
};

const getSlug = (page: PageObjectResponse, propertyName: string): string => {
  const slug = getRichText(page, propertyName);

  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new WikiError(
      'schema',
      `Notion property "${propertyName}" must contain a lowercase kebab-case slug.`,
    );
  }

  return slug;
};

const getRelationIds = (
  page: PageObjectResponse,
  propertyName: string,
): string[] => {
  const property = getProperty(page, propertyName);

  if (property.type !== 'relation') {
    throw schemaError(propertyName, 'a relation');
  }

  if ('has_more' in property && property.has_more === true) {
    throw new WikiError(
      'schema',
      `Notion relation "${propertyName}" must be retrieved completely.`,
    );
  }

  return property.relation.map(({ id }) => id);
};

const getMediaFromFile = (
  file:
    | Extract<PageProperty, { type: 'files' }>['files'][number]
    | NonNullable<PageObjectResponse['cover']>,
): WikiMedia | null => {
  if (file.type === 'file') {
    return { url: file.file.url };
  }

  if (file.type === 'external') {
    return { url: file.external.url };
  }

  return null;
};

const getCover = (
  page: PageObjectResponse,
  propertyName?: string,
): WikiMedia | null => {
  if (propertyName) {
    const property = getProperty(page, propertyName);

    if (property.type !== 'files') {
      throw schemaError(propertyName, 'files');
    }

    const media = property.files[0];

    if (media) {
      return getMediaFromFile(media);
    }
  }

  return page.cover ? getMediaFromFile(page.cover) : null;
};

const getRollupDate = (
  page: PageObjectResponse,
  propertyName: string,
): string | null => {
  const property = getProperty(page, propertyName);

  if (property.type !== 'rollup') {
    throw schemaError(propertyName, 'a rollup');
  }

  return property.rollup.type === 'date'
    ? (property.rollup.date?.start ?? null)
    : null;
};

const getLastEditedTime = (
  page: PageObjectResponse,
  propertyName: string,
): string => {
  const property = getProperty(page, propertyName);

  if (property.type !== 'last_edited_time') {
    throw schemaError(propertyName, 'a last edited time');
  }

  return property.last_edited_time;
};

export const getWikiNotionIdKey = (id: string): string =>
  id.replaceAll('-', '').toLowerCase();

export const isWikiNotionIdKey = (value: string): boolean =>
  /^[0-9a-f]{32}$/i.test(value);

export const mapWikiTopic = (page: PageObjectResponse): WikiTopic => ({
  id: page.id,
  name: getTitle(page, WIKI_PROPERTIES.topics.name),
});

export const mapWikiNotebook = (page: PageObjectResponse): WikiNotebook => {
  const title = getTitle(page, WIKI_PROPERTIES.notebooks.name);
  const description =
    getRichText(page, WIKI_PROPERTIES.notebooks.description) ??
    `Notas técnicas de ${title} en la Wiki de Nicolás Garzón.`;
  const cover = getCover(page, WIKI_PROPERTIES.notebooks.cover);

  return {
    id: page.id,
    slug: getSlug(page, WIKI_PROPERTIES.notebooks.slug),
    title,
    description,
    cover,
    updatedAt: getRollupDate(page, WIKI_PROPERTIES.notebooks.edited),
    noteCount: null,
    seo: {
      title: getRichText(page, WIKI_PROPERTIES.notebooks.seoTitle) ?? title,
      description:
        getRichText(page, WIKI_PROPERTIES.notebooks.seoDescription) ??
        description,
      imageAlt:
        getRichText(page, WIKI_PROPERTIES.notebooks.seoImageAlt) ??
        `Imagen social del notebook ${title}`,
    },
  };
};

export const mapWikiSitemapNotebook = (
  page: PageObjectResponse,
): WikiSitemapNotebook => ({
  id: page.id,
  slug: getSlug(page, WIKI_PROPERTIES.notebooks.slug),
  updatedAt: getRollupDate(page, WIKI_PROPERTIES.notebooks.edited),
});

export const mapWikiSitemapNote = (
  page: PageObjectResponse,
): WikiSitemapNote => {
  const notebookIds = getRelationIds(page, WIKI_PROPERTIES.notes.notebook);

  if (notebookIds.length !== 1) {
    throw new WikiError(
      'schema',
      'Every public Wiki note must belong to exactly one notebook.',
    );
  }

  return {
    slug: getSlug(page, WIKI_PROPERTIES.notes.slug),
    notebookId: notebookIds[0],
    updatedAt: getLastEditedTime(page, WIKI_PROPERTIES.notes.edited),
  };
};

export const mapWikiNote = (
  page: PageObjectResponse,
  topicsById: ReadonlyMap<string, WikiTopic>,
): WikiNote => {
  const notebookIds = getRelationIds(page, WIKI_PROPERTIES.notes.notebook);

  if (notebookIds.length !== 1) {
    throw new WikiError(
      'schema',
      'Every public Wiki note must belong to exactly one notebook.',
    );
  }

  const levelProperty = getProperty(page, WIKI_PROPERTIES.notes.level);

  if (levelProperty.type !== 'select') {
    throw schemaError(WIKI_PROPERTIES.notes.level, 'a select');
  }

  const selectedLevel = levelProperty.select?.name ?? null;
  const level =
    WIKI_NOTE_LEVELS.find((candidate) => candidate === selectedLevel) ?? null;

  if (selectedLevel !== null && level === null) {
    throw new WikiError(
      'schema',
      'A public Wiki note uses an unsupported level.',
    );
  }

  const topicIds = getRelationIds(page, WIKI_PROPERTIES.notes.topics);
  const title = getTitle(page, WIKI_PROPERTIES.notes.name);
  const description =
    getRichText(page, WIKI_PROPERTIES.notes.description) ??
    `Notas técnicas sobre ${title} en la Wiki de Nicolás Garzón.`;

  return {
    id: page.id,
    slug: getSlug(page, WIKI_PROPERTIES.notes.slug),
    notebookId: notebookIds[0],
    title,
    description,
    level,
    topics: topicIds.flatMap((id) => {
      const topic = topicsById.get(id);
      return topic ? [topic] : [];
    }),
    createdAt: page.created_time,
    updatedAt: getLastEditedTime(page, WIKI_PROPERTIES.notes.edited),
    seo: {
      title: getRichText(page, WIKI_PROPERTIES.notes.seoTitle) ?? title,
      description:
        getRichText(page, WIKI_PROPERTIES.notes.seoDescription) ?? description,
    },
  };
};
