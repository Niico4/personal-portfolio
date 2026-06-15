import { ProjectStatus } from '@/sanity/lib/types/project.type';
import { PROJECT_STATUS_CONFIG } from '@/config/project-status.config';

export const ProjectStatusChip = ({
  status,
  className = '',
}: {
  status: ProjectStatus;
  className?: string;
}) => {
  const statusConfig = PROJECT_STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex h-8 items-center gap-2 rounded-full border px-3 text-xs font-medium backdrop-blur-xl ${statusConfig.className} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${statusConfig.dotClassName}`} />
      {statusConfig.label}
    </span>
  );
};
