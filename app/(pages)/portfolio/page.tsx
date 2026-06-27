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
  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      <div className="flex max-w-2xl flex-col items-start gap-4">
        <Heading as="h1">Proyectos</Heading>

        <p className="text-ink-100">
          Soluciones reales que diseñé, construí y llevé de principio a fin.
        </p>
      </div>

      {featuredProject && (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(220px,auto)]">
          <li className="min-h-[320px] sm:min-h-[420px] md:col-span-2 lg:col-span-7 lg:row-span-2">
            <ProjectCard project={featuredProject} className="h-full" />
          </li>

          {secondaryProjects.map((project, index) => (
            <li
              key={project.id}
              className={
                index === 2
                  ? 'min-h-[260px] sm:min-h-[280px] md:col-span-2 lg:col-span-12'
                  : 'min-h-[240px] sm:min-h-[220px] md:col-span-1 lg:col-span-5'
              }
            >
              <ProjectCard project={project} className="h-full" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default ProjectsPage;
