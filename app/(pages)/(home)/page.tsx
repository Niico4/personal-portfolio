import { Metadata } from 'next';
import { Divider } from '@heroui/divider';

import WorkExperience from '../../components/sections/work-experience-section';

import Hero from './sections/hero-section';
import ProjectsPreview from './sections/projects-preview-section';

export const metadata: Metadata = {
  title: {
    absolute: 'Nicolás Garzón | Desarrollador Full Stack',
  },
  description:
    'Construyo productos web completos con React, Next.js y Node.js: interfaces claras, APIs bien estructuradas y soluciones pensadas desde el problema.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nicolás Garzón | Desarrollador Full Stack',
    description:
      'Construyo productos web completos con React, Next.js y Node.js: interfaces claras, APIs bien estructuradas y soluciones pensadas desde el problema.',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/seo/og-default-mockup.webp',
        width: 1200,
        height: 630,
        alt: 'Portfolio de Nicolás Garzón',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicolás Garzón | Desarrollador Full Stack',
    description:
      'Construyo productos web completos con React, Next.js y Node.js: interfaces claras, APIs bien estructuradas y soluciones pensadas desde el problema.',
    images: ['/seo/og-default-mockup.webp'],
  },
};

const HomePage = () => {
  return (
    <div className="mx-auto flex flex-col gap-6 sm:gap-7">
      <Hero />
      <Divider aria-hidden="true" className="bg-ink-400/10" />
      <ProjectsPreview />
      <Divider aria-hidden="true" className="bg-ink-400/10" />
      <WorkExperience />
    </div>
  );
};

export default HomePage;
