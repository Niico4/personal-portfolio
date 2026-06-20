'use client';

import { useId, useState } from 'react';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { IconChevronsDown } from '@tabler/icons-react';

import { SkillChip } from '@/components/common/skill-chip';

interface JobExperienceContentProps {
  jobTitle: string;
  employmentTypeLabel: string;
  dateRange: string;
  duration?: string | null;
  highlights?: string[] | null;
  skills?: string[] | null;
}

export const JobExperienceContent = ({
  jobTitle,
  employmentTypeLabel,
  dateRange,
  duration,
  highlights,
  skills,
}: JobExperienceContentProps) => {
  const [showHighlights, setShowHighlights] = useState(false);
  const highlightsId = useId();

  const hasHighlights = Boolean(highlights?.length);
  const hasSkills = Boolean(skills?.length);

  return (
    <div
      className={`flex w-full flex-col ${showHighlights ? 'gap-4' : 'gap-2'}`}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h4 className="text-lg text-ink-200">{jobTitle}</h4>

          <div className="flex h-5 items-center gap-2 text-sm text-ink-300">
            <p>{employmentTypeLabel}</p>

            <Divider className="bg-ink-700" orientation="vertical" />

            <p>{dateRange}</p>

            {duration && (
              <>
                <Divider className="bg-ink-700" orientation="vertical" />
                <p>{duration}</p>
              </>
            )}
          </div>
        </div>

        {hasHighlights && (
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            aria-label={showHighlights ? 'Ocultar logros' : 'Mostrar logros'}
            aria-expanded={showHighlights}
            aria-controls={highlightsId}
            onPress={() => setShowHighlights((currentValue) => !currentValue)}
            startContent={
              <IconChevronsDown
                stroke={1.8}
                className={`transition-transform duration-300 ${
                  showHighlights ? 'rotate-180' : 'rotate-0'
                }`}
              />
            }
          />
        )}
      </div>

      {hasHighlights && (
        <div
          id={highlightsId}
          className={`grid transition-all duration-300 ease-in-out ${
            showHighlights
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <ul className="flex min-h-0 flex-col gap-1 overflow-hidden text-ink-200">
            {highlights?.map((highlight) => (
              <li key={highlight}>• {highlight}</li>
            ))}
          </ul>
        </div>
      )}

      {hasSkills && (
        <div className="flex flex-wrap items-center gap-4">
          {skills?.map((skill) => (
            <SkillChip key={skill} label={skill} />
          ))}
        </div>
      )}
    </div>
  );
};
