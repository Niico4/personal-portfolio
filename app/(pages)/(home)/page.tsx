import { Metadata } from 'next';
import { Divider } from '@heroui/divider';

import { FooterCard } from '@/layout/footer-card/footer-card';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';

import Hero from './sections/hero-section';
import ProjectsPreview from './sections/projects-preview-section';
import EducationSection from './sections/education-section';
import SkillsSection from './sections/skills-section';
import WorkExperienceSection from './sections/experience/work-experience-section';

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

const HomePage = async () => {
  const { contact, overview, skills, education } = await getProfile();

  return (
    <main className="mx-auto flex flex-col gap-6 sm:gap-7">
      <Hero contact={contact} overview={overview} />
      <Divider aria-hidden="true" className="bg-ink-400/10" />

      <ProjectsPreview />
      <Divider aria-hidden="true" className="bg-ink-400/10" />

      <WorkExperienceSection />
      <Divider aria-hidden="true" className="bg-ink-400/10" />

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-7">
        <EducationSection education={education} />
        <Divider aria-hidden="true" className="bg-ink-400/10 sm:hidden" />
        <SkillsSection skills={skills} />
      </div>
      <Divider aria-hidden="true" className="bg-ink-400/10" />

      <FooterCard contact={contact} overview={overview} />
    </main>
  );
};

export default HomePage;
