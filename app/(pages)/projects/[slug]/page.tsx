import { IconArrowLeft } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { SkillGroup } from '@/(pages)/(home)/components/skills-group';
import { PortableTextContent } from '@/components/common/portable-text-content';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { getProjectBySlug } from '@/sanity/lib/fetchers/project.fetcher';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

import { ProjectActions } from '../components/project-actions';
import { ProjectShowcase } from '../components/project-showcase';

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

  const { title, shortDescription, description, technologyGroups, media } =
    project;

  return (
    <article className="flex min-w-0 flex-col gap-8 sm:gap-10">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            aria-label="Volver a proyectos"
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'icon-sm',
              }),
              'group size-9 shrink-0 rounded-lg text-fg-muted',
            )}
          >
            <IconArrowLeft
              aria-hidden="true"
              stroke={1.5}
              className="size-4 motion-safe:transition-transform motion-safe:group-hover:-translate-x-0.5"
            />
          </Link>

          <div className="flex min-w-0 items-center gap-2.5">
            {media.iconURL && (
              <Image
                src={media.iconURL}
                alt=""
                width={40}
                height={40}
                className="size-8 shrink-0 rounded-xs object-contain sm:size-10"
              />
            )}

            <h1 className="min-w-0 font-display text-2xl font-medium tracking-tight wrap-break-word text-fg-strong sm:text-3xl">
              {title}
            </h1>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-fg-secondary sm:text-base">
          {shortDescription}
        </p>
      </header>

      <div className="flex min-w-0 flex-col gap-4">
        <ProjectShowcase media={media} title={title} />

        <ProjectActions media={media} />
      </div>

      <PortableTextContent
        value={description}
        className="space-y-4 text-sm leading-relaxed text-fg-default sm:text-base"
      />

      {technologyGroups.length > 0 && (
        <section
          aria-labelledby="project-technologies"
          className="flex flex-col gap-5"
        >
          <h2
            id="project-technologies"
            className="font-display text-xl text-fg-emphasis sm:text-2xl"
          >
            Tecnologías
          </h2>

          <div className="flex flex-col gap-4">
            {technologyGroups.map((group, index) => (
              <Fragment key={group.id}>
                {index > 0 && <Separator className="bg-border/50" />}

                <SkillGroup group={group} />
              </Fragment>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default ProjectPage;
