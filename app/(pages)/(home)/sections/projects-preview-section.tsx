import Link from 'next/link';
import { IconArrowNarrowRight } from '@tabler/icons-react';

import Heading from '@/components/common/heading';
import { getProjects } from '@/sanity/lib/fetchers/project.fetcher';
import ProjectCard from '@/components/common/project-card';

const ProjectsPreview = async () => {
  const projects = await getProjects();

  const visibleProjects = projects?.slice(0, 3);

  if (visibleProjects?.length !== 3) return null;

  return (
    <section className="flex flex-col gap-10">
      <article className="flex items-center justify-between">
        <div className="flex flex-col gap-4 items-start">
          <Heading as="h2">Proyectos</Heading>
          <p className="text-ink-100">
            Soluciones que construí de principio a fin
          </p>
        </div>
        <Link
          href="/portfolio"
          className="link-underline group text-ink-100 flex items-center gap-3 text-base"
        >
          Ver todos los proyectos
          <IconArrowNarrowRight
            stroke={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </article>

      <article className="grid grid-cols-2 grid-rows-[260px_260px] gap-5">
        <ProjectCard project={visibleProjects[0]} className="row-span-full" />

        <ProjectCard project={visibleProjects[1]} />
        <ProjectCard project={visibleProjects[2]} />
      </article>
    </section>
  );
};

export default ProjectsPreview;
