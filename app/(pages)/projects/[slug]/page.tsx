import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
} from '@tabler/icons-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { DetailCover } from '@/(pages)/projects/components/detail-cover';
import { ProjectSections } from '@/(pages)/projects/components/project-sections';
import {
  getProjectDetailBySlug,
  getProjectList,
} from '@/sanity/lib/fetchers/project.fetcher';
import type {
  DetailCover as DetailCoverType,
  ProjectDetailType,
  ProjectListItem,
} from '@/sanity/lib/types/project.type';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

type Props = {
  params: Promise<{ slug: string }>;
};

const getAdjacentProjects = (projects: ProjectListItem[], slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);

  return {
    previousProject: index > 0 ? projects[index - 1] : null,
    nextProject: index >= 0 ? (projects[index + 1] ?? null) : null,
  };
};

const getDetailCover = ({
  detailCover,
  media,
}: ProjectDetailType): DetailCoverType | null => {
  if (detailCover) return detailCover;

  const { coverURL, coverWidth, coverHeight } = media;

  if (
    !coverURL ||
    coverWidth === null ||
    coverHeight === null ||
    coverWidth <= 0 ||
    coverHeight <= 0
  ) {
    return null;
  }

  return {
    url: coverURL,
    width: coverWidth,
    height: coverHeight,
    crop: null,
    alt: null,
    caption: null,
  };
};

const resourceLinkClassName =
  'flex min-h-11 items-center gap-[0.3rem] text-[0.85rem] text-muted-foreground hover:text-primary active:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectDetailBySlug(slug);

  if (!project) notFound();

  return createPageMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/projects/${project.slug}`,
    image: project.media.coverURL
      ? {
          url: project.media.coverURL,
          alt: `Vista previa de ${project.title}`,
        }
      : undefined,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const [project, projects] = await Promise.all([
    getProjectDetailBySlug(slug),
    getProjectList(),
  ]);

  if (!project) notFound();

  const { title, shortDescription, media } = project;

  const { previousProject, nextProject } = getAdjacentProjects(projects, slug);
  const cover = getDetailCover(project);

  const resources = [
    { label: 'Diseño en Figma', url: media.figmaUrl },
    { label: 'Repositorio', url: media.repositoryUrl },
    { label: 'Abrir demo', url: media.liveUrl },
  ];

  return (
    <article>
      <header className="pt-[clamp(2.25rem,6vw,4.3rem)] pb-6">
        <div className="flex items-center gap-[0.9rem]">
          {media.iconURL && (
            <Image
              src={media.iconURL}
              alt=""
              width={52}
              height={52}
              className="size-12 shrink-0 object-contain"
            />
          )}

          <h1 className="font-display text-[clamp(2.2rem,5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.035em] wrap-anywhere">
            {title}
          </h1>
        </div>

        <p className="mt-[1.2rem] max-w-[47ch] text-[clamp(1.12rem,2.4vw,1.4rem)] leading-[1.48] tracking-[-0.02em] text-pretty">
          {shortDescription}
        </p>

        {resources.some(({ url }) => url) && (
          <ul className="mt-3 flex flex-wrap items-center gap-x-5">
            {resources.map(
              ({ label, url }) =>
                url && (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={resourceLinkClassName}
                    >
                      {label}
                      <IconArrowUpRight aria-hidden="true" size={15} />
                    </a>
                  </li>
                ),
            )}
          </ul>
        )}
      </header>

      {cover && <DetailCover title={title} image={cover} />}

      <ProjectSections project={project} />

      <nav
        aria-label="Navegación entre proyectos"
        className="mt-8 border-t border-border pt-[1.2rem]"
      >
        {(previousProject || nextProject) && (
          <div className="grid gap-4 min-[541px]:grid-cols-2">
            {previousProject && (
              <Link
                href={`/projects/${previousProject.slug}`}
                className="group grid min-w-0 gap-1 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
              >
                <small className="text-xs text-muted-foreground">
                  Proyecto anterior
                </small>

                <span className="flex items-center gap-2 font-display text-[1.45rem] font-semibold tracking-[-0.035em] group-hover:text-primary">
                  <IconArrowLeft
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 motion-safe:transition-transform motion-safe:duration-160 motion-safe:group-hover:-translate-x-0.5"
                  />
                  <span className="min-w-0 wrap-anywhere">
                    {previousProject.title}
                  </span>
                </span>
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group grid min-w-0 gap-1 text-right focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring min-[541px]:col-start-2"
              >
                <small className="text-xs text-muted-foreground">
                  Siguiente proyecto
                </small>

                <span className="flex items-center justify-end gap-2 font-display text-[1.45rem] font-semibold tracking-[-0.035em] group-hover:text-primary">
                  <span className="min-w-0 wrap-anywhere">
                    {nextProject.title}
                  </span>
                  <IconArrowRight
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 motion-safe:transition-transform motion-safe:duration-160 motion-safe:group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            )}
          </div>
        )}
      </nav>
    </article>
  );
}
