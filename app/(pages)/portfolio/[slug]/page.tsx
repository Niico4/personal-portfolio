import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import {
  getProject,
  getProjects,
  getProjectSlugs,
} from '@/sanity/lib/fetchers/project.fetcher';
import { ProjectInformationType } from '@/sanity/lib/types/project.type';

import { ProjectDetailSection } from './project-detail';

type ProjectPageProps = {
  params: Promise<{ slug: ProjectInformationType['slug'] }>;
};

export const generateStaticParams = async () => {
  const slugs = await getProjectSlugs();

  return slugs.map(({ slug }) => ({ slug }));
};

const PROJECT_OG_FALLBACK_IMAGE = '/coming-soon.webp';

const getSeoDescription = (description?: string | null) => {
  const fallback =
    'Proyecto desarrollado por Nicolás Garzón, Desarrollador Full Stack.';

  if (!description) return fallback;

  const cleanDescription = description.trim();

  if (cleanDescription.length <= 155) {
    return cleanDescription;
  }

  return `${cleanDescription.slice(0, 152).trim()}...`;
};

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project: ProjectInformationType | null = await getProject(slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
      description: 'El proyecto solicitado no está disponible.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${project.title} | Proyecto`;
  const description = getSeoDescription(
    project.project_information_preview.short_description ??
      project.project_detail.origin_description,
  );

  const imageUrl =
    project.project_information_preview.image?.url ?? PROJECT_OG_FALLBACK_IMAGE;

  const imageAlt =
    project.project_information_preview.image?.alt ??
    `Vista previa del proyecto ${project.title}`;

  const url = `/portfolio/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} | Proyecto de Nicolás Garzón`,
      description,
      url,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Proyecto de Nicolás Garzón`,
      description,
      images: [imageUrl],
    },
  };
};

const ProjectDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const [project, projects] = await Promise.all([
    getProject(slug),
    getProjects(),
  ]);

  if (!project) return notFound();

  const currentProjectIndex = projects.findIndex(
    (currentProject: ProjectInformationType) => currentProject.slug === slug,
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
