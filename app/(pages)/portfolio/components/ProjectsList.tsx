import React from 'react';
import { Project } from '@prisma/client';

import { EnvConfig } from '@/config/env.config';
import Title from '@/components/common/Title';

import ProjectCard from '../../../components/common/ProjectCard';

const ProjectsList = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="flex-col-center gap-10">
      <article className="flex-col-center md:w-4/5 gap-5">
        <Title title="Mi Pequeño Universo Creativo" />

        <p className="text-lg md:text-xl font-medium md:text-center text-paragraph/85">
          Aquí están algunos de mis proyectos favoritos, creados con pasión,
          creatividad y muchas líneas de código{' '}
          <span className="text-primary-200">(¡pero con amor!)</span>.
        </p>
      </article>

      <div className="flex-center flex-wrap gap-4">
        {projects.map(({ image, title, isDev, web_site }, index) => (
          <ProjectCard
            key={index}
            title={title}
            image={image}
            isDev={isDev}
            webSite={web_site ?? ''}
            urlEndpoint={EnvConfig.url_endpoint}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsList;
