import { SectionHeader } from '@/components/common/section-header';
import { SkillChip } from '@/components/common/skill-chip';
import { ProfileSkill } from '@/sanity/lib/types/profile.type';

const SkillsSection = async ({ skills }: { skills: ProfileSkill[] }) => {
  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title="04 Tecnologías"
        // description="Lo que domino hoy y sigo expandiendo mañana"
      />

      <ul className="flex flex-wrap gap-2">
        {skills.map(({ id, name }) => {
          return (
            <li key={id}>
              <SkillChip label={name} radius="sm" />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SkillsSection;
