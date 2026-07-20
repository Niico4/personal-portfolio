import type { ReactNode } from 'react';
import Image from 'next/image';
import { IconGhost3 } from '@tabler/icons-react';

import { SectionHeader } from '@/components/common/section-header';
import { getWorkExperience } from '@/sanity/lib/fetchers/work-experience.fetcher';
import { getDateRange } from '@/utils/get-date-range';
import { calculateDuration } from '@/utils/calculate-duration';
import { poetsenOne } from '@/fonts';

import { JobExperienceContent } from './job-experience-content';

interface CompanyGroupProps {
  logo?: string;
  name: string;
  children: ReactNode;
}

const CompanyGroup = ({ logo, name, children }: CompanyGroupProps) => (
  <article
    className="
      border-b border-ink-900/40 py-8
      first:pt-0
      last:border-b-0 last:pb-0
    "
  >
    <header className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-4">
      <div
        className="
          relative z-10 flex size-9
          items-center justify-center
          justify-self-center
          rounded-[10px]
          border border-ink-600
          bg-ink-900
        "
      >
        {logo ? (
          <Image
            src={logo}
            alt=""
            width={22}
            height={22}
            className="size-[22px] object-contain"
          />
        ) : (
          <IconGhost3
            aria-hidden
            stroke={1.5}
            className="size-5 text-brand-600"
          />
        )}
      </div>

      <h3
        className={`
          truncate text-xl text-ink-100
          sm:text-2xl
          ${poetsenOne.className}
        `}
      >
        {name}
      </h3>
    </header>

    <div className="relative mt-4">
      <span
        aria-hidden
        className="
          pointer-events-none absolute
          -top-6 bottom-1.5 left-5
          w-px -translate-x-1/2
          bg-gradient-to-b
          from-ink-500/60
          via-ink-50/10
          to-ink-50/5
        "
      />

      <span
        aria-hidden
        className="
          pointer-events-none absolute
          bottom-0 left-5
          size-1.5 -translate-x-1/2
          rounded-full
          border border-ink-600
          bg-ink-950
        "
      />

      <div className="flex flex-col gap-6 pb-4">{children}</div>
    </div>
  </article>
);

const WorkExperienceSection = async () => {
  const workExperience = await getWorkExperience();

  if (!workExperience?.length) return null;

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title="02 Experiencia"
        description="Experiencia real entregando, no solo aprendiendo"
      />

      <div>
        {workExperience.map(
          ({ id, jobInformation, organizationInformation }) => (
            <CompanyGroup
              key={id}
              logo={organizationInformation.organizationLogo?.url}
              name={organizationInformation.organizationName}
            >
              {jobInformation.map(
                ({
                  _key,
                  endDate,
                  highlights,
                  isCurrentJob,
                  jobTitle,
                  skills,
                  startDate,
                }) => {
                  const dateRange = getDateRange({
                    startDate,
                    endDate,
                    isCurrent: isCurrentJob,
                  });

                  const duration = calculateDuration({
                    startDate,
                    endDate,
                    isCurrent: isCurrentJob,
                  });

                  return (
                    <JobExperienceContent
                      key={_key}
                      jobTitle={jobTitle}
                      dateRange={dateRange}
                      duration={duration}
                      highlights={highlights}
                      skills={skills}
                      // defaultOpen={
                      //   Boolean(is_current_job) ||
                      //   (companyIndex === 0 && jobIndex === 0)
                      // }
                    />
                  );
                },
              )}
            </CompanyGroup>
          ),
        )}
      </div>
    </section>
  );
};

export default WorkExperienceSection;
