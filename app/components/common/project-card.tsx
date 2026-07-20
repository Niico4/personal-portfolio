'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { IconArrowUpRight } from '@tabler/icons-react';

import { ProjectStatusChip } from '@/(pages)/portfolio/components/project-status-chip';
import { Project } from '@/sanity/lib/types/project.type';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { title, slug, status, preview } = project;

  const href = `/portfolio/${slug}` as Route;
  const projectNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="group h-full">
      <Link
        href={href}
        className="grid h-full grid-cols-[minmax(0,1fr)_3rem] overflow-hidden rounded-[1.5rem] border border-ink-800 bg-main outline-none transition duration-300 hover:-translate-y-0.5 hover:border-ink-600 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-main motion-reduce:transform-none"
      >
        <div className="flex flex-col">
          <div className="relative mx-3 mt-3 aspect-[16/9] overflow-hidden rounded-[1.1rem] bg-ink-950 sm:mx-4 sm:mt-4">
            <Image
              fill
              preload={true}
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={preview.image?.url ?? '/coming-soon.webp'}
              alt=""
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
            />
          </div>

          <div className="px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
            <h3 className="text-xl font-bold leading-tight tracking-[-0.025em] text-ink-50 transition-colors duration-300 group-hover:text-brand-300 group-focus-visible:text-brand-300 sm:text-2xl">
              {title}
            </h3>

            <p className="mt-2 line-clamp-3 text-sm leading-5 text-ink-200">
              {preview.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-col items-center border-l border-ink-800 bg-ink-950/25 transition-colors duration-300 group-hover:bg-brand-500/[0.06] group-focus-visible:bg-brand-500/[0.06]">
          <span
            aria-hidden="true"
            className="pt-4 font-mono text-[0.65rem] font-medium tracking-[0.16em] text-ink-500"
          >
            {projectNumber}
          </span>

          <div className="flex min-h-0 flex-1 items-center justify-center">
            <div className="rotate-90 whitespace-nowrap">
              <ProjectStatusChip status={status} />
            </div>
          </div>

          <span
            aria-hidden="true"
            className="mb-4 grid size-8 shrink-0 place-items-center rounded-full border border-ink-700 bg-main/40 text-ink-200 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-main group-focus-visible:border-brand-400 group-focus-visible:bg-brand-400 group-focus-visible:text-main"
          >
            <IconArrowUpRight size={16} stroke={1.8} />
          </span>
        </div>
      </Link>
    </div>
  );
};
