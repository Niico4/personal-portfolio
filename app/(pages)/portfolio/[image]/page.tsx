'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs';
import {
  IconArrowNarrowRight,
  IconBrandGithub,
  IconExternalLink,
  IconLoader,
  IconMoodSmile,
} from '@tabler/icons-react';
import { useMediaQuery } from 'usehooks-ts';

import useProjects from '@/hooks/useProjects';
import ErrorSection from '@/components/common/ErrorSection';
import { TECHNOLOGIES_LIST } from '@/data/technologies';
import Heading from '@/components/common/Heading';

const ProjectDetail = () => {
  const { projects } = useProjects();
  const isSmallDevice = useMediaQuery('only screen and (max-width : 370px)');
  const params = useParams();
  const router = useRouter();

  const project = projects.find((project) => project.image === params.image);

  if (!project)
    return (
      <ErrorSection
        error={`Parece que el proyecto no existe o ha sido eliminado.`}
      />
    );

  const renderTech = (tech: string) => {
    const techItem = TECHNOLOGIES_LIST.find(
      (techObj) => techObj.label === tech
    );
    return techItem ? <techItem.icon className="size-full p-1" /> : null;
  };

  return (
    <>
      <section className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col items-end gap-2">
          <Breadcrumbs className="text-secondary-400 text-sm">
            <BreadcrumbItem onPress={() => router.back()}>
              Portafolio
            </BreadcrumbItem>
            <BreadcrumbItem key={project.title} isCurrent>
              {project.title}
            </BreadcrumbItem>
          </Breadcrumbs>

          <Button
            onPress={() => router.back()}
            variant="light"
            color="primary"
            className="text-primary-300"
            endContent={<IconArrowNarrowRight stroke={1.5} size={20} />}
          >
            volver
          </Button>
        </div>
        <article className="grid grid-cols-1 gap-4 md:gap-8">
          <Card className="card-bg p-4" radius="sm" isBlurred>
            <CardHeader className="flex-col items-start">
              <Heading
                title={project.title}
                type="h2"
                className="sm:text-5xl"
              />
              <Chip
                className="relative md:absolute top-2 right-2"
                color={project.isDev ? 'warning' : 'success'}
                variant="flat"
                radius="sm"
                startContent={
                  project.isDev ? (
                    <IconLoader stroke={1.5} size={20} />
                  ) : (
                    <IconMoodSmile stroke={1.5} size={20} />
                  )
                }
              >
                {project.isDev ? 'En desarrollo' : 'Completado'}
              </Chip>
            </CardHeader>
            <CardBody className="gap-4">
              <p className="text-default text-base sm:text-lg text-pretty tracking-wide">
                {project.description}
              </p>

              <div className="flex flex-col gap-4">
                <h3 className="text-soft text-xl sm:text-2xl font-semibold">
                  Creado con:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      startContent={renderTech(tech)}
                      size={isSmallDevice ? 'sm' : 'md'}
                      variant="flat"
                      radius="sm"
                    >
                      {tech}
                    </Chip>
                  ))}
                </div>
              </div>
            </CardBody>
            <CardFooter className="gap-4 ">
              <Button
                as={Link}
                href={project.web_site ?? ''}
                rel="noopener noreferrer"
                target="_blank"
                variant="solid"
                color="primary"
                aria-label="Sitio Web"
                startContent={<IconExternalLink stroke={1.5} size={20} />}
                radius="sm"
                size={isSmallDevice ? 'sm' : 'md'}
              >
                Sitio Web
              </Button>
              <Button
                as={Link}
                href={project.repository ?? ''}
                rel="noopener noreferrer"
                target="_blank"
                variant="flat"
                color="default"
                aria-label="Repositorio"
                startContent={<IconBrandGithub stroke={1.5} size={20} />}
                radius="sm"
                size={isSmallDevice ? 'sm' : 'md'}
              >
                {'Repositorio'}
              </Button>
            </CardFooter>
          </Card>
        </article>
      </section>
    </>
  );
};

export default ProjectDetail;
