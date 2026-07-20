import { PublicEnvConfig } from './public-env.config';
import { ServerEnvConfig } from './server-env.config';

export const SEO_CONFIG = {
  siteName: 'Nicolás Garzón',
  applicationName: 'Portfolio de Nicolás Garzón',

  defaultTitle: 'Nicolás Garzón | Desarrollador Full Stack',

  titleTemplate: '%s | Nicolás Garzón',

  defaultDescription:
    'Desarrollador web con más de 3 años creando productos con React, Next.js y TypeScript, principalmente desde el frontend y con apoyo backend en Node.js.',

  locale: 'es_CO',
  language: 'es',

  siteUrl: new URL(PublicEnvConfig.site_url),

  indexingEnabled: ServerEnvConfig.seo_indexing_enabled,

  defaultImage: {
    url: '/seo/og-default-mockup.png',
    width: 1200,
    height: 630,
    alt: 'Portfolio de Nicolás Garzón, desarrollador frontend y full stack',
  },
} as const;
