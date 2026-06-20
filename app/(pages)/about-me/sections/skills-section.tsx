import Image from 'next/image';

import { SectionHeader } from '@/components/common/section-header';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';

const SkillsSection = async () => {
  const { skills } = await getProfile();

  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        title="Tecnologías"
        description="Lo que domino hoy y sigo expandiendo mañana"
      />

      <ul className="flex flex-wrap items-center gap-3">
        {skills.map(({ _key, icon_key, name }) => {
          const iconSrc = `/icons/tech/${icon_key}.svg`;

          return (
            <li
              key={_key}
              className="flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-900 p-1 px-1.5"
            >
              <span className="flex size-6 items-center justify-center p-0.5">
                <Image
                  src={iconSrc}
                  alt={`Logo de ${name}`}
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="size-full object-contain"
                />
              </span>

              <span className="whitespace-nowrap text-ink-100">{name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SkillsSection;
