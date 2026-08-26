'use client';

import { useId, useState } from 'react';
import { IconMinus, IconPlus } from '@tabler/icons-react';

import { WorkExperienceType } from '@/sanity/lib/types/work-experience.type';
import { calculateDuration } from '@/utils/calculate-duration';
import { getDateRange } from '@/utils/get-date-range';

export const WorkExperienceItem = ({
  experience,
}: {
  experience: WorkExperienceType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();

  const {
    description,
    features,
    name,
    role,
    endDate,
    startDate,
    isCurrentPosition,
  } = experience;

  return (
    <article className="flex">
      <div className="flex w-10 shrink-0 justify-center">
        <div className="timeline-rail flex w-0.5 flex-col items-center">
          <div className="flex h-7 items-center">
            <span
              aria-hidden="true"
              className={`size-2 shrink-0 rounded-full transition-colors duration-150 motion-reduce:transition-none ${isOpen ? 'bg-brand-400/80' : 'bg-content-muted/70'}`}
            />
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h3 className="text-xl font-medium leading-7 text-content-primary sm:text-2xl">
                {name}
              </h3>

              <p className="text-xs text-content-muted sm:text-sm">
                <span className="text-sm font-medium text-brand-400/80 sm:text-base">
                  /
                </span>{' '}
                {role}
              </p>
            </div>

            <p className="flex items-center gap-1 text-xs text-content-muted sm:text-sm">
              {getDateRange({
                startDate,
                endDate,
                isCurrent: isCurrentPosition,
              })}

              <span>·</span>

              {calculateDuration({
                startDate,
                endDate,
                isCurrent: isCurrentPosition,
              })}
            </p>
          </div>

          <button
            type="button"
            aria-label={`${isOpen ? 'Ocultar' : 'Mostrar'} detalles de ${role} en ${name}`}
            aria-expanded={isOpen}
            aria-controls={detailsId}
            onClick={() => setIsOpen((current) => !current)}
            className="group flex min-h-11 items-center focus-visible:outline-none"
          >
            <span className="flex items-center gap-1 rounded-full border border-line/10 bg-line/5 py-0.5 pl-2.5 pr-2 text-xs font-medium text-content-muted transition-all duration-150 ease-out group-hover:border-line/20 group-hover:bg-line/[0.08] group-hover:text-content-primary group-focus-visible:ring-1 group-focus-visible:ring-brand-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-main group-active:translate-y-px group-active:border-line/25 group-active:bg-line/10 group-active:text-content-primary motion-reduce:transform-none motion-reduce:transition-none">
              ver
              <span className="relative size-3" aria-hidden="true">
                <IconPlus
                  size={12}
                  stroke={1.5}
                  className={`absolute inset-0 transition-opacity duration-[120ms] ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <IconMinus
                  size={12}
                  stroke={1.5}
                  className={`absolute inset-0 transition-opacity duration-[120ms] ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                />
              </span>
            </span>
          </button>
        </div>

        <div
          id={detailsId}
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`grid transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 duration-150' : 'grid-rows-[0fr] opacity-0 duration-[120ms]'}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mt-2 text-sm text-content sm:text-base">
              <p>{description}</p>

              {features.length > 0 && (
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
