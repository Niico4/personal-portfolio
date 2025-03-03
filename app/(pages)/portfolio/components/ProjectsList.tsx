import React from 'react';
import { Grandstander } from 'next/font/google';
import { Project } from '@prisma/client';

import { EnvConfig } from '@/config/env.config';

import ProjectCard from '../../../components/common/CardProject';

const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const ProjectsList = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="flex-col-center gap-10">
      <article className="flex-col-center md:w-4/5 gap-5">
        <h2
          className={`${grandstander.className} text-title text-3xl md:text-4xl font-medium text-center`}
        >
          Mi Pequeño Universo Creativo
        </h2>

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
