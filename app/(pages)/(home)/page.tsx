import type { Metadata } from 'next';

import { ProjectCard } from '@/(pages)/(home)/components/molecules/project-card';
import { PortableTextContent } from '@/components/atoms/common/portable-text-content';
import { SectionLabel } from '@/components/atoms/common/section-label';
import Signature from '@/components/atoms/common/signature';
import { Header } from '@/components/layout/header';
import { SectionIntro } from '@/components/molecules/common/section-intro';
import { SEO_CONFIG } from '@/config/seo.config';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import { getProjectList } from '@/sanity/lib/fetchers/project.fetcher';
import { getWorkExperience } from '@/sanity/lib/fetchers/work-experience.fetcher';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

import { WorkExperienceTimeline } from './components/molecules/work-experience-timeline';
import { EducationContent } from './sections/education-content-section';
import { TechnologiesContent } from './sections/technologies-content-section';

export const metadata: Metadata = createPageMetadata({
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.defaultDescription,
  path: '/',
  absoluteTitle: true,
});

const HomePage = async () => {
  const { aboutMe, professionalTitle, contact, education } = await getProfile();
  const projects = await getProjectList();
  const experiences = await getWorkExperience();

  return (
    <main className="flex flex-col gap-y-12 sm:gap-y-16">
      <div className="flex flex-col gap-6">
        <Header contact={contact} professionalTitle={professionalTitle} />

        <section className="flex flex-col gap-3">
          <SectionLabel label="Un poco sobre mí" />

          <PortableTextContent
            value={aboutMe}
            className="space-y-3 text-content"
          />
        </section>
      </div>

      <section className="flex flex-col gap-6">
        <SectionIntro
          title="01 ─ Proyectos"
          description="Proyectos nacidos de necesidades reales, llevados de la idea a una aplicación que funciona."
        />

        <div className="flex flex-col divide-y divide-line/10 border-y border-line/10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isInitiallyOpen={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionIntro
          title="02 ─ Experiencia"
          description="Experiencias donde he tenido que construir, resolver y hacer que las cosas funcionen."
        />

        <div>
          <WorkExperienceTimeline experiences={experiences} />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionIntro
          title="03 ─ Educación"
          description="Formación que ha construido la base de cómo pienso, diseño y desarrollo aplicaciones."
        />

        <EducationContent educationList={education} />
      </section>

      <section className="flex flex-col gap-6">
        <SectionIntro
          title="04 ─ Tecnologías"
          description="El stack y las herramientas que uso para diseñar y desarrollar aplicaciones."
        />

        <TechnologiesContent />
      </section>

      <footer className="flex flex-col gap-3 border-t border-line/10 pt-6">
        <p className="text-sm text-content sm:text-base">
          <span>Diseñado.</span> <br />
          <span>Desarrollado.</span> <br />
          <span>Probablemente refactorizado otra vez.</span>
        </p>

        <p className="text-xs sm:text-sm">
          <span className="text-content-muted">Sí, otra vez :)</span> <br />
          <Signature className="text-content-muted" />
        </p>

        <hr className="my-2 h-px w-full shrink-0 border-none bg-line/10" />

        <div className="flex items-center justify-between">
          <p className="text-xs text-content-muted sm:text-sm">
            Bogotá D.C., Colombia
          </p>
          <p className="text-xs text-content-muted sm:text-sm">
            © {new Date().getFullYear()}
          </p>

          {/* <ScrollToTopButton /> */}
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
