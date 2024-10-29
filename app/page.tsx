'use client';

import { useEffect } from 'react';

import { useProjectStore } from './store/project';

export default function Home() {
  const getProjects = useProjectStore((state) => state.getProjects);
  const projects = useProjectStore((state) => state.projects);
  const loading = useProjectStore((state) => state.loading);
  const error = useProjectStore((state) => state.error);

  useEffect(() => {
    const fetchProjects = async () => {
      await getProjects();
    };

    fetchProjects();
  }, [getProjects]);

  return (
    <div>
      {loading && <p className="text-white">Cargando proyectos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {projects?.map((project, index) => (
        <div key={index} className="mb-10">
          <p className="text-white">{project.title}</p>
          <p className="text-white">{project.description}</p>
          <p className="text-white">{project.image}</p>
          <p className="text-white">{project.repository}</p>
          <p className="text-white">{project.technologies}</p>
          <p className="text-white">{project.web_site}</p>
        </div>
      ))}
    </div>
  );
}
