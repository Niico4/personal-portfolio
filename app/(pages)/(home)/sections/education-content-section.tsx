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
    className: 'border-yellow-400/15 bg-yellow-400/[0.08] text-yellow-400',
  },
  onHold: {
    label: 'Pausado',
    className: 'border-orange-400/15 bg-orange-400/[0.08] text-orange-400',
  },
  completed: {
    label: 'Completado',
    className: 'border-green-400/15 bg-green-400/[0.08] text-green-400',
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
              <div className="flex flex-col items-start justify-start gap-2 border-l border-line/15 py-1 pl-4">
                <time className="text-xs text-content-muted sm:text-sm">
                  {getYearRange({ startDate, endDate, isCurrent })}
                </time>
                <h3 className="font-medium text-content-primary sm:text-lg">
                  {academicTitle}
                </h3>

                <div className="w-full flex gap-4 items-center justify-between">
                  <div className="text-xs text-content sm:text-sm">
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
                <hr className="my-4 h-px w-full shrink-0 border-none bg-line/10" />
              )}
            </div>
          );
        },
      )}
    </div>
  );
};
