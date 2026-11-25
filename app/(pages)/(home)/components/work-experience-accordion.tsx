import { IconChevronDown } from '@tabler/icons-react';
import Image from 'next/image';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { WorkExperienceType } from '@/sanity/lib/types/work-experience.type';

interface WorkExperienceItemProps {
  experience: WorkExperienceType;
}

const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const formatDate = (date: string) => {
  const formatted = dateFormatter.format(new Date(date)).replace('.', '');

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const WorkExperienceItem = ({ experience }: WorkExperienceItemProps) => {
  const {
    id,
    organizationName,
    organizationLogoURL,
    role,
    startDate,
    endDate,
    isCurrentPosition,
    isFreelance,
    features,
  } = experience;

  return (
    <AccordionItem value={id} className="border-none not-last:border-b-0">
      <AccordionTrigger className="group/experience cursor-pointer items-center gap-3 border-0 p-0 font-normal hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden!">
        <span
          data-experience-summary
          className="flex min-w-0 flex-1 items-center gap-3 motion-safe:transition-opacity motion-safe:duration-200"
        >
          <Image
            src={organizationLogoURL}
            alt=""
            width={40}
            height={40}
            className="size-9 shrink-0 rounded-lg object-contain sm:size-10"
          />

          <span className="flex min-w-0 flex-col gap-0.5 text-left">
            <span className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-sm font-medium text-fg-default decoration-brand decoration-wavy decoration-1 underline-offset-2 group-aria-expanded/experience:underline sm:text-base">
                {organizationName}
              </span>

              <span className="text-xs text-fg-muted sm:text-[13px]">
                / {formatDate(startDate)} ·{' '}
                {isCurrentPosition
                  ? 'Actualidad'
                  : endDate
                    ? formatDate(endDate)
                    : '—'}
              </span>
            </span>

            <span className="text-xs leading-normal text-fg-secondary sm:text-sm">
              {role}
              {isFreelance && ' · Freelance'}
            </span>
          </span>
        </span>

        <span
          aria-hidden="true"
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'icon-sm',
            }),
            'group-aria-expanded/experience:bg-muted',
          )}
        >
          <IconChevronDown
            stroke={1.5}
            className="group-aria-expanded/experience:rotate-180 motion-safe:transition-transform motion-safe:duration-200"
          />
        </span>
      </AccordionTrigger>

      <AccordionContent className="p-0">
        <ul className="list-disc space-y-2 pt-4 pb-1 pl-4 text-sm leading-normal text-fg-secondary marker:text-fg-muted sm:text-base">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};
