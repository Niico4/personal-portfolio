'use client';

import { useId, useState } from 'react';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { IconCaretDown } from '@tabler/icons-react';
import { PortableTextBlock } from '@portabletext/types';
import { AnimatePresence, motion } from 'framer-motion';

import { SkillChip } from '@/components/common/skill-chip';

import { PortableTextContent } from '../common/portable-text-content';
interface JobExperienceContentProps {
  jobTitle: string;
  employmentTypeLabel: string;
  dateRange: string;
  duration?: string | null;
  highlights?: PortableTextBlock[] | null;
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
  const [isOpen, setIsOpen] = useState(false);
  const highlightsId = useId();

  const hasHighlights = Boolean(highlights?.length);
  const hasSkills = Boolean(skills?.length);

  return (
    <div className={`flex w-full flex-col ${isOpen ? 'gap-4' : 'gap-2'}`}>
      <div className="flex w-full items-start justify-between gap-4 sm:items-center">
        <div className="flex min-w-0 flex-col gap-1">
          <h4 className="text-lg text-ink-200">{jobTitle}</h4>

          <div className="flex h-auto flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-300 sm:h-5">
            <p className="whitespace-nowrap">{employmentTypeLabel}</p>

            <Divider
              className="hidden bg-ink-700 sm:block"
              orientation="vertical"
            />

            <p className="whitespace-nowrap">{dateRange}</p>

            {duration && (
              <>
                <Divider
                  className="hidden bg-ink-700 sm:block"
                  orientation="vertical"
                />
                <p className="whitespace-nowrap">{duration}</p>
              </>
            )}
          </div>
        </div>

        {hasHighlights && (
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            aria-label={isOpen ? 'Ocultar logros' : 'Mostrar logros'}
            aria-expanded={isOpen}
            aria-controls={highlightsId}
            className="shrink-0"
            onPress={() => setIsOpen((currentValue) => !currentValue)}
            startContent={
              <IconCaretDown
                stroke={1.5}
                className={`transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            }
          />
        )}
      </div>

      <AnimatePresence initial={false}>
        {hasHighlights && isOpen && (
          <motion.div
            id={highlightsId}
            key="highlights"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <PortableTextContent
              value={highlights}
              className="flex flex-col gap-1 text-ink-200 [&_p]:inline"
            />
          </motion.div>
        )}
      </AnimatePresence>

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
