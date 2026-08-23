'use client';

import { useId, useState } from 'react';
import {
  IconChevronDown,
  IconArrowUpRight,
  IconBrandGithub,
} from '@tabler/icons-react';

import { ProjectType } from '@/sanity/lib/types/project.type';

import { ProjectDemoViewer } from './project-demo-viewer';

export const ProjectCard = ({
  project,
  isInitiallyOpen = false,
}: {
  project: ProjectType;
  isInitiallyOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const detailsId = useId();

  const {
    title,
    shortDescription,
    description,
    features,
    status,
    technologies,
    links,
  } = project;

  const { demoVideo, liveURL, repositoryURL } = links;

  return (
    <div className="flex flex-col gap-1 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="text-xl text-zinc-300 sm:text-2xl">{title}</h3>
          <span
            className={`text-sm transition-colors duration-200 sm:text-base ${isOpen ? 'text-brand-400/70' : 'text-zinc-500'}`}
          >
            /
          </span>
          <p
            className={`text-xs transition-colors duration-200 sm:text-sm ${isOpen ? 'text-zinc-400' : 'text-zinc-500'}`}
          >
            {status.name}
          </p>
        </div>

        <button
          type="button"
          aria-label={`${isOpen ? 'Ocultar' : 'Mostrar'} detalles de ${title}`}
          aria-expanded={isOpen}
          aria-controls={detailsId}
          className="group -my-2 -ml-4 flex size-11 shrink-0 items-center justify-end focus-visible:outline-none"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="flex items-center rounded-full border border-gray-300/20 p-1 text-gray-400 transition-all duration-150 ease-out group-hover:border-gray-300/30 group-hover:bg-zinc-300/[0.06] group-hover:text-zinc-200 group-focus-visible:ring-1 group-focus-visible:ring-brand-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-main group-active:scale-[0.96] group-active:border-gray-300/35 group-active:bg-zinc-300/10 group-active:text-zinc-200">
            <IconChevronDown
              stroke={1.2}
              size={16}
              aria-hidden="true"
              className={`transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </button>
      </div>

      <div className="flex flex-col">
        <p className="text-zinc-400 text-sm sm:text-base">{shortDescription}</p>

        <div
          id={detailsId}
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`grid transition-[grid-template-rows,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100 duration-200' : 'grid-rows-[0fr] opacity-0 duration-150'}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col gap-3 pt-3">
              <div className="flex flex-col gap-2">
                <p className="text-zinc-400 text-sm sm:text-base">
                  {description}
                </p>

                <ul className="space-y-2 ml-2 text-zinc-400 text-sm list-disc list-inside sm:text-base">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <p className="text-zinc-500/90 text-sm sm:text-base">
                  {technologies.map(({ name }) => name).join(' · ')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {demoVideo && (
                  <ProjectDemoViewer title={title} videoSource={demoVideo} />
                )}

                {liveURL && (
                  <a
                    href={liveURL}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="group -my-2 flex h-11 items-center rounded-full focus-visible:outline-none"
                  >
                    <span className="flex items-center gap-1 rounded-full border border-brand-300/10 bg-brand-300/10 px-2 py-1 text-xs text-brand-400 transition-[color,background-color,border-color,transform] duration-150 ease-out group-hover:border-brand-300/20 group-hover:bg-brand-300/[0.14] group-hover:text-brand-300 group-focus-visible:ring-1 group-focus-visible:ring-brand-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-main group-active:translate-y-px group-active:border-brand-300/25 group-active:bg-brand-300/[0.18] motion-reduce:transform-none motion-reduce:transition-none">
                      <span>Ver sitio</span>
                      <IconArrowUpRight
                        stroke={1.2}
                        size={14}
                        aria-hidden="true"
                        className="transition-transform duration-150 ease-out group-hover:translate-x-px group-hover:-translate-y-px group-active:translate-x-0 group-active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    </span>
                  </a>
                )}

                {repositoryURL && (
                  <a
                    href={repositoryURL}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="group -my-2 flex h-11 items-center rounded-full focus-visible:outline-none"
                  >
                    <span className="flex items-center gap-1 rounded-full border border-zinc-300/[0.12] bg-zinc-300/[0.06] px-2 py-1 text-xs text-zinc-400 transition-[color,background-color,border-color,transform] duration-150 ease-out group-hover:border-zinc-300/20 group-hover:bg-zinc-300/[0.1] group-hover:text-zinc-200 group-focus-visible:ring-1 group-focus-visible:ring-brand-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-main group-active:translate-y-px group-active:border-zinc-300/25 group-active:bg-zinc-300/[0.12] motion-reduce:transform-none motion-reduce:transition-none">
                      <span>GitHub</span>
                      <IconBrandGithub
                        stroke={1.2}
                        size={14}
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
