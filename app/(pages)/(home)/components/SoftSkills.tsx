import React from 'react';

import { SOFT_SKILLS } from '../constants/skills.data';

import CardSoftSkill from './CardSoftSkill';

const SoftSkills = () => {
  return (
    <article>
      <h2 className="text-IColorSecondary text-2xl font-semibold mb-8">
        Fortalezas Profesionales
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
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
