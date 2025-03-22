'use client';

import React from 'react';
import { Grandstander } from 'next/font/google';
import Link from 'next/link';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Button } from '@heroui/button';

import { EnvConfig } from '@/config/env.config';
import useProjects from '@/hooks/useProjects';
import ProjectCard from '@/components/common/ProjectCard';
import LoaderGhost from '@/components/common/LoaderGhost';
import ErrorSection from '@/components/common/ErrorSection';
import SubTitle from '@/components/common/Heading';

export const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const RecentProjectsSection = () => {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <section className="flex-col-center gap-6 mt-40">
        <LoaderGhost />
        <h4
          className={`${grandstander.className} text-2xl text-center text-subtitle`}
        >
          Invocando mis creaciones...
        </h4>
      </section>
    );
  }

  if (!loading && (error || projects.length === 0))
    return (
      <ErrorSection
        error={error ?? '¡Ups! No tenemos proyectos disponibles por ahora'}
        reload
      />
    );

  return (
    <section className="flex flex-col justify-center gap-8">
      <SubTitle
        type="h2"
        title="Mis proyectos destacados"
        className="text-center"
      />

      <article className="grid gap-8 sm:grid-cols-2 sm:gap-5">
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
      </article>

      <article className="flex-col-center">
        <Button
          as={Link}
          href="/portfolio"
          variant="light"
          color="primary"
          className="text-primary-300"
          radius="full"
          endContent={<IconArrowNarrowRight stroke={1.5} size={20} />}
        >
          Ver más
        </Button>
      </article>
    </section>
  );
};

export default RecentProjectsSection;
