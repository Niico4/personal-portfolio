import { ProfileType } from '@/sanity/lib/types/profile.type';
import { EducationStatusType } from '@/sanity/schemaTypes/profile';
import { getYearRange } from '@/utils/get-year-range';

const EDUCATION_STATUS_MAP: Record<
  EducationStatusType,
  {
    label: string;
    className: string;
  }
> = {
  inProgress: {
    label: 'En curso',
    className: 'bg-yellow-700/10 border-yellow-700/10 text-yellow-700',
  },
  onHold: {
    label: 'Pausado',
    className: 'bg-orange-700/10 border-orange-700/10 text-orange-700',
  },
  completed: {
    label: 'Completado',
    className: 'bg-green-700/10 border-green-700/10 text-green-700',
  },
};

export const EducationContent = ({
  educationList,
}: {
  educationList: ProfileType['education'];
}) => {
  return (
    <div className="flex flex-col">
      {educationList.map(
        (
          {
            id,
            academicTitle,
            details,
            endDate,
            institutionName,
            startDate,
            status,
          },
          index,
        ) => {
          const isCurrent = status === 'inProgress';
          const statusConfig = EDUCATION_STATUS_MAP[status];

          return (
            <div className="flex flex-col" key={id}>
              <div className="flex flex-col gap-2 items-start justify-start border-l border-zinc-500 pl-4 py-1">
                <time className="text-xs text-zinc-500 sm:text-sm">
                  {getYearRange({ startDate, endDate, isCurrent })}
                </time>
                <h3 className="text-zinc-300 sm:text-lg">{academicTitle}</h3>

                <div className="w-full flex gap-4 items-center justify-between">
                  <div className="text-xs text-zinc-400 sm:text-sm">
                    <p>{institutionName}</p>

                    <span>{details}</span>
                  </div>

                  <span
                    className={`shrink-0 whitespace-nowrap border text-xs px-2 py-0.5 rounded-full ${statusConfig.className}`}
                  >
                    {statusConfig.label}
                  </span>
                </div>
              </div>

              {index !== educationList.length - 1 && (
                <hr className="shrink-0 bg-zinc-900 border-none w-full h-[1px] my-4" />
              )}
            </div>
          );
        },
      )}
    </div>
  );
};
