import React from 'react';

import {
  OPTIONS_SOFT_SKILLS,
  OPTIONS_TECH_SKILLS,
  SOFT_SKILLS_SLIDES,
  TECH_SKILLS_SLIDES,
} from '@/(pages)/(home)/constants/skills.data';

import EmblaCarousel from '../../../(pages)/(home)/components/slider/Slider';

const SkillsSection = () => {
  return (
    <section>
      <article className="my-8 mx-auto">
        <h2 className="text-IColorSecondary text-2xl font-semibold mb-8">
          Habilidades Blandas
        </h2>

        <EmblaCarousel
          slides={SOFT_SKILLS_SLIDES}
          options={OPTIONS_SOFT_SKILLS}
        />
      </article>

      <article className="my-8 mx-auto">
        <h2 className="text-IColorSecondary text-2xl font-semibold mb-8">
          Tecnologías
        </h2>

        <EmblaCarousel
          slides={TECH_SKILLS_SLIDES}
          options={OPTIONS_TECH_SKILLS}
          isAutoScroll
        />
      </article>
    </section>
  );
};

export default SkillsSection;
