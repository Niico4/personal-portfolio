'use client';

import { useId, useState } from 'react';
import { Button } from '@heroui/button';
import { IconSelector } from '@tabler/icons-react';
import type { PortableTextBlock } from '@portabletext/types';
import { AnimatePresence, motion } from 'framer-motion';

import { SkillChip } from '@/components/common/skill-chip';

import { PortableTextContent } from '../../../../components/common/portable-text-content';

interface JobExperienceContentProps {
  jobTitle: string;
  dateRange: string;
  duration?: string | null;
  highlights?: PortableTextBlock[] | null;
  skills?: string[] | null;
  defaultOpen?: boolean;
}

export const JobExperienceContent = ({
  jobTitle,
  dateRange,
  duration,
  highlights,
  skills,
  defaultOpen = false,
}: JobExperienceContentProps) => {
  const hasHighlights = Boolean(highlights?.length);
  const hasSkills = Boolean(skills?.length);

  const [isOpen, setIsOpen] = useState(defaultOpen && hasHighlights);
  const highlightsId = useId();

  const metadata = [dateRange, duration].filter(Boolean) as string[];

  return (
    <article className="relative">
      <div
        className="
          grid w-full
          grid-cols-[2.5rem_minmax(0,1fr)]
          gap-x-4
        "
      >
        <div className="relative flex justify-center pt-0.5">
          <span
            aria-hidden
            className={`
              pointer-events-none absolute
              left-1/2 top-[-1.25rem]
              h-16 w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-transparent
              via-brand-500/50
              to-transparent
              transition-opacity
              duration-300 ease-out
              ${isOpen ? 'opacity-100' : 'opacity-0'}
            `}
          />

          <span
            aria-hidden
            className={`
              pointer-events-none absolute
              left-1/2 top-3.5
              h-px w-[calc(50%+1rem)]
              transition-colors
              duration-300 ease-out
              ${isOpen ? 'bg-brand-500/60' : 'bg-ink-600/70'}
            `}
          />

          <span
            aria-hidden
            className={`
              relative z-10
              flex size-6 rotate-45
              items-center justify-center
              rounded-[7px]
              border bg-ink-950
              transition-[border-color,background-color,box-shadow]
              duration-300 ease-out
              ${
                isOpen
                  ? `
                    border-brand-500/70
                    bg-brand-500/15
                    shadow-[0_0_18px_rgba(14,165,233,0.18)]
                    ring-4 ring-brand-500/10
                  `
                  : 'border-ink-600'
              }
            `}
          >
            <span
              className={`
                size-1.5 rounded-[2px]
                transition-[transform,background-color]
                duration-300 ease-out
                ${isOpen ? 'scale-100 bg-brand-400' : 'scale-75 bg-ink-500'}
              `}
            />
          </span>
        </div>

        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="flex flex-col">
            <h4
              className={`
                text-lg font-medium leading-7
                transition-colors duration-200
                ${isOpen ? 'text-ink-100' : 'text-ink-200'}
              `}
            >
              {jobTitle}
            </h4>

            <div className="flex flex-wrap text-xs sm:text-sm text-ink-300">
              {metadata.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center"
                >
                  {index > 0 && (
                    <span aria-hidden className="mx-2">
                      •
                    </span>
                  )}

                  <span className="whitespace-nowrap">{item}</span>
                </span>
              ))}
            </div>
          </div>

          {hasHighlights && (
            <Button
              isIconOnly
              size="sm"
              variant="light"
              disableRipple
              aria-label={
                isOpen
                  ? `Ocultar detalles de ${jobTitle}`
                  : `Mostrar detalles de ${jobTitle}`
              }
              aria-expanded={isOpen}
              aria-controls={highlightsId}
              className={`
                mt-0.5 size-9 min-w-9 shrink-0
                text-ink-200
                transition-[background-color,color]
                duration-200 ease-out
                data-[hover=true]:bg-ink-900/60
                data-[hover=true]:text-ink-200
                data-[pressed=true]:scale-100
                ${isOpen ? 'text-brand-400' : ''}
              `}
              onPress={() => {
                setIsOpen((currentValue) => !currentValue);
              }}
            >
              <IconSelector
                aria-hidden
                stroke={1.5}
                className="size-5 transition-transform duration-300 ease-out"
              />
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {hasHighlights && isOpen && (
          <motion.div
            id={highlightsId}
            key="job-highlights"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              height: {
                duration: 0.3,
                ease: 'easeInOut',
              },
              opacity: {
                duration: 0.2,
                ease: 'easeOut',
              },
            }}
            className="overflow-hidden"
          >
            <div
              className="
                grid
                grid-cols-[2.5rem_minmax(0,1fr)]
                gap-x-4
              "
            >
              <div aria-hidden />

              <PortableTextContent
                value={highlights!}
                className="
                  mt-4 flex flex-col gap-2
                  text-ink-200
                  [&_li]:leading-relaxed
                  [&_p]:inline
                "
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasSkills && (
        <div
          className="
            mt-4 grid
            grid-cols-[2.5rem_minmax(0,1fr)]
            gap-x-4
          "
        >
          <div aria-hidden />

          <ul
            aria-label={`Tecnologías utilizadas en ${jobTitle}`}
            className="flex flex-wrap items-center gap-2.5"
          >
            {skills?.map((skill) => (
              <li key={skill}>
                <SkillChip label={skill} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};
