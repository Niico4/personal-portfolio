import { notFound } from 'next/navigation';

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

export const generateMetadata = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const project: ProjectInformationType | null = await getProject(slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado | Nicolás Garzón',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${project.title} | Proyecto de Nicolás Garzón`;

  const description =
    project.project_information_preview.short_description ??
    project.project_detail.origin_description ??
    'Proyecto desarrollado por Nicolás Garzón.';

  const imageUrl = project.project_information_preview.image?.url ?? undefined;

  const url = `/portfolio/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt:
                project.project_information_preview.image?.alt ??
                `Vista previa de ${project.title}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
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
