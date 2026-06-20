import { Metadata } from 'next';

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
    // TODO: images: [
    //   {
    //     url: '/seo/og-home.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Portfolio de Nicolás Garzón',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicolás Garzón | Desarrollador Full Stack',
    description:
      'Construyo productos web completos con React, Next.js y Node.js: interfaces claras, APIs bien estructuradas y soluciones pensadas desde el problema.',
    // TODO: images: ['/seo/og-home.png'],
  },
};

const HomePage = () => {
  return (
    <div className="flex flex-col gap-20 mx-auto">
      <Hero />
      <ProjectsPreview />
      <WorkExperience />
    </div>
  );
};

export default HomePage;
