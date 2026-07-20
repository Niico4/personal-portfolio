'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/button';
import {
  IconArrowNarrowLeft,
  IconBrandGithub,
  IconExternalLink,
} from '@tabler/icons-react';

import { Heading } from '@/components/common/heading';
import { SkillChip } from '@/components/common/skill-chip';
import { PortableTextContent } from '@/components/common/portable-text-content';
import { Project } from '@/sanity/lib/types/project.type';

import { ProjectStatusChip } from '../components/project-status-chip';
import { ProjectNavigation } from '../components/project-navigation-card';

type ProjectDetailSectionProps = {
  project: Project;
  previousProject?: Project;
  nextProject?: Project;
};

type ProjectSectionHeadingProps = {
  id: string;
  number: number;
  title: string;
  metadata?: ReactNode;
};

type ProjectSectionProps = {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
};

const PROJECT_INTRO_STYLES = `
  space-y-4
  text-pretty
  text-base
  leading-7
  text-ink-200

  [&_p]:m-0

  [&_strong]:font-semibold
  [&_strong]:text-ink-50

`;

const PROJECT_CONTENT_STYLES = `
  space-y-6
  text-base
  leading-8
  text-ink-200

  [&_p]:m-0

  [&_strong]:font-semibold
  [&_strong]:text-ink-50

  [&_h2]:mt-10
  [&_h2]:text-2xl
  [&_h2]:font-bold
  [&_h2]:tracking-[-0.025em]
  [&_h2]:text-ink-50

  [&_h3]:mt-8
  [&_h3]:text-xl
  [&_h3]:font-semibold
  [&_h3]:tracking-[-0.02em]
  [&_h3]:text-ink-50

  [&_ul]:my-6
  [&_ul]:space-y-3
  [&_ul]:pl-5

  [&_ol]:my-6
  [&_ol]:space-y-3
  [&_ol]:pl-5

  [&_li]:pl-1
  [&_li]:marker:text-brand-400

  [&_a]:font-medium
  [&_a]:text-brand-300
  [&_a]:underline
  [&_a]:underline-offset-4

  sm:text-[1.0625rem]
`;

const formatSectionNumber = (number: number) => String(number).padStart(2, '0');

const ProjectSectionHeading = ({
  id,
  number,
  title,
  metadata,
}: ProjectSectionHeadingProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="inline-flex h-8 min-w-12 shrink-0 items-center justify-center rounded-lg border border-brand-400/30 bg-brand-400/10 px-2 font-mono text-xs font-semibold tracking-[0.14em] text-brand-300"
        >
          {formatSectionNumber(number)}
        </span>

        <h3
          id={id}
          className="text-balance text-2xl font-bold leading-tight tracking-[-0.025em] text-ink-50 sm:text-3xl"
        >
          {title}
        </h3>
      </div>

      {metadata && (
        <div className="pl-16 text-xs text-ink-300 sm:pl-0">{metadata}</div>
      )}
    </div>
  );
};

const ProjectSection = ({
  id,
  number,
  title,
  children,
}: ProjectSectionProps) => {
  return (
    <section aria-labelledby={id} className="py-12 sm:py-16">
      <ProjectSectionHeading id={id} number={number} title={title} />

      <div className="mt-7 max-w-[68ch] sm:ml-16">{children}</div>
    </section>
  );
};

export const ProjectDetailSection = ({
  project,
  nextProject,
  previousProject,
}: ProjectDetailSectionProps) => {
  const preview = project.preview;
  const detail = project.detail;

  const liveDemoUrl = project.links.liveDemoUrl;
  const repositoryUrl = project.links.repositoryUrl;

  const demoVideoUrl = detail.demoVideoUrl;
  const previewImageUrl = preview.image?.url;

  const [originSection, ...contentSections] = detail.contentSections;

  const hasDemoVideo = Boolean(demoVideoUrl);
  const hasTechnologies = project.technologies.length > 0;

  const primaryTechnologies = project.technologies.slice(0, 4);

  const firstContentSectionNumber = hasDemoVideo ? 2 : 1;

  const technologiesSectionNumber =
    firstContentSectionNumber + contentSections.length;

  const hasProjectContent = contentSections.length > 0 || hasTechnologies;

  return (
    <section className="flex flex-col gap-14 sm:gap-16">
      <header>
        <Link
          href="/portfolio"
          className="group inline-flex h-10 w-fit items-center gap-2 rounded-full border border-ink-800 bg-ink-950/60 px-4 text-sm font-medium text-ink-200 transition duration-300 hover:border-ink-600 hover:bg-ink-900 hover:text-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-main"
        >
          <IconArrowNarrowLeft
            aria-hidden="true"
            size={18}
            stroke={1.8}
            className="transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none"
          />
          Volver a proyectos
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <Heading
              as="h1"
              className="max-w-[15ch] break-normal text-balance text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.045em]"
            >
              {project.title}
            </Heading>

            {originSection && (
              <div className="mt-6 max-w-2xl">
                <span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
                  {originSection.title}
                </span>

                <PortableTextContent
                  value={originSection.content}
                  className={PROJECT_INTRO_STYLES}
                />
              </div>
            )}

            {(liveDemoUrl || repositoryUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {liveDemoUrl && (
                  <Button
                    as="a"
                    href={liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    endContent={
                      <IconExternalLink
                        aria-hidden="true"
                        size={17}
                        stroke={1.7}
                      />
                    }
                  >
                    Ver proyecto
                  </Button>
                )}

                {repositoryUrl && (
                  <Button
                    as="a"
                    href={repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="bordered"
                    endContent={
                      <IconBrandGithub
                        aria-hidden="true"
                        size={17}
                        stroke={1.7}
                      />
                    }
                  >
                    Ver código
                  </Button>
                )}
              </div>
            )}
          </div>

          <dl className="grid gap-7 border-t border-ink-800 pt-7 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-500">
                Estado
              </dt>

              <dd className="mt-3">
                <ProjectStatusChip status={project.status} />
              </dd>
            </div>

            {primaryTechnologies.length > 0 && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-500">
                  Stack principal
                </dt>

                <dd className="mt-3 text-sm leading-6 text-ink-200">
                  {primaryTechnologies.join(' · ')}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      {demoVideoUrl && (
        <section aria-labelledby="project-demo-title">
          <ProjectSectionHeading
            id="project-demo-title"
            number={1}
            title="Así funciona"
            metadata="Video demostrativo sin audio"
          />

          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-ink-800 bg-ink-950">
            <figure>
              <video
                controls
                playsInline
                muted
                preload="metadata"
                poster={previewImageUrl}
                aria-label={`Video demostrativo sin audio de ${project.title}`}
                className="block aspect-video w-full object-cover"
              >
                <source src={demoVideoUrl} />
                Tu navegador no soporta la reproducción de video.
              </video>

              <figcaption className="sr-only">
                Video demostrativo sin audio de {project.title}. Muestra sus
                principales pantallas e interacciones.
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {hasProjectContent && (
        <article>
          {contentSections.map((section, index) => {
            const sectionNumber = firstContentSectionNumber + index;

            const sectionId = `project-section-${section.id}`;

            return (
              <ProjectSection
                key={section.id}
                id={sectionId}
                number={sectionNumber}
                title={section.title}
              >
                <PortableTextContent
                  value={section.content}
                  className={PROJECT_CONTENT_STYLES}
                />
              </ProjectSection>
            );
          })}

          {hasTechnologies && (
            <ProjectSection
              id="project-technologies"
              number={technologiesSectionNumber}
              title="Tecnologías y herramientas"
            >
              <ul
                aria-label={`Tecnologías utilizadas en ${project.title}`}
                className="flex flex-wrap gap-3"
              >
                {project.technologies.map((technology) => (
                  <li key={technology}>
                    <SkillChip label={technology} />
                  </li>
                ))}
              </ul>
            </ProjectSection>
          )}
        </article>
      )}

      <ProjectNavigation
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </section>
  );
};
