import React from 'react';
import ProjectDetailPage from '../components/ProjectDetail';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Proyecto | Nicolas Garzón`,
  };
}

const Page = () => {
  return <ProjectDetailPage />;
};

export default Page;
