import { PublicEnvConfig } from './public-env.config';
import { ServerEnvConfig } from './server-env.config';

export const SEO_CONFIG = {
  siteName: 'Nicolás Garzón',
  applicationName: 'Nicolás Garzón',
  alternateName: 'nicoo',

  defaultTitle: 'Nicolás Garzón — Full Stack Developer',

  titleTemplate: '%s — Nicolás Garzón',

  defaultDescription:
    'Desarrollador full stack con +3 años de experiencia, mucho interés por el diseño UI y una debilidad por los detalles que casi nadie nota.',

  locale: 'es_CO',
  language: 'es-CO',

  siteUrl: new URL(PublicEnvConfig.site_url),

  indexingEnabled: ServerEnvConfig.seo_indexing_enabled,

  author: {
    name: 'Nicolás Garzón',
    jobTitle: 'Full Stack Developer',
    location: 'Bogotá, Colombia',
  },

  social: {
    title: 'Nicolás Garzón — Full Stack Developer',
    description:
      'Entre Figma y código. Construyo aplicaciones web y me detengo a ajustar ese píxel que nadie más parece notar.',
  },

  defaultImage: {
    url: '/og-default-image.png',
    width: 1200,
    height: 630,
    alt: 'Portfolio de Nicolás Garzón, desarrollador full stack.',
    type: 'image/png',
  },
} as const;
