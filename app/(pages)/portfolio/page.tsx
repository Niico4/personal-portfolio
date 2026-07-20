import { Metadata } from 'next';

import { Heading } from '@/components/common/heading';
import { getProjects } from '@/sanity/lib/fetchers/project.fetcher';
import { ProjectCard } from '@/components/common/project-card';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

const PORTFOLIO_DESCRIPTION =
  'Proyectos de Nicolás Garzón desarrollados con React, Next.js y TypeScript, con foco en producto, frontend y soluciones que también integran backend.';

export const metadata: Metadata = createPageMetadata({
  title: 'Proyectos web',
  socialTitle: 'Proyectos web de Nicolás Garzón',
  description: PORTFOLIO_DESCRIPTION,
  path: '/portfolio',
  image: {
    url: '/seo/og-projects-default-mockup.png',
    width: 1200,
    height: 630,
    alt: 'Proyectos web de Nicolás Garzón',
  },
});

const ProjectsPage = async () => {
  const projects = await getProjects();

  if (projects?.length === 0) {
    return null;
  }

  const [featuredProject, ...secondaryProjects] = projects;
  const hasOddSecondaryProjects = secondaryProjects.length % 2 !== 0;
  return (
    <section className="flex flex-col gap-10 sm:gap-12">
      <header className="flex max-w-2xl flex-col gap-3">
        <Heading as="h1">Proyectos</Heading>

        <p className="max-w-xl text-pretty leading-relaxed text-ink-200">
          Productos que he diseñado y construido desde la idea, conectando
          decisiones de producto, interfaz y desarrollo.
        </p>
      </header>

      {featuredProject && (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <li className="min-h-[400px] md:col-span-2 lg:min-h-[460px]">
            <ProjectCard project={featuredProject} index={0} />
          </li>

          {secondaryProjects.map((project, index) => {
            const isLastProject = index === secondaryProjects.length - 1;

            const shouldBeWide = hasOddSecondaryProjects && isLastProject;

            return (
              <li
                key={project.id}
                className={
                  shouldBeWide
                    ? 'min-h-[320px] md:col-span-2'
                    : 'min-h-[360px] md:col-span-1'
                }
              >
                <ProjectCard project={project} index={index + 1} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
export default ProjectsPage;
