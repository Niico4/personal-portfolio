import { Metadata } from 'next';

import Hero from './sections/hero-section';
import ProjectsPreview from './sections/projects-preview-section';
import WorkExperience from './sections/work-experience-section';

import { homeMetadata } from '@/config/metadata/home';

export async function generateMetadata(): Promise<Metadata> {
  return homeMetadata;
}

const HomePage = () => {
  return (
    <div className="flex flex-col gap-20 mx-auto">
      <Hero />
      <ProjectsPreview />
      <WorkExperience />
    </div>
  );
};

export default HomePage;
