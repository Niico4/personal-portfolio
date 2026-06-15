import { Metadata } from 'next';

import { dmSans } from './fonts';
import { PublicEnvConfig } from './config/public-env.config';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(PublicEnvConfig.site_url),
  title: {
    default: 'Nicolás Garzón',
    template: '%s | Nicolás Garzón',
  },
  description:
    'Desarrollador Full Stack con experiencia real entregando productos web. React, Next.js, Node.js y más. Disponible para proyectos freelance y empleo.',
  applicationName: 'Portfolio de Nicolás Garzón',
  authors: [{ name: 'Nicolás Garzón' }],
  creator: 'Nicolás Garzón',
  publisher: 'Nicolás Garzón',

  keywords: [
    'Nicolás Garzón',
    'Desarrollador Full Stack',
    'Frontend Developer',
    'Backend Developer',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Portfolio desarrollador',
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: '/',
    siteName: 'Nicolás Garzón',
    title: 'Nicolás Garzón | Desarrollador Full Stack',
    description:
      'Desarrollador Full Stack con experiencia real entregando productos web. React, Next.js, Node.js y más. Disponible para proyectos freelance y empleo.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nicolás Garzón | Desarrollador Full Stack',
    description:
      'Desarrollador Full Stack con experiencia real entregando productos web. React, Next.js, Node.js y más. Disponible para proyectos freelance y empleo.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-main">
      <body
        className={`${dmSans.className} custom-theme min-h-dvh overscroll-none bg-main text-ink-100 font-light antialiased`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f1f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f16_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
