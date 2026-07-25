import type { WikiNoteLevel } from './wiki-contract';

export interface WikiMedia {
  url: string;
}

export interface WikiSeo {
  title: string;
  description: string;
}

export interface WikiTopic {
  id: string;
  name: string;
}

export interface WikiNotebook {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: WikiMedia | null;
  updatedAt: string | null;
  noteCount: number | null;
  seo: WikiSeo & {
    imageAlt: string;
  };
}

export interface WikiNote {
  id: string;
  slug: string;
  notebookId: string;
  title: string;
  description: string;
  level: WikiNoteLevel | null;
  topics: WikiTopic[];
  createdAt: string;
  updatedAt: string;
  seo: WikiSeo;
}

export type WikiSitemapNotebook = Pick<
  WikiNotebook,
  'id' | 'slug' | 'updatedAt'
>;

export type WikiSitemapNote = Pick<
  WikiNote,
  'notebookId' | 'slug' | 'updatedAt'
>;

export interface WikiMarkdown {
  markdown: string;
  truncated: boolean;
  unknownBlockIds: string[];
}

export interface WikiHeading {
  id: string;
  level: 2 | 3 | 4;
  title: string;
}
