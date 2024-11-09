import React from 'react';

import { SOFT_SKILLS } from '@/(pages)/(home)/constants/skills.data';

import CardSoftSkill from './CardSoftSkill';

const SoftSkills = () => {
  return (
    <article className="w-[90%] mx-auto">
      <h2 className="text-IColorSecondary text-2xl font-semibold mb-8">
        Fortalezas Profesionales
      </h2>

      <div className="w-full flex flex-wrap justify-center gap-4">
        {SOFT_SKILLS.map(({ title, icon, description }, index) => (
          <CardSoftSkill
            key={index}
            title={title}
            icon={icon}
            description={description}
          />
        ))}
      </div>
    </article>
  );
};

export default SoftSkills;
