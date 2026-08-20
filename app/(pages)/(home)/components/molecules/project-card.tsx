'use client';

import { useState } from 'react';
import {
  IconChevronUp,
  IconChevronDown,
  IconArrowUpRight,
  IconBrandGithub,
  IconPlayerPlay,
} from '@tabler/icons-react';

import { ProjectType } from '@/sanity/lib/types/project.type';

export const ProjectCard = ({ project }: { project: ProjectType }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <span className="text-zinc-500 text-sm sm:text-base">/</span>
          <p className="text-zinc-500 text-xs sm:text-sm">{status.name}</p>
        </div>

        <button
          className="flex items-center text-gray-400 p-1 border border-gray-300/20 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <IconChevronUp stroke={1.2} size={16} aria-hidden="true" />
          ) : (
            <IconChevronDown stroke={1.2} size={16} aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-zinc-400 text-sm sm:text-base">{shortDescription}</p>

        {isOpen && (
          <div className="flex flex-col gap-2">
            <p className="text-zinc-400 text-sm sm:text-base">{description}</p>

            <ul className="space-y-2 ml-2 text-zinc-400 text-sm list-disc list-inside sm:text-base">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <ul className="text-zinc-500/90 text-sm sm:text-base">
              {technologies.map(({ name }) => name).join(' · ')}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-3">
          {demoVideo && (
            <a
              href={demoVideo}
              rel="noopener noreferrer"
              target="_blank"
              className="flex items-center gap-1 bg-indigo-300/10 border-1 border-indigo-300/10 text-xs text-indigo-400 font- px-2 py-1 rounded-full"
            >
              <span>Ver demo</span>
              <IconPlayerPlay stroke={1.2} size={14} aria-hidden="true" />
            </a>
          )}

          {liveURL && (
            <a
              href={liveURL}
              rel="noopener noreferrer"
              target="_blank"
              className="flex items-center gap-1 bg-brand-300/10 border-1 border-brand-300/10 text-xs text-brand-400 font- px-2 py-1 rounded-full"
            >
              <span>Ver sitio</span>
              <IconArrowUpRight stroke={1.2} size={14} aria-hidden="true" />
            </a>
          )}

          {repositoryURL && (
            <a
              href={repositoryURL}
              rel="noopener noreferrer"
              target="_blank"
              className="flex items-center gap-1 bg-zinc-300/[0.06] border-1 border-zinc-300/[0.12] text-xs text-zinc-400 font- px-2 py-1 rounded-full"
            >
              <span>GitHub</span>
              <IconBrandGithub stroke={1.2} size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
