export const WIKI_REVALIDATE_SECONDS = 300;
export const NOTION_API_VERSION = '2026-03-11';

export const WIKI_PROPERTIES = {
  notebooks: {
    archive: 'Archive',
    cover: 'Cover',
    description: 'Description',
    edited: 'Edited',
    name: 'Name',
    published: 'Publicada',
    seoDescription: 'SEO Description',
    seoImageAlt: 'SEO Image Alt',
    seoTitle: 'SEO Title',
    slug: 'Slug',
  },
  notes: {
    archive: 'Archive',
    description: 'Description',
    edited: 'Edited',
    name: 'Name',
    level: 'Nivel',
    notebook: 'Notebook',
    order: 'Orden',
    seoDescription: 'SEO Description',
    seoTitle: 'SEO Title',
    slug: 'Slug',
    status: 'Estado',
    topics: 'Topics',
  },
  topics: {
    name: 'Name',
    published: 'Publicada',
  },
} as const;

export const WIKI_PROPERTY_IDS = {
  notebooks: {
    cover: 'dyXR',
    description: 'GtTV',
    edited: 'g%3A%3Bi',
    name: 'title',
    seoDescription: 'v~Lf',
    seoImageAlt: '%5EzES',
    seoTitle: 'xsao',
    slug: '~%7DM%5D',
  },
  notes: {
    description: '%40%3BdG',
    edited: '%40cCa',
    level: 'g%5E%60A',
    name: 'title',
    notebook: 'Rs%40p',
    seoDescription: '%5B%60OW',
    seoTitle: 'VvF%3C',
    slug: 'E%60FW',
    topics: 'CeTf',
  },
  topics: {
    name: 'title',
  },
} as const;

export const WIKI_NOTE_LEVELS = [
  'Fundamentos',
  'Aplicación',
  'Profundización',
] as const;

export type WikiNoteLevel = (typeof WIKI_NOTE_LEVELS)[number];

export const WIKI_SEO_DEFAULTS = {
  title: 'Wiki de desarrollo web',
  description:
    'Notas técnicas de Nicolás Garzón sobre frontend, backend, arquitectura, bases de datos y herramientas para construir productos web.',
  image: {
    path: '/seo/og-wiki-mockup.png',
    width: 1200,
    height: 630,
    alt: 'Wiki técnica de Nicolás Garzón sobre desarrollo web',
  },
} as const;
