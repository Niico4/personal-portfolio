import React from 'react';

import SoftSkillCard from '../components/SoftSkillCard';
import { SOFT_SKILLS } from '../data/profile';

import SubTitle from '@/components/common/Heading';

const SoftSkills = () => {
  return (
    <section className="flex flex-col gap-6">
      <SubTitle
        type="h2"
        title="¿Cómo trabajo?"
        className="text-center sm:text-start"
      />

      <div className="grid md:grid-cols-2 gap-4">
        {SOFT_SKILLS.map(({ title, description, icon }, index) => (
          <SoftSkillCard
            key={index}
            title={title}
            description={description}
            icon={icon}
          />
        ))}
      </div>
    </section>
  );
};

export default SoftSkills;
