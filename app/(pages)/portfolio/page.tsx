import React from 'react';
import { Metadata } from 'next';

import ProjectsSection from './sections/ProjectsSection';

import { portfolioMetadata } from '@/config/metadata/portfolio';

export async function generateMetadata(): Promise<Metadata> {
  return portfolioMetadata;
}

const PortfolioPage = () => {
  return <ProjectsSection />;
};
export default PortfolioPage;
