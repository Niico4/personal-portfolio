import React from 'react';

import GitHubContribution from './GitHubContribution';
import SoftSkills from './SoftSkills';

const SkillsSection = () => {
  return (
    <section className="flex flex-col gap-12">
      <GitHubContribution />

      <SoftSkills />
    </section>
  );
};

export default SkillsSection;
