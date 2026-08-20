import { Metadata } from 'next';

import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';
import { SEO_CONFIG } from '@/config/seo.config';
import { PortableTextContent } from '@/components/atoms/common/portable-text-content';
import { getProjectList } from '@/sanity/lib/fetchers/project.fetcher';
import { SectionIntro } from '@/components/molecules/common/section-intro';
import { ProjectCard } from '@/(pages)/(home)/components/molecules/project-card';
import { getWorkExperience } from '@/sanity/lib/fetchers/work-experience.fetcher';
import { SectionLabel } from '@/components/atoms/common/section-label';
import { Header } from '@/components/layout/header';
import { happyMonkey } from '@/fonts';

import { WorkExperienceTimeline } from './components/molecules/work-experience-timeline';
import { TechnologiesContent } from './sections/technologies-content-section';
import { EducationContent } from './sections/education-content-section';
import Signature from '@/components/atoms/common/signature';

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
    <main className="flex flex-col gap-6">
      <Header contact={contact} professionalTitle={professionalTitle} />

      <section className="flex flex-col gap-3">
        <SectionLabel label="Un poco sobre mí" />

        <PortableTextContent
          value={aboutMe}
          className="[&_p]:text-zinc-300 space-y-3"
        />
      </section>

      <section className="flex flex-col gap-6">
        <SectionIntro
          title="01 ─ Proyectos"
          description="Proyectos nacidos de necesidades reales, llevados de la idea a una aplicación que funciona."
        />

        <div className="flex flex-col gap-1 border-y border-zinc-300/10 divide-y divide-zinc-300/10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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

      <hr className="shrink-0 bg-zinc-900 border-none w-full h-[1px] my-4" />

      <footer className="flex flex-col gap-3">
        <p className="text-sm text-zinc-400 sm:text-base">
          <span>Diseñado.</span> <br />
          <span>Desarrollado.</span> <br />
          <span>Probablemente refactorizado otra vez.</span>
        </p>

        <p className="text-xs sm:text-sm">
          <span className="text-zinc-500">Sí, otra vez :)</span> <br />
          <Signature className="text-zinc-400" />
        </p>

        <hr className="shrink-0 bg-zinc-900 border-none w-full h-[1px] my-2" />

        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-500 sm:text-sm">
            Bogotá D.C., Colombia
          </p>
          <p className="text-xs text-zinc-500 sm:text-sm">
            © {new Date().getFullYear()}
          </p>

          {/* <ScrollToTopButton /> */}
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
