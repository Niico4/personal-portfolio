import Link from 'next/link';
import { IconArrowNarrowRight } from '@tabler/icons-react';

import { getProjects } from '@/sanity/lib/fetchers/project.fetcher';
import { ProjectCard } from '@/components/common/project-card';
import { SectionHeader } from '@/components/common/section-header';

const ProjectsPreviewSection = async () => {
  const projects = await getProjects();

  const visibleProjects = projects?.slice(0, 2);

  if (visibleProjects?.length !== 2) return null;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="01 Proyectos"
          description="Soluciones que construí de principio a fin"
        />
        <Link
          href="/portfolio"
          className="link-underline group flex items-center gap-3 text-base"
        >
          <span className="sr-only sm:not-sr-only">
            Ver todos los proyectos
          </span>
          <IconArrowNarrowRight
            aria-hidden="true"
            stroke={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <ul
        aria-label="Proyectos destacados"
        className="grid gap-5 sm:grid-cols-2"
      >
        {visibleProjects.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsPreviewSection;
