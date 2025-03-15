import React from 'react';

import SubTitle from '@/components/common/SubTitle';

import SoftSkillCard from '../components/SoftSkillCard';
import { SOFT_SKILLS } from '../data/profile';

const SoftSkills = () => {
  return (
    <section className="flex flex-col gap-5">
      <SubTitle title="¿Cómo trabajo?" />

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
