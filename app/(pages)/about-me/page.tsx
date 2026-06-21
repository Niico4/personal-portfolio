import { Metadata } from 'next';

import WorkExperienceSection from '../../components/sections/work-experience-section';

import AboutMeHeroSection from './sections/about-me-hero-section';
import EducationSection from './sections/education-section';
import SkillsSection from './sections/skills-section';

export const metadata: Metadata = {
  title: 'Sobre mí',
  description:
    'Conoce a Nicolás Garzón, desarrollador Full Stack enfocado en crear productos web completos con React, Next.js, TypeScript, Node.js y bases de datos.',
  alternates: {
    canonical: '/about-me',
  },
  openGraph: {
    title: 'Sobre mí | Nicolás Garzón',
    description:
      'Desarrollador Full Stack con enfoque en frontend, backend, producto, interfaces claras y soluciones web bien estructuradas.',
    url: '/about-me',
    type: 'profile',
    images: [
      {
        url: '/seo/og-about-me-default-mockup.webp',
        width: 1200,
        height: 630,
        alt: 'Sobre Nicolás Garzón, Desarrollador Full Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre mí | Nicolás Garzón',
    description:
      'Desarrollador Full Stack con enfoque en frontend, backend, producto, interfaces claras y soluciones web bien estructuradas.',
    images: ['/seo/og-about-me-default-mockup.webp'],
  },
};

const HomePage = () => {
  return (
    <div className="mx-auto flex flex-col gap-14 sm:gap-20">
      <AboutMeHeroSection />
      <EducationSection />
      <WorkExperienceSection />
      <SkillsSection />
    </div>
  );
};

export default HomePage;
