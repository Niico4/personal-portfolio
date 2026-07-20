import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SEO_CONFIG } from '@/config/seo.config';
import {
  getProject,
  getProjects,
  getProjectSlugs,
} from '@/sanity/lib/fetchers/project.fetcher';
import type { Project } from '@/sanity/lib/types/project.type';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

import { ProjectDetailSection } from './project-detail';

type ProjectPageProps = {
  params: Promise<{
    slug: Project['slug'];
  }>;
};

const getCachedProject = cache(getProject);

export const generateStaticParams = async () => {
  const slugs = await getProjectSlugs();

  return slugs.map(({ slug }) => ({
    slug,
  }));
};

const getProjectSeoDescription = (project: Project): string => {
  const shortDescription = project.preview.shortDescription?.trim();

  if (shortDescription) {
    return shortDescription;
  }

  return `Conoce ${project.title}, un proyecto web de Nicolás Garzón, junto con su origen, funcionamiento, decisiones de diseño y proceso de desarrollo.`;
};

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = await getCachedProject(slug);

  if (!project) {
    notFound();
  }

  const image = project.preview.image?.url
    ? {
        url: project.preview.image.url,
        alt:
          project.preview.image.alt?.trim() ||
          `Vista previa del proyecto ${project.title}`,
      }
    : SEO_CONFIG.defaultImage;

  return createPageMetadata({
    title: `${project.title} — Proyecto web`,
    socialTitle: `${project.title}, proyecto de Nicolás Garzón`,
    description: getProjectSeoDescription(project),
    path: `/portfolio/${project.slug}`,
    image,
  });
};

const ProjectDetailPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;

  const [project, projects] = await Promise.all([
    getCachedProject(slug),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const currentProjectIndex = projects.findIndex(
    (currentProject: Project) => currentProject.slug === slug,
  );

  const previousProject =
    currentProjectIndex > 0 ? projects[currentProjectIndex - 1] : undefined;

  const nextProject =
    currentProjectIndex >= 0 && currentProjectIndex < projects.length - 1
      ? projects[currentProjectIndex + 1]
      : undefined;

  return (
    <ProjectDetailSection
      project={project}
      previousProject={previousProject}
      nextProject={nextProject}
    />
  );
};

export default ProjectDetailPage;
