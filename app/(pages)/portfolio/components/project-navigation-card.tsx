'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';

import comingSoonWebp from '../../../../public/coming_soon.webp';

import { ProjectStatusChip } from './project-status-chip';

import { ProjectInformationType } from '@/sanity/lib/types/project.type';

type ProjectNavigationItem = Pick<
  ProjectInformationType,
  'title' | 'slug' | 'status' | 'project_information_preview'
>;

const ProjectNavigationCard = ({
  project,
  direction,
}: {
  project: ProjectNavigationItem;
  direction: 'previous' | 'next';
}) => {
  const isPrevious = direction === 'previous';

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group relative min-h-[180px] overflow-hidden rounded-[2rem] border border-ink-500/70 bg-ink-950 transition duration-300 hover:-translate-y-1 hover:border-ink-400"
    >
      <Image
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        src={project.project_information_preview.image?.url ?? comingSoonWebp}
        alt={
          project.project_information_preview.image?.alt ??
          `Vista previa de ${project.title}`
        }
        className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-center justify-between gap-3">
          <ProjectStatusChip status={project.status} />

          <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-white/15">
            {isPrevious ? (
              <IconArrowNarrowLeft size={20} stroke={1.6} />
            ) : (
              <IconArrowNarrowRight size={20} stroke={1.6} />
            )}
          </span>
        </div>

        <div
          className={`flex flex-col gap-1 ${
            isPrevious ? 'items-start text-left' : 'items-end text-right'
          }`}
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
            {isPrevious ? 'Proyecto anterior' : 'Siguiente proyecto'}
          </span>

          <h3 className="text-xl font-semibold leading-tight text-white">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export const ProjectNavigation = ({
  previousProject,
  nextProject,
}: {
  previousProject?: ProjectNavigationItem;
  nextProject?: ProjectNavigationItem;
}) => {
  if (!previousProject && !nextProject) return null;

  return (
    <footer className="flex flex-col gap-5 border-t border-ink-500/70 pt-8">
      <div>
        <h2 className="text-lg font-semibold text-ink-50">Sigue explorando</h2>
        <p className="mt-1 text-sm text-ink-200">
          Otros proyectos que también muestran cómo pienso, diseño y construyo.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {previousProject ? (
          <ProjectNavigationCard
            project={previousProject}
            direction="previous"
          />
        ) : (
          <div />
        )}

        {nextProject && (
          <ProjectNavigationCard project={nextProject} direction="next" />
        )}
      </div>
    </footer>
  );
};
