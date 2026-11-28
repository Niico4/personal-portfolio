import { IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import type { ProjectPreviewType } from '@/(pages)/types/project-preview.type';
import { cn } from '@/lib/utils';

export const ProjectIndexItem = ({ project }: ProjectPreviewType) => {
  const { title, shortDescription, slug, media } = project;

  const hasCover = Boolean(media.coverURL);

  return (
    <li>
      <Link
        href={`/projects/${slug}`}
        aria-label={`Ver ficha: ${title}`}
        className={cn(
          'group -mx-2 grid content-center gap-x-[clamp(1rem,3vw,1.65rem)] gap-y-[0.35rem] px-2 py-4',
          'hover:bg-foreground/3 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:bg-primary/9',
          'motion-safe:transition-[background-color] motion-safe:duration-160 motion-safe:ease-out',
          '[-webkit-tap-highlight-color:transparent] max-[541px]:gap-x-3 max-[541px]:gap-y-[0.45rem]',
          hasCover
            ? 'grid-cols-[minmax(0,10.875rem)_minmax(0,1fr)_auto] max-[541px]:grid-cols-[clamp(4.75rem,27vw,8rem)_minmax(0,1fr)_auto]'
            : 'grid-cols-[minmax(0,1fr)_auto]',
        )}
      >
        {media.coverURL && (
          <span className="relative col-start-1 row-span-2 row-start-1 aspect-[1.55] self-center overflow-hidden rounded-[0.3rem] max-[541px]:row-span-1">
            <Image
              src={media.coverURL}
              alt=""
              fill
              sizes="(max-width: 540px) 27vw, 174px"
              className="object-cover object-center"
            />
          </span>
        )}

        <h2
          className={cn(
            'row-start-1 self-end font-display text-[clamp(1.22rem,3vw,1.58rem)] leading-[1.16] font-semibold tracking-[-0.035em] wrap-anywhere max-[541px]:self-center',
            hasCover ? 'col-start-2' : 'col-start-1',
          )}
        >
          {title}
        </h2>

        {shortDescription && (
          <p
            className={cn(
              'row-start-2 max-w-[49ch] text-[0.91rem] leading-normal text-pretty text-neutral-300 max-[541px]:mt-[0.15rem] max-sm:line-clamp-2',
              hasCover
                ? 'col-start-2 max-[541px]:col-span-3 max-[541px]:col-start-1'
                : 'col-start-1',
            )}
          >
            {shortDescription}
          </p>
        )}

        <span
          aria-hidden="true"
          className={cn(
            'row-span-2 row-start-1 self-center text-muted-foreground group-hover:text-primary group-focus-visible:text-primary group-active:text-primary',
            hasCover ? 'col-start-3 max-[541px]:row-span-1' : 'col-start-2',
          )}
        >
          <IconArrowRight
            size={16}
            className="motion-safe:transition-transform motion-safe:duration-180 motion-safe:ease-out motion-safe:group-hover:translate-x-0.75 motion-safe:group-focus-visible:translate-x-0.75 motion-safe:group-active:translate-x-px"
          />
        </span>
      </Link>
    </li>
  );
};
