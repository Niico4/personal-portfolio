import { IconArrowUpRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import type { ProjectPreviewType } from '@/(pages)/types/project-preview.type';

const coverPattern = {
  backgroundImage: "url('/patterns/project-cover.svg')",
};

export const ProjectCard = ({ project }: ProjectPreviewType) => {
  const { title, media, shortDescription, slug } = project;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      {media.coverURL && (
        <div
          style={coverPattern}
          className="relative aspect-11/8 overflow-hidden rounded-lg border border-neutral-850 bg-neutral-900 group-hover:border-neutral-700 motion-safe:transition-[transform,border-color] motion-safe:duration-220 motion-safe:group-active:scale-[0.985]"
        >
          <div className="absolute inset-[16%_0_0_10%] overflow-hidden rounded-tl-lg">
            <Image
              src={media.coverURL}
              alt=""
              fill
              sizes="(min-width: 720px) 300px, calc(100vw - 5rem)"
              className="origin-top-left object-cover object-top-left motion-safe:transition-transform motion-safe:duration-220 motion-safe:ease-out motion-safe:group-hover:scale-[1.035] motion-safe:group-focus-visible:scale-[1.035]"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-[0.85rem] pb-[0.2rem]">
        <h3 className="min-w-0 font-display text-[clamp(1.2rem,3vw,1.45rem)] leading-tight font-semibold tracking-[-0.035em] wrap-anywhere">
          {title}
        </h3>

        <span className="flex shrink-0 items-center gap-1 text-[0.78rem] text-muted-foreground group-hover:text-primary group-focus-visible:text-primary">
          Ver proyecto
          <IconArrowUpRight
            size={15}
            aria-hidden="true"
            className="motion-safe:transition-transform motion-safe:duration-180 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5"
          />
        </span>
      </div>

      <p className="line-clamp-2 max-w-[58ch] text-[0.94rem] leading-[1.55] text-pretty text-neutral-300">
        {shortDescription}
      </p>
    </Link>
  );
};
