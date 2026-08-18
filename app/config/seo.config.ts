import { PublicEnvConfig } from './public-env.config';
import { ServerEnvConfig } from './server-env.config';

export const SEO_CONFIG = {
  siteName: 'Nicolás Garzón',
  applicationName: 'Nicolás Garzón',

  defaultTitle: 'Nicolás Garzón | Desarrollador Web',

  titleTemplate: '%s | Nicolás Garzón',

  defaultDescription:
    'Desarrollo aplicaciones web, principalmente en frontend, y también trabajo en backend cuando el proyecto lo necesita.',

  locale: 'es_CO',
  language: 'es',

  siteUrl: new URL(PublicEnvConfig.site_url),

  indexingEnabled: ServerEnvConfig.seo_indexing_enabled,

  defaultImage: {
    url: '/seo/og-default-image.png',
    width: 1200,
    height: 630,
    alt: 'Nicolás Garzón, desarrollador web',
  },
} as const;
