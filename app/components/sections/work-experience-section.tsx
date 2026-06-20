import { Fragment } from 'react/jsx-runtime';
import Image from 'next/image';
import { Divider } from '@heroui/divider';
import { IconBulb, IconCode, IconPacman } from '@tabler/icons-react';

import { SectionHeader } from '@/components/common/section-header';
import { getWorkExperience } from '@/sanity/lib/fetchers/work-experience.fetcher';
import { EmploymentType } from '@/sanity/lib/types/work-experience.type';
import { getJobDateRange } from '@/utils/get-job-date-range';
import { calculateDuration } from '@/utils/calculate-duration';

import { TimelineItem } from './timeline/timeline-item';
import { JobExperienceContent } from './job-experience-content';

const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  'full-time': 'Tiempo completo',
  'part-time': 'Medio tiempo',
};

const getEmploymentTypeLabel = (employmentType?: EmploymentType | null) => {
  if (!employmentType) return '';

  return EMPLOYMENT_TYPE_LABELS[employmentType] ?? employmentType;
};

const getJobIcon = (iconKey?: string | null) => {
  if (iconKey === 'bulb') return <IconBulb stroke={1.5} />;

  return <IconCode stroke={1.5} />;
};

const CompanyGroup = ({
  logo,
  alt,
  name,
  children,
}: {
  logo?: string;
  alt?: string;
  name: string;
  children: React.ReactNode;
}) => (
  <article className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      {logo ? (
        <Image
          src={logo}
          alt={alt ?? name}
          width={32}
          height={32}
          className="aspect-square"
        />
      ) : (
        <IconPacman stroke={1.5} className="text-brand-600" />
      )}

      <h3 className="text-xl font-semibold tracking-wider">{name}</h3>
    </div>

    <div className="flex flex-col">{children}</div>
  </article>
);

const WorkExperienceSection = async () => {
  const workExperience = await getWorkExperience();

  if (!workExperience?.length) return null;

  return (
    <section className="flex flex-col gap-8">
      <SectionHeader
        title="Experiencia"
        description="Experiencia real entregando, no solo aprendiendo"
      />

      {workExperience.map(
        ({ id, job_information, organization_information }) => (
          <Fragment key={id}>
            <CompanyGroup
              logo={organization_information.organization_logo?.url}
              alt={organization_information.organization_logo?.alt}
              name={organization_information.organization_name}
            >
              {job_information.map(
                (
                  {
                    _key,
                    employment_type,
                    end_date,
                    highlights,
                    is_current_job,
                    job_icon_key,
                    job_title,
                    skills,
                    start_date,
                  },
                  index,
                ) => {
                  const isLastJob = index === job_information.length - 1;

                  const dateRange = getJobDateRange({
                    startDate: start_date,
                    endDate: end_date,
                    isCurrentJob: is_current_job,
                  });

                  const duration = calculateDuration({
                    startDate: start_date,
                    endDate: end_date,
                    isCurrentJob: is_current_job,
                  });

                  return (
                    <TimelineItem
                      key={_key}
                      icon={getJobIcon(job_icon_key)}
                      isLast={isLastJob}
                    >
                      <JobExperienceContent
                        jobTitle={job_title}
                        employmentTypeLabel={getEmploymentTypeLabel(
                          employment_type,
                        )}
                        dateRange={dateRange}
                        duration={duration}
                        highlights={highlights}
                        skills={skills}
                      />
                    </TimelineItem>
                  );
                },
              )}
            </CompanyGroup>
            <Divider className="bg-ink-900/40" />
          </Fragment>
        ),
      )}
    </section>
  );
};

export default WorkExperienceSection;
