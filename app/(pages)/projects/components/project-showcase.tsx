import { IconMovie } from '@tabler/icons-react';
import Image from 'next/image';

import type { ProjectType } from '@/sanity/lib/types/project.type';

import { ProjectGallery } from './project-gallery';

interface ProjectShowcaseProps {
  title: string;
  media: Pick<ProjectType['media'], 'coverURL' | 'demoVideoURL' | 'gallery'>;
  preload?: 'none' | 'metadata';
}

export const ProjectShowcase = ({
  title,
  media,
  preload = 'metadata',
}: ProjectShowcaseProps) => {
  const { coverURL, demoVideoURL, gallery } = media;

  if (demoVideoURL) {
    return (
      <figure className="flex flex-col gap-2">
        <video
          src={demoVideoURL}
          poster={coverURL ?? undefined}
          aria-label={`Video demostrativo de ${title}`}
          controls
          muted
          playsInline
          preload={preload}
          className="block aspect-video w-full rounded-xl border border-border bg-black object-contain"
        />

        <figcaption className="flex items-center justify-between text-xs text-fg-muted">
          Showcase del proyecto
          <IconMovie aria-hidden="true" stroke={1.5} className="size-4" />
        </figcaption>
      </figure>
    );
  }

  if (gallery.length > 0) {
    return <ProjectGallery images={gallery} title={title} />;
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
      <Image
        src={coverURL ?? '/og-default-image.png'}
        alt={`Vista previa de ${title}`}
        fill
        sizes="(min-width: 768px) 704px, calc(100vw - 40px)"
        className="object-contain"
      />
    </div>
  );
};
