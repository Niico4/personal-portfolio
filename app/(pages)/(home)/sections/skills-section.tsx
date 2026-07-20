import { SectionHeader } from '@/components/common/section-header';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import { SkillChip } from '@/components/common/skill-chip';

const SkillsSection = async () => {
  const { techSkills } = await getProfile();

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title="04 Tecnologías"
        // description="Lo que domino hoy y sigo expandiendo mañana"
      />

      <ul className="flex flex-wrap gap-2">
        {techSkills.map(({ _key, name }) => {
          return (
            <li key={_key}>
              <SkillChip label={name} radius="sm" />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SkillsSection;
