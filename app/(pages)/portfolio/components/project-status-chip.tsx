import {
  Icon,
  IconProgressBolt,
  IconProgressCheck,
  IconProgress,
  IconProgressHelp,
} from '@tabler/icons-react';

import { ProjectStatus } from '@/sanity/lib/types/project.type';
interface ProjectStatusProps {
  label: string;
  className: string;
  icon: Icon;
}

const PROJECT_STATUS_VARIANTS: Record<ProjectStatus, ProjectStatusProps> = {
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

export const ProjectStatusChip = ({ status }: { status: ProjectStatus }) => {
  const statusConfig = PROJECT_STATUS_VARIANTS[status];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs font-medium backdrop-blur-xl ${statusConfig.className}`}
    >
      <statusConfig.icon stroke={1.6} size={20} aria-hidden="true" />

      {statusConfig.label}
    </span>
  );
};
