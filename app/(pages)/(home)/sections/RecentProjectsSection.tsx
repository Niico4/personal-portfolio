'use client';

import React from 'react';
import { Grandstander } from 'next/font/google';
import Link from 'next/link';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';

import { EnvConfig } from '@/config/env.config';
import useProjects from '@/hooks/useProjects';
import ProjectCard from '@/components/common/ProjectCard';
import LoaderGhost from '@/components/common/LoaderGhost';
import ErrorSection from '@/components/common/ErrorSection';
import Title from '@/components/common/Title';

export const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const RecentProjectsSection = () => {
  const { projects, loading, error } = useProjects();

  if (loading)
    return (
      <section className="flex-col-center gap-6 mt-40">
        <LoaderGhost />
        <h4 className={`${grandstander.className} text-2xl text-paragraph/95`}>
          Invocando mis creaciones...
        </h4>
      </section>
    );

  if (error || projects.length === 0)
    return (
      <ErrorSection
        error={error ?? '¡Ups! No tenemos proyectos disponibles por ahora'}
      />
    );

  return (
    <Card className="card-bg">
      <CardHeader className="justify-center">
        <Title title="Mis proyectos destacados" />
      </CardHeader>

      <CardBody className="flex-col flex-wrap justify-center gap-4 md:flex-row">
        {projects
          .slice(0, 2)
          .map(({ image, title, isDev, web_site }, index) => (
            <ProjectCard
              key={index}
              title={title}
              image={image}
              isDev={isDev}
              webSite={web_site ?? ''}
              urlEndpoint={EnvConfig.url_endpoint}
            />
          ))}
      </CardBody>

      <CardFooter className="justify-center">
        <Button
          as={Link}
          href="/portfolio"
          variant="light"
          color="primary"
          endContent={<IconArrowNarrowRight />}
        >
          Ver más
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentProjectsSection;
