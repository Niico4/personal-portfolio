import type { SkillGroupType } from '@/sanity/lib/types/skills';

interface SkillGroupProps {
  group: Pick<SkillGroupType, 'name' | 'technologies'>;
}

export const SkillGroup = ({ group }: SkillGroupProps) => {
  const { name, technologies } = group;

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-normal text-fg-muted sm:text-sm">{name}</h4>

      <ul className="flex flex-wrap gap-x-1.5 gap-y-1 text-sm leading-snug text-fg-default sm:text-base">
        {technologies.map(({ id, name }) => (
          <li
            key={id}
            className="inline-flex gap-1.5 whitespace-nowrap after:text-fg-muted after:content-['·'] last:after:content-none"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
