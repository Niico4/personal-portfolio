import { Metadata } from 'next';

import { Heading } from '@/components/common/heading';
import { getProjects } from '@/sanity/lib/fetchers/project.fetcher';
import { ProjectCard } from '@/components/common/project-card';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Explora proyectos web de Nicolás Garzón: aplicaciones full stack con React, Next.js, Node.js y enfoque en producto, UI y experiencia de usuario.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Proyectos web | Nicolás Garzón',
    description:
      'Aplicaciones web construidas de principio a fin con enfoque en producto, frontend, backend, UI y experiencia de usuario.',
    url: '/portfolio',
    type: 'website',
    images: [
      {
        url: '/seo/og-projects-default-mockup.webp',
        width: 1200,
        height: 630,
        alt: 'Proyectos web de Nicolás Garzón',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyectos web | Nicolás Garzón',
    description:
      'Aplicaciones web construidas de principio a fin con enfoque en producto, frontend, backend, UI y experiencia de usuario.',
    images: ['/seo/og-projects-default-mockup.webp'],
  },
};

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
