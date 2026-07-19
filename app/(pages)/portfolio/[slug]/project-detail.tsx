'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import { Card, CardBody, CardHeader } from '@heroui/card';
import {
  IconArrowNarrowLeft,
  IconBrandGithub,
  IconExternalLink,
  IconPlayerPlay,
} from '@tabler/icons-react';

import { Heading } from '@/components/common/heading';
import { SkillChip } from '@/components/common/skill-chip';
import { ProjectInformationType } from '@/sanity/lib/types/project.type';
import { PortableTextContent } from '@/components/common/portable-text-content';

import { ProjectStatusChip } from '../components/project-status-chip';
import { ProjectNavigation } from '../components/project-navigation-card';

const ACTION_LABELS = {
  backToPortfolio: 'Volver al portafolio',
  openProjectRepository: 'Ver código en GitHub',
  openLiveProject: 'Abrir proyecto en vivo',
} as const;

export const ProjectDetailSection = ({
  project,
  nextProject,
  previousProject,
}: {
  project: ProjectInformationType;
  previousProject?: ProjectInformationType;
  nextProject?: ProjectInformationType;
}) => {
  const liveDemoUrl = project.links?.live_demo_url ?? undefined;
  const repositoryUrl = project.links?.repository_url ?? undefined;
  const demoVideoUrl = project.project_detail.demo_video?.url ?? undefined;
  const previewImageUrl =
    project.project_information_preview.image?.url ?? undefined;

  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      <header className="flex flex-col justify-center gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-6">
            <Button
              as={Link}
              href="/portfolio"
              isIconOnly
              variant="flat"
              aria-label={ACTION_LABELS.backToPortfolio}
            >
              <IconArrowNarrowLeft stroke={1.5} />
            </Button>

            <Heading as="h1" className="min-w-0 break-words">
              {project.title}
            </Heading>

            <ProjectStatusChip status={project.status} />
          </div>

          <div className="flex self-end items-center gap-3 lg:self-auto">
            <Tooltip
              content={ACTION_LABELS.openLiveProject}
              placement="top"
              showArrow
            >
              <Button
                as="a"
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="bordered"
                isDisabled={!liveDemoUrl}
                isIconOnly
                aria-label={ACTION_LABELS.openLiveProject}
              >
                <IconExternalLink stroke={1.5} />
              </Button>
            </Tooltip>

            <Tooltip
              content={ACTION_LABELS.openProjectRepository}
              placement="top"
              showArrow
            >
              <Button
                as="a"
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="bordered"
                isDisabled={!repositoryUrl}
                isIconOnly
                aria-label={ACTION_LABELS.openProjectRepository}
              >
                <IconBrandGithub stroke={1.5} />
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="text-base leading-relaxed text-ink-100">
          <PortableTextContent
            value={project.project_detail.origin_description}
            className="[&_p]:inline"
          />
        </div>
      </header>

      <Card className="border border-ink-500/70 bg-ink-950">
        <CardHeader className="flex-wrap justify-between gap-2 border-b border-ink-500/70 px-4 py-4 sm:px-5">
          <h2 className="text-sm font-medium">Demo del proyecto</h2>

          <span className="text-xs text-ink-200">Video demostrativo</span>
        </CardHeader>

        <CardBody className="p-0">
          <figure className="mx-auto w-full max-w-none">
            {demoVideoUrl ? (
              <>
                <video
                  controls
                  playsInline
                  muted
                  preload="metadata"
                  poster={previewImageUrl}
                  aria-label={`Video demostrativo sin audio de ${project.title}`}
                  className="block aspect-video w-full bg-ink-950 object-contain lg:object-cover"
                >
                  <source src={demoVideoUrl} type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>

                <figcaption className="sr-only">
                  Video demostrativo sin audio de {project.title}. Muestra las
                  principales pantallas e interacciones del proyecto.
                </figcaption>
              </>
            ) : (
              <div className="relative aspect-video w-full overflow-hidden bg-ink-900">
                {previewImageUrl && (
                  <Image
                    src={previewImageUrl}
                    alt={`Vista previa de ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover opacity-70"
                  />
                )}

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/45 p-4 text-center sm:p-6">
                  <div className="grid size-14 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md">
                    <IconPlayerPlay stroke={1.5} />
                  </div>

                  <p className="max-w-md text-sm leading-relaxed text-white/80">
                    El video demostrativo todavía no está disponible para este
                    proyecto.
                  </p>
                </div>
              </div>
            )}
          </figure>
        </CardBody>
      </Card>

      <div className="text-base leading-relaxed">
        <PortableTextContent
          value={project.project_detail.full_description}
          className="[&_p]:inline"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {project.technologies.map((technology) => (
          <SkillChip key={technology} label={technology} />
        ))}
      </div>
      <ProjectNavigation
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </section>
  );
};
