'use client';

import React from 'react';
import { Grandstander } from 'next/font/google';

import useProjects from '@/hooks/useProjects';
import ErrorSection from '@/components/common/ErrorSection';
import LoaderGhost from '@/components/common/LoaderGhost';

import ProjectsList from '../components/ProjectsList';

const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});
const ProjectsSection = () => {
  const { projects, loading, error } = useProjects();

  if (loading)
    return (
      <section className="flex-col-center gap-6 mt-40">
        <LoaderGhost />
        <h4
          className={`${grandstander.className} text-2xl text-center text-faint`}
        >
          Invocando mis creaciones...
        </h4>
      </section>
    );

  if (!loading && (error || projects.length === 0))
    return (
      <ErrorSection
        error={error ?? '¡Ups! No tenemos proyectos disponibles por ahora'}
        reload
      />
    );

  return <ProjectsList projects={projects} />;
};

export default ProjectsSection;
