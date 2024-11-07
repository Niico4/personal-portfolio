import React from 'react';

import {
  OPTIONS_TECH_SKILLS,
  TECH_SKILLS_SLIDES,
} from '@/(pages)/(home)/constants/skills.data';
import Slider from '@/components/slider/Slider';

const AboutMeSection = () => {
  return (
    <article>
      <h2 className="text-IColorSecondary text-2xl font-semibold mb-8">
        Tecnologías
      </h2>

      <Slider
        slides={TECH_SKILLS_SLIDES}
        options={OPTIONS_TECH_SKILLS}
        isAutoScroll
      />
    </article>
  );
};

export default AboutMeSection;
