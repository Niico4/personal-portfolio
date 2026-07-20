'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';

import { Project } from '@/sanity/lib/types/project.type';

type ProjectNavigationItem = Pick<Project, 'title' | 'slug' | 'preview'>;

type ProjectNavigationDirection = 'previous' | 'next';

type ProjectNavigationCardProps = {
  project: ProjectNavigationItem;
  direction: ProjectNavigationDirection;
};

const NAVIGATION_CONTENT = {
  previous: {
    label: 'Proyecto anterior',
    accessibleLabel: 'Ir al proyecto anterior',
    Icon: IconArrowNarrowLeft,
  },
  next: {
    label: 'Siguiente proyecto',
    accessibleLabel: 'Ir al siguiente proyecto',
    Icon: IconArrowNarrowRight,
  },
} as const;

const ProjectNavigationCard = ({
  project,
  direction,
}: ProjectNavigationCardProps) => {
  const isPrevious = direction === 'previous';

  const { label, accessibleLabel, Icon } = NAVIGATION_CONTENT[direction];

  const previewImage = project.preview.image;

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      aria-label={`${accessibleLabel}: ${project.title}`}
      className={[
        'group flex min-h-36 overflow-hidden rounded-[1.5rem] border border-ink-800 bg-ink-950/50 outline-none transition duration-300',
        'hover:-translate-y-0.5 hover:border-ink-600 hover:bg-ink-950',
        'focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-main',
        'motion-reduce:transform-none',
        isPrevious ? 'flex-row' : 'flex-row-reverse',
      ].join(' ')}
    >
      <div className="relative hidden w-32 shrink-0 overflow-hidden bg-ink-900 sm:block lg:w-36">
        {previewImage ? (
          <>
            <Image
              fill
              src={previewImage.url}
              alt=""
              sizes="144px"
              className="object-cover object-center opacity-75 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100 motion-reduce:transform-none"
            />

            <div className="absolute inset-0 bg-main/10 transition-colors duration-300 group-hover:bg-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-ink-950 to-ink-900" />
        )}
      </div>

      <div
        className={[
          'flex min-w-0 flex-1 flex-col justify-between gap-7 p-5 sm:p-6',
          isPrevious ? 'items-start text-left' : 'items-end text-right',
        ].join(' ')}
      >
        <div
          className={[
            'flex items-center gap-3 text-ink-400 transition-colors duration-300 group-hover:text-brand-300',
            isPrevious ? 'flex-row' : 'flex-row-reverse',
          ].join(' ')}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink-700 bg-main/50 text-ink-200 transition duration-300 group-hover:border-brand-400/50 group-hover:bg-brand-400/10 group-hover:text-brand-300">
            <Icon
              aria-hidden="true"
              size={19}
              stroke={1.7}
              className={[
                'transition-transform duration-300 motion-reduce:transform-none',
                isPrevious
                  ? 'group-hover:-translate-x-0.5'
                  : 'group-hover:translate-x-0.5',
              ].join(' ')}
            />
          </span>

          <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em]">
            {label}
          </span>
        </div>

        <h3 className="max-w-[18ch] text-balance text-xl font-bold leading-tight tracking-[-0.025em] text-ink-50 transition-colors duration-300 group-hover:text-brand-300 sm:text-2xl">
          {project.title}
        </h3>
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
    <footer className="border-t border-ink-800 pt-10 sm:pt-12">
      <div className="mb-6 flex items-end justify-between gap-6">
        <h2 className="text-xl font-bold tracking-[-0.025em] text-ink-50 sm:text-2xl">
          Más proyectos
        </h2>

        <span className="hidden font-mono text-xs uppercase tracking-[0.16em] text-ink-500 sm:block">
          Continúa explorando
        </span>
      </div>

      <nav
        aria-label="Navegación entre proyectos"
        className="grid gap-4 md:grid-cols-2"
      >
        {previousProject && (
          <div>
            <ProjectNavigationCard
              project={previousProject}
              direction="previous"
            />
          </div>
        )}

        {nextProject && (
          <div className={!previousProject ? 'md:col-start-2' : undefined}>
            <ProjectNavigationCard project={nextProject} direction="next" />
          </div>
        )}
      </nav>
    </footer>
  );
};
