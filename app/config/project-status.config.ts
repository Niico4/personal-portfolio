import {
  Icon,
  IconProgress,
  IconProgressBolt,
  IconProgressCheck,
  IconProgressHelp,
} from '@tabler/icons-react';

import { ProjectStatus } from '@/sanity/lib/types/project.type';

export const PROJECT_STATUS_CONFIG: Record<
  ProjectStatus,
  {
    label: string;
    className: string;
    icon: Icon;
  }
> = {
  published: {
    label: 'Publicado',
    className: 'border-[#0AD2F5]/50 bg-[#0BD2F5]/20 text-[#0AD2F5]',
    icon: IconProgressBolt,
  },
  completed: {
    label: 'Completado',
    className: 'border-[#069381] bg-[#2DD4BF]/20 text-[#2DD4BF]',
    icon: IconProgressCheck,
  },
  inDevelopment: {
    label: 'En desarrollo',
    className: 'border-[#F59F0B]/50 bg-[#F59F0B]/20 text-[#F59F0B]',
    icon: IconProgress,
  },
  concept: {
    label: 'En diseño',
    className: 'border-[#B59DFB]/50 bg-[#460BF5]/20 text-[#B59DFB]',
    icon: IconProgressHelp,
  },
};
