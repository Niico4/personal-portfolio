// src/config/project-status.config.ts

import { ProjectStatus } from '@/sanity/lib/types/project.type';

export const PROJECT_STATUS_CONFIG: Record<
  ProjectStatus,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  published: {
    label: 'Publicado',
    className: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
    dotClassName: 'bg-emerald-300',
  },
  completed: {
    label: 'Finalizado',
    className: 'border-sky-400/20 bg-sky-400/10 text-sky-100',
    dotClassName: 'bg-sky-300',
  },
  inDevelopment: {
    label: 'En desarrollo',
    className: 'border-amber-400/20 bg-amber-400/10 text-amber-100',
    dotClassName: 'bg-amber-300',
  },
  concept: {
    label: 'En diseño',
    className: 'border-violet-400/20 bg-violet-400/10 text-violet-100',
    dotClassName: 'bg-violet-300',
  },
};
