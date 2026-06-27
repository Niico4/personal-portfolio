import Link from 'next/link';
import { IconArrowNarrowRight } from '@tabler/icons-react';

import { getProjects } from '@/sanity/lib/fetchers/project.fetcher';
import { ProjectCard } from '@/components/common/project-card';
import { SectionHeader } from '@/components/common/section-header';

const ProjectsPreviewSection = async () => {
  const projects = await getProjects();

  const visibleProjects = projects?.slice(0, 3);

  if (visibleProjects?.length !== 3) return null;

  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      <article className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader
          title="Proyectos"
          description="Soluciones que construí de principio a fin"
        />
        <Link
          href="/portfolio"
          className="link-underline group flex items-center gap-3 text-base"
        >
          Ver todos los proyectos
          <IconArrowNarrowRight
            stroke={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </article>

      <ul className="grid auto-rows-[260px] grid-cols-1 gap-5 sm:grid-cols-2 sm:grid-rows-[240px_240px] lg:grid-rows-[220px_220px] lg:gap-4 xl:grid-rows-[230px_230px]">
        <li className="min-h-[260px] sm:min-h-0 sm:row-span-full">
          <ProjectCard project={visibleProjects[0]} className="h-full" />
        </li>

        <li className="min-h-[260px] sm:min-h-0">
          <ProjectCard project={visibleProjects[1]} className="h-full" />
        </li>

        <li className="min-h-[260px] sm:min-h-0">
          <ProjectCard project={visibleProjects[2]} className="h-full" />
        </li>
      </ul>
    </section>
  );
};

export default ProjectsPreviewSection;
