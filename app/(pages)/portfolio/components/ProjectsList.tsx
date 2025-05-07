import React from 'react';
import { Project } from '@prisma/client';

import { EnvConfig } from '@/config/env.config';
import SubTitle from '@/components/common/Heading';
import ProjectCard from '@/components/common/ProjectCard';

const ProjectsList = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="flex flex-col justify-center gap-10">
      <article className="flex-col-center lg:mx-auto lg:w-[90%] gap-4">
        <SubTitle title="Mi Pequeño Universo Creativo" type="h1" />

        <p className="text-base md:text-lg text-center text-soft">
          Aquí están algunos de mis proyectos favoritos, creados con pasión,
          creatividad y muchas líneas de código{' '}
          <span className="text-primary-200">(¡pero con amor!)</span>.
        </p>
      </article>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-5">
        {projects.map(({ image, title, isDev, web_site, slug }, index) => (
          <ProjectCard
            key={index}
            title={title}
            image={image}
            isDev={isDev}
            webSite={web_site ?? ''}
            urlEndpoint={EnvConfig.url_endpoint}
            slug={slug}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsList;
