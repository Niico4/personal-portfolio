import { WorkExperienceType } from '@/sanity/lib/types/work-experience.type';

import { WorkExperienceItem } from '../atoms/work-experience-item';

interface ExperienceGroup {
  year: number;
  experiences: WorkExperienceType[];
}

const groupExperiencesByYear = (
  experiences: WorkExperienceType[],
): ExperienceGroup[] => {
  return experiences.reduce<ExperienceGroup[]>((groups, experience) => {
    const year = new Date(experience.startDate).getUTCFullYear();
    const currentGroup = groups.at(-1);

    if (currentGroup?.year === year) {
      currentGroup.experiences.push(experience);
    } else {
      groups.push({
        year,
        experiences: [experience],
      });
    }

    return groups;
  }, []);
};

export const WorkExperienceTimeline = ({
  experiences,
}: {
  experiences: WorkExperienceType[];
}) => {
  const experienceGroups = groupExperiencesByYear(experiences);

  return (
    <>
      {experienceGroups.map(({ year, experiences }) => (
        <div key={year}>
          <p className="w-10 text-center text-sm text-zinc-600">{year}</p>

          {experiences.map((experience) => (
            <WorkExperienceItem key={experience.id} experience={experience} />
          ))}
        </div>
      ))}
    </>
  );
};
