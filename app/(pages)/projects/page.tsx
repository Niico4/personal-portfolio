import type { Metadata } from 'next';

import { ProjectCard } from '@/components/common/project-card';
import { getProjectList } from '@/sanity/lib/fetchers/project.fetcher';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Proyectos',
  description:
    'Algunas de las cosas que he diseñado, desarrollado y construido por mi cuenta.',
  path: '/projects',
});

const ProjectsPage = async () => {
  const projects = await getProjectList();

  return (
    <section className="flex flex-col gap-8">
      <header className="space-y-2">
        <h1 className="flex items-start gap-1 font-display text-2xl leading-tight font-semibold tracking-tight text-fg-strong sm:text-3xl">
          Proyectos
          <span className="font-sans text-xs tracking-normal text-fg-muted tabular-nums">
            [{String(projects.length).padStart(2, '0')}]
          </span>
        </h1>

        <p className="text-sm leading-relaxed text-fg-muted sm:text-base">
          Algunas de las cosas que he diseñado, desarrollado y construido por mi
          cuenta.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
