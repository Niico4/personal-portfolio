import { IconArrowsMaximize, IconChevronDown } from '@tabler/icons-react';
import Image from 'next/image';

import { ImageZoom } from '@/(pages)/projects/components/image-zoom';
import { ProjectGallery } from '@/(pages)/projects/components/project-gallery';
import { ProjectShowcase } from '@/(pages)/projects/components/project-showcase';
import { PortableTextContent } from '@/components/common/portable-text-content';
import { cn } from '@/lib/utils';
import type {
  DetailSection,
  ProjectDetailType,
} from '@/sanity/lib/types/project.type';

interface ProjectDetailSectionProps {
  section: DetailSection;
  project: ProjectDetailType;
}

interface ProjectTechnologiesProps {
  title?: string;
  groups: ProjectDetailType['technologyGroups'];
}

type ImageGroupSection = Extract<DetailSection, { _type: 'detailImageGroup' }>;

interface ProjectImageGroupProps {
  section: ImageGroupSection;
  projectTitle: string;
}

const DEFAULT_TITLES = {
  detailOverview: 'Sobre el proyecto',
  detailVideo: 'El producto en uso',
  detailGallery: 'Más vistas del producto',
  detailTechnologies: 'Tecnologías del proyecto',
} as const;

const sectionClassName = 'my-[clamp(2.6rem,6vw,4.2rem)]';

const sectionTitleClassName =
  'mb-[clamp(0.85rem,2vw,1.15rem)] font-display text-[clamp(1.4rem,3vw,1.8rem)] leading-[1.18] font-semibold tracking-[-0.035em] text-balance';

const proseClassName = 'max-w-[62ch] text-base text-pretty text-neutral-300';

const ProjectImageGroup = ({
  section,
  projectTitle,
}: ProjectImageGroupProps) => {
  const title = section.title?.trim();

  const images = section.images.filter(
    ({ url, width, height }) => url && width > 0 && height > 0,
  );

  if (!images.length) return null;

  return (
    <section className={sectionClassName}>
      {title && <h2 className={sectionTitleClassName}>{title}</h2>}

      <div className="flex flex-wrap items-start gap-(--space) [--space:clamp(0.5rem,2vw,1.5rem)]">
        {images.map((image, index) => {
          const portrait = image.width < image.height;
          const caption = image.caption?.trim();
          const alt =
            image.alt?.trim() || `Imagen ${index + 1} de ${projectTitle}`;

          return (
            <figure
              key={image.id}
              className={cn(
                'min-w-0 shrink grow',
                portrait
                  ? 'max-w-[calc((100%-var(--space))/2)] basis-[max(5.5rem,calc((100%-2*var(--space))/3))] only:max-w-[min(100%,22rem)] only:basis-full'
                  : 'basis-full',
              )}
            >
              <ImageZoom image={image} alt={alt} label={caption || alt}>
                <Image
                  src={image.url}
                  alt={alt}
                  width={image.width}
                  height={image.height}
                  sizes={
                    portrait
                      ? '(min-width: 760px) 340px, 50vw'
                      : '(min-width: 760px) 680px, calc(100vw - 3rem)'
                  }
                  className="h-auto w-full rounded-[0.4rem]"
                />

                <span className="pointer-events-none absolute right-[0.3rem] bottom-[0.3rem] grid size-[1.65rem] place-items-center rounded-sm bg-background text-foreground group-hover/zoom:text-primary group-focus-visible/zoom:text-primary group-active/zoom:text-primary">
                  <IconArrowsMaximize size={15} aria-hidden="true" />
                </span>
              </ImageZoom>

              {caption && (
                <figcaption className="mt-2 text-[clamp(0.72rem,2vw,0.86rem)] text-muted-foreground">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
};

const ProjectTechnologies = ({ title, groups }: ProjectTechnologiesProps) => {
  const availableGroups = groups
    .map((group) => ({
      ...group,
      technologies: group.technologies.filter(
        (technology) => technology?.id && technology?.name,
      ),
    }))
    .filter(({ technologies }) => technologies.length > 0);

  if (!availableGroups.length) return null;

  return (
    <details className="group/stack border-t border-border">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 text-base text-pretty hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        {title || DEFAULT_TITLES.detailTechnologies}

        <IconChevronDown
          size={17}
          aria-hidden="true"
          className="shrink-0 group-open/stack:rotate-180 motion-safe:transition-transform motion-safe:duration-160 motion-safe:ease-out"
        />
      </summary>

      <dl className="pb-4">
        {availableGroups.map(({ id, name, technologies }) => (
          <div
            key={id}
            className="my-[0.65rem] grid grid-cols-[minmax(7rem,25%)_minmax(0,1fr)] gap-3 text-[0.9rem] max-[521px]:grid-cols-1 max-[521px]:gap-[0.15rem]"
          >
            <dt className="text-muted-foreground">{name}</dt>

            <dd>{technologies.map(({ name }) => name).join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
};

export const ProjectDetailSection = ({
  section,
  project,
}: ProjectDetailSectionProps) => {
  const title = section.title?.trim();

  switch (section._type) {
    case 'detailOverview':
      if (!project.description?.length) return null;

      return (
        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>
            {title || DEFAULT_TITLES.detailOverview}
          </h2>

          <PortableTextContent
            className={proseClassName}
            value={project.description}
          />
        </section>
      );

    case 'detailText':
      if (!section.body?.length) return null;

      return (
        <section className={sectionClassName}>
          {title && <h2 className={sectionTitleClassName}>{title}</h2>}

          <PortableTextContent
            className={proseClassName}
            value={section.body}
          />
        </section>
      );

    case 'detailImageGroup':
      return (
        <ProjectImageGroup section={section} projectTitle={project.title} />
      );

    case 'detailVideo':
      if (!project.media.demoVideoURL) return null;

      return (
        <section
          className={cn(
            sectionClassName,
            '[&_video]:aspect-video [&_video]:w-full [&_video]:rounded-lg [&_video]:bg-card [&_video]:scheme-dark',
            '[&>figure>figcaption]:text-[0.8rem] [&>figure>figcaption]:text-muted-foreground',
          )}
        >
          <h2 className={sectionTitleClassName}>
            {title || DEFAULT_TITLES.detailVideo}
          </h2>

          <ProjectShowcase
            media={project.media}
            title={project.title}
            preload="none"
          />
        </section>
      );

    case 'detailGallery': {
      const gallery = project.media.gallery.filter(
        ({ url, width, height }) => url && width > 0 && height > 0,
      );

      if (!gallery.length) return null;

      return (
        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>
            {title || DEFAULT_TITLES.detailGallery}
          </h2>

          <div className="[&_[data-slot=carousel-item]>div]:bg-background [&_button]:min-h-11 [&_button]:min-w-11 [&_figcaption]:text-[0.8rem] [&_figcaption]:text-muted-foreground">
            <ProjectGallery images={gallery} title={project.title} />
          </div>
        </section>
      );
    }

    case 'detailTechnologies':
      return (
        <ProjectTechnologies title={title} groups={project.technologyGroups} />
      );

    default:
      return null;
  }
};
