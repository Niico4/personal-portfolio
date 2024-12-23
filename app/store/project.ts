import axios from 'axios';
import { Project } from '@prisma/client';
import { create } from 'zustand';

type Store = {
  projects: Project[];
  loading: boolean;
  error: string | null;

  getProjects: () => Promise<void>;
};

export const useProjectStore = create<Store>()((set) => {
  return {
    projects: [],
    loading: false,
    error: null,

    getProjects: async () => {
      set({ loading: true, error: null });

      try {
        const { data } = await axios.get<Project[]>('/api/projects/');
        set({ projects: data, loading: false });
      } catch (error) {
        console.error(error);
        set({
          loading: false,
          error:
            'No se pudieron obtener los proyectos. Por favor, intenta nuevamente más tarde.',
        });
      }
    },
  };
});
