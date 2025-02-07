import { useEffect } from 'react';

import { useProjectStore } from '@/store/useProjectsStore';

const useProjects = () => {
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

  return {
    projects,
    loading,
    error,
  };
};

export default useProjects;
