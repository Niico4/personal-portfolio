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

import { ProjectStatusChip } from '../components/project-status-chip';
import { ProjectNavigation } from '../components/project-navigation-card';

import Heading from '@/components/common/heading';
import { SkillChip } from '@/components/common/skill-chip';
import { ProjectInformationType } from '@/sanity/lib/types/project.type';

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
    <section className="flex flex-col gap-10">
      <header className="flex flex-col justify-center gap-5">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Button
              as={Link}
              href="/portfolio"
              isIconOnly
              variant="flat"
              aria-label={ACTION_LABELS.backToPortfolio}
            >
              <IconArrowNarrowLeft stroke={1.5} />
            </Button>

            <Heading as="h1">{project.title}</Heading>

            <ProjectStatusChip status={project.status} />
          </div>

          <div className="flex items-center gap-3">
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

        <p className="text-base leading-relaxed text-ink-100">
          {project.project_detail.origin_description}
        </p>
      </header>

      <Card className="border border-ink-500/70 bg-ink-950">
        <CardHeader className="justify-between border-b border-ink-500/70 px-5 py-4">
          <h2 className="text-sm font-medium">Demo del proyecto</h2>

          <span className="text-xs text-ink-200">Video demostrativo</span>
        </CardHeader>

        <CardBody className="p-0">
          {demoVideoUrl ? (
            <video
              src={demoVideoUrl}
              controls
              playsInline
              muted
              preload="metadata"
              poster={previewImageUrl}
              className="aspect-video w-full bg-ink-950 object-cover"
            >
              Tu navegador no soporta la reproducción de video.
            </video>
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

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/45 p-6 text-center">
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
        </CardBody>
      </Card>

      <p className="text-base leading-relaxed">
        {project.project_detail.full_description}
      </p>

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
