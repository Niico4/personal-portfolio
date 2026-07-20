import { Card } from '@heroui/card';

import { SectionHeader } from '@/components/common/section-header';
import { getDateRange } from '@/utils/get-date-range';
import { EducationItem } from '@/sanity/lib/types/profile.type';

const EducationSection = async ({
  education,
}: {
  education: EducationItem[];
}) => {
  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title="03 Educación"
        description="Base académica + aprendizaje constante por cuenta propia"
      />

      <ul className="flex flex-col gap-4">
        {education.map(
          ({
            id,
            endDate,
            institutionName,
            isInProgress,
            programName,
            startDate,
          }) => {
            const dateRange = getDateRange({
              startDate,
              endDate,
              isCurrent: isInProgress,
            });

            return (
              <li key={id}>
                <Card className="flex w-full flex-col gap-1 border border-ink-900 bg-[#4A4A4A]/20 backdrop-blur-sm px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-ink-50/90">
                      {institutionName}
                    </h3>

                    <p className="text-ink-100/90 text-xs">{dateRange}</p>
                  </div>

                  <p className="text-sm text-ink-100">{programName}</p>
                </Card>
              </li>
            );
          },
        )}
      </ul>
    </section>
  );
};

export default EducationSection;
