import { Metadata } from 'next';

import HeroSection from './sections/hero-section';
import SoftSkills from './sections/SoftSkillsSection';
import ProjectsPreview from './sections/projects-preview-section';

import { homeMetadata } from '@/config/metadata/home';

export async function generateMetadata(): Promise<Metadata> {
  return homeMetadata;
}

const HomePage = () => {
  return (
    <div className="flex flex-col gap-20 mx-auto">
      <HeroSection />
      <ProjectsPreview />
      <SoftSkills />
    </div>
  );
};

export default HomePage;
