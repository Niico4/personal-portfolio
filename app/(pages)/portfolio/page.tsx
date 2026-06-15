import { Metadata } from 'next';

import Heading from '@/components/common/heading';
import { getProjects } from '@/sanity/lib/fetchers/project.fetcher';
import { ProjectCard } from '@/components/common/project-card';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Proyectos web de Nicolás Garzón: soluciones construidas de principio a fin con enfoque en producto, frontend, backend y experiencia de usuario.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Proyectos | Nicolás Garzón',
    description:
      'Proyectos web de Nicolás Garzón: soluciones construidas de principio a fin con enfoque en producto, frontend, backend y experiencia de usuario.',
    url: '/portfolio',
    type: 'website',
    // TODO: images: [
    //   {
    //     url: '/seo/og-portfolio.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Proyectos de Nicolás Garzón',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyectos | Nicolás Garzón',
    description:
      'Proyectos web de Nicolás Garzón: soluciones construidas de principio a fin con enfoque en producto, frontend, backend y experiencia de usuario.',
    // TODO: images: ['/seo/og-portfolio.png'],
  },
};

const ProjectsPage = async () => {
  const projects = await getProjects();

  if (projects?.length === 0) {
    return null;
  }

  const [featuredProject, ...secondaryProjects] = projects;
  return (
    <section className="flex flex-col gap-10">
      <div className="flex max-w-2xl flex-col items-start gap-4">
        <Heading as="h1">Proyectos</Heading>

        <p className="text-ink-100">
          Soluciones reales que diseñé, construí y llevé de principio a fin.
        </p>
      </div>

      {featuredProject && (
        <article className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(220px,auto)]">
          <ProjectCard
            project={featuredProject}
            className="min-h-[420px] md:col-span-2 lg:col-span-7 lg:row-span-2"
          />

          {secondaryProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={
                index === 2
                  ? 'min-h-[280px] md:col-span-2 lg:col-span-12'
                  : 'min-h-[220px] md:col-span-1 lg:col-span-5'
              }
            />
          ))}
        </article>
      )}
    </section>
  );
};
export default ProjectsPage;
