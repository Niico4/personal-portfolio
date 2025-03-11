'use client';

import React, { useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import Image from 'next/image';
import { Grandstander } from 'next/font/google';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Skeleton } from '@heroui/skeleton';
import {
  IconArrowNarrowRight,
  IconBrandGithub,
  IconCircleCheckFilled,
  IconExternalLink,
  IconLoader,
} from '@tabler/icons-react';

import useProjects from '@/hooks/useProjects';
import ErrorSection from '@/components/common/ErrorSection';
import { EnvConfig } from '@/config/env.config';
import { TECHNOLOGIES_LIST } from '@/data/technologies';

const grandstander = Grandstander({
  display: 'swap',
  subsets: ['latin'],
});

const ProjectDetail = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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

  const urlEndpoint = EnvConfig.url_endpoint;
  const timestamp = new Date().getTime();
  const srcImage = `${urlEndpoint}${project.image}.webp?=${timestamp}`;

  const renderTech = (tech: string) => {
    const techItem = TECHNOLOGIES_LIST.find(
      (techObj) => techObj.label === tech
    );
    return techItem ? <techItem.icon className="size-full p-1" /> : null;
  };

  return (
    <section className="flex-col-center gap-4 md:gap-8">
      <Card
        className="card-bg p-2 md:p-8 w-full h-full aspect-video flex-center"
        radius="sm"
      >
        <Skeleton isLoaded={isImageLoaded} className="rounded-lg">
          <Image
            src={srcImage}
            width={900}
            height={600}
            onLoad={() => setIsImageLoaded(true)}
            alt={project.image}
            className="w-full h-full aspect-video object-cover rounded-lg opacity-90"
          />
        </Skeleton>
      </Card>

      <article className="grid grid-cols-1 lg:grid-cols-[1fr_30%] gap-4 md:gap-8">
        <Card
          className="card-bg md:p-10 min-[1400px]:px-2 max-[1500px]:px-2"
          radius="sm"
        >
          <CardHeader className="max-sm:flex-col max-sm:items-start justify-between">
            <h2
              className={`${grandstander.className} text-3xl md:text-5xl font-bold text-title`}
            >
              {project.title}
            </h2>
            <Chip
              className="md:absolute top-2 right-2"
              color={project.isDev ? 'warning' : 'success'}
              variant="flat"
              radius="sm"
              startContent={
                project.isDev ? (
                  <IconLoader stroke={1.5} size={20} />
                ) : (
                  <IconCircleCheckFilled size={20} />
                )
              }
            >
              {project.isDev ? 'En desarrollo' : 'Completado'}
            </Chip>
          </CardHeader>
          <CardBody>
            <p className="text-muted text-medium md:text-lg">
              {project.description}
            </p>
          </CardBody>
          <CardFooter className="gap-4">
            <Button
              as={Link}
              href={project.web_site ?? ''}
              rel="noopener noreferrer"
              target="_blank"
              variant="solid"
              color="default"
              aria-label="Sitio Web"
              startContent={<IconExternalLink stroke={1.5} />}
              radius="sm"
              isIconOnly={isSmallDevice}
            >
              {!isSmallDevice && 'Sitio Web'}
            </Button>
            <Button
              as={Link}
              href={project.repository ?? ''}
              rel="noopener noreferrer"
              target="_blank"
              variant="flat"
              color="default"
              aria-label="Repositorio"
              startContent={<IconBrandGithub stroke={1.5} />}
              radius="sm"
              isIconOnly={isSmallDevice}
            >
              {!isSmallDevice && 'Repositorio'}
            </Button>
          </CardFooter>
        </Card>

        <Card className="justify-between card-bg p-4 gap-4" radius="sm">
          <div className="flex flex-col gap-3">
            <h3 className="text-faint text-xl md:text-2xl font-semibold">
              Creado con:
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Chip
                  key={index}
                  startContent={renderTech(tech)}
                  variant="flat"
                  radius="sm"
                >
                  {tech}
                </Chip>
              ))}
            </div>
          </div>
          <Button
            onPress={() => router.back()}
            variant="faded"
            color="primary"
            endContent={<IconArrowNarrowRight stroke={1.5} />}
            radius="sm"
          >
            Volver
          </Button>
        </Card>
      </article>
    </section>
  );
};

export default ProjectDetail;
