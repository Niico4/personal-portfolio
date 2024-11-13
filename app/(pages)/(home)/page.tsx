import React, { lazy, Suspense } from 'react';
import { Metadata } from 'next';

import Loading from '@/components/Loading';

import HeroSection from './components/sections/hero/HeroSection';
import SoftSkills from './components/SoftSkills';

const GitHubContribution = lazy(
  () => import('./components/GitHubContribution')
);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Desarrollador Frontend | Nicolás Garzón',
    description:
      'Bienvenido al portafolio de Nicolás Garzón, un desarrollador frontend con experiencia en crear webs innovadoras, rápidas y optimizadas. Descubre proyectos web modernos y responsivos, los servicios de desarrollo frontend que ofrece, y su experiencia en tecnologías como React, Next.js y JavaScript. Conoce más sobre su trayectoria y cómo puede ayudarte a crear sitios web de alto rendimiento.',

    openGraph: {
      title: 'Desarrollador Frontend | Nicolás Garzón',
      description:
        'Bienvenido al portafolio de Nicolás Garzón, un desarrollador frontend con experiencia en crear webs innovadoras, rápidas y optimizadas. Descubre proyectos web modernos y responsivos, los servicios de desarrollo frontend que ofrece, y su experiencia en tecnologías como React, Next.js y JavaScript. Conoce más sobre su trayectoria y cómo puede ayudarte a crear sitios web de alto rendimiento.',
      url: 'https://nicolas-garzon.vercel.app/',
      siteName: 'Portafolio de Nicolás Garzón',
      images: [
        {
          url: 'https://ik.imagekit.io/0isq9u6sl/portfolio.webp?updatedAt=1731277630302',
          width: 1200,
          height: 630,
          alt: 'Imagen destacada del portafolio de Nicolás Garzón',
        },
      ],
      type: 'website',
    },
    twitter: {
      title: 'Desarrollador Frontend | Nicolás Garzón',
      description:
        'Bienvenido al portafolio de Nicolás Garzón, un desarrollador frontend con experiencia en crear webs innovadoras, rápidas y optimizadas. Descubre proyectos web modernos y responsivos, los servicios de desarrollo frontend que ofrece, y su experiencia en tecnologías como React, Next.js y JavaScript.',
      card: 'summary_large_image',
      images: [
        'https://ik.imagekit.io/0isq9u6sl/portfolio.webp?updatedAt=1731277630302',
      ],
    },
    robots: 'index, follow',
  };
}

const HomePage = () => {
  return (
    <div className="flex flex-col gap-14 lg:w-[90%] mx-auto">
      <HeroSection />
      <Suspense fallback={<Loading />}>
        <GitHubContribution />
      </Suspense>
      <SoftSkills />
    </div>
  );
};

export default HomePage;
