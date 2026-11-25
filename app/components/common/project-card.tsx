import { IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import type { ProjectType } from '@/sanity/lib/types/project.type';

interface ProjectCardProps {
  project: Pick<ProjectType, 'title' | 'slug' | 'shortDescription'> & {
    media: Pick<ProjectType['media'], 'coverURL' | 'iconURL'>;
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, media, shortDescription, slug } = project;
  const { coverURL, iconURL } = media;
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block min-w-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="gap-3 overflow-visible rounded-none border-0 bg-transparent p-0 shadow-none ring-0">
        <div className="relative aspect-11/8 overflow-hidden rounded-2xl border border-neutral-850 bg-neutral-900 bg-[url('/patterns/project-cover.svg')] group-hover:border-neutral-700 motion-safe:transition-colors motion-safe:duration-300">
          <div className="absolute inset-[22%_0_0_12.5%] overflow-hidden rounded-tl-xl">
            <Image
              src={coverURL}
              alt=""
              fill
              sizes="(min-width: 768px) 350px, (min-width: 640px) 45vw, 90vw"
              className="origin-top-left object-cover object-top-left opacity-85 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:transition-[scale,opacity] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.045] motion-safe:group-focus-visible:scale-[1.045]"
            />
          </div>
        </div>

        <CardContent className="flex min-w-0 flex-col gap-0.5 p-0">
          <div className="flex items-center gap-2">
            {iconURL && (
              <Image
                src={iconURL}
                alt=""
                width={20}
                height={20}
                className="size-5 shrink-0 rounded-xs object-contain"
              />
            )}

            <h3 className="text-base font-medium tracking-tight text-fg-default sm:text-lg">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-fg-secondary">
            <p className="min-w-0 flex-1 truncate text-xs sm:text-sm">
              {shortDescription}
            </p>

            <IconChevronRight
              aria-hidden="true"
              stroke={1.5}
              className="size-5 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
