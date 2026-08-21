'use client';

import { useState } from 'react';
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
        <div className="flex w-0.5 flex-col items-center bg-[repeating-linear-gradient(to_bottom,#3f3f46_0_4px,transparent_6px_8px)]">
          <div className="flex h-7 items-center">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-zinc-600"
            />
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h3 className="text-xl leading-7 text-zinc-300 sm:text-2xl">
                {name}
              </h3>

              <p className="text-xs text-zinc-400 sm:text-sm">
                <span className="text-sm font-bold text-zinc-500 sm:text-base">
                  /
                </span>{' '}
                {role}
              </p>
            </div>

            <p className="flex items-center gap-1 text-xs text-zinc-500 sm:text-sm">
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
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className="flex items-center gap-1 rounded-full border border-zinc-300/10 bg-zinc-300/5 py-0.5 pl-2.5 pr-2 text-xs font-medium text-zinc-500"
          >
            ver
            {isOpen ? (
              <IconMinus size={12} stroke={1.5} aria-hidden="true" />
            ) : (
              <IconPlus size={12} stroke={1.5} aria-hidden="true" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="mt-2 text-sm text-zinc-400 sm:text-base">
            <p>{description}</p>

            {features.length > 0 && (
              <ul className="mt-2 list-disc space-y-2 pl-5">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
