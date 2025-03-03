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
      set((state) => {
        if (state.projects.length > 0) return state;

        return { loading: true, error: null };
      });

      try {
        const { data } = await axios.get<Project[]>('/api/projects/');
        set({ projects: data, loading: false });
      } catch (error) {
        console.error(error);

        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'No se pudieron obtener mis proyectos. Por favor, intenta nuevamente.';

        set({
          loading: false,
          error: errorMessage,
        });
      }
    },
  };
});
