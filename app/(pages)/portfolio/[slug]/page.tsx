import React from 'react';
import { Metadata } from 'next';

import ProjectDetailPage from '../components/ProjectDetail';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Proyecto | Nicolas Garzón`,
  };
}

const Page = () => {
  return <ProjectDetailPage />;
};

export default Page;
