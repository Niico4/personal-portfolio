import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProjectBySlug } from '@/sanity/lib/fetchers/project.fetcher';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return createPageMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/projects/${project.slug}`,
    image: {
      url: project.media.coverURL,
      alt: `Vista previa de ${project.title}`,
    },
  });
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <h1 className="font-display text-3xl text-fg-strong">{project.title}</h1>

      <p className="text-fg-secondary">{project.shortDescription}</p>
    </article>
  );
};

export default ProjectPage;
