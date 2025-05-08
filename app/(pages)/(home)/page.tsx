import React from 'react';
import { Metadata } from 'next';

import HeroSection from './sections/HeroSection';
import SoftSkills from './sections/SoftSkillsSection';
import RecentProjectsSection from './sections/RecentProjectsSection';
import GitHubContribution from './sections/GitHubContributionSection';

import { homeMetadata } from '@/config/metadata/home';

export async function generateMetadata(): Promise<Metadata> {
  return homeMetadata;
}

const HomePage = () => {
  return (
    <div className="flex flex-col gap-20 mx-auto">
      <HeroSection />
      <GitHubContribution />
      <RecentProjectsSection />
      <SoftSkills />
    </div>
  );
};

export default HomePage;
