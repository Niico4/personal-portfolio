import React from 'react';
import { Metadata } from 'next';

import ProjectDetailSection from '../components/ProjectDetailSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Proyecto | Nicolas Garzón`,
  };
}

const ProjectDetail = () => {
  return <ProjectDetailSection />;
};

export default ProjectDetail;
