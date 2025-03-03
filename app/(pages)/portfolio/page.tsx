import React from 'react';
import { Metadata } from 'next';

import { portfolioMetadata } from '@/config/metadata/portfolio';

import ProjectsSection from './ProjectsSection';

export async function generateMetadata(): Promise<Metadata> {
  return portfolioMetadata;
}

const PortfolioPage = () => {
  return <ProjectsSection />;
};
export default PortfolioPage;
