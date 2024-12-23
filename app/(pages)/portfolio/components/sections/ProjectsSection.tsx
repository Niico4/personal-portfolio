'use client';

import React from 'react';

import useProjects from '@/hooks/useProjects';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

import ProjectCard from '../CardProject';

const ProjectsSection = () => {
  const { projects, loading, error } = useProjects();
  const urlEndpoint =
    process.env.NEXT_PUBLIC_URL_ENDPOINT ?? 'https://ik.imagekit.io/0isq9u6sl/';

  if (loading) return <Loading />;

  if (error && projects.length === 0)
    return <Error error={error ?? 'No se encontraron Proyectos'} />;

  return (
    <section className="flex flex-col gap-10">
      <h2 className="text-IColorPrimary text-4xl font-semibold mx-auto">
        Mis Proyectos
      </h2>
      <div className="grid lg:grid-cols-2 gap-10">
        {projects.map(
          (
            { image, title, description, repository, technologies, web_site },
            index
          ) => (
            <ProjectCard
              key={index}
              title={title}
              description={description}
              image={image}
              webSite={web_site ?? ''}
              repository={repository ?? ''}
              technologies={technologies}
              urlEndpoint={urlEndpoint}
            />
          )
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
