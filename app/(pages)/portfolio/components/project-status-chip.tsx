import { ProjectStatus } from '@/sanity/lib/types/project.type';
import { PROJECT_STATUS_CONFIG } from '@/config/project-status.config';

export const ProjectStatusChip = ({ status }: { status: ProjectStatus }) => {
  const statusConfig = PROJECT_STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs font-medium backdrop-blur-xl ${statusConfig.className}`}
    >
      <statusConfig.icon stroke={1.6} size={20} aria-hidden="true" />

      {statusConfig.label}
    </span>
  );
};
