'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Route } from 'next';
import { Card, CardFooter } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { IconArrowUpRight } from '@tabler/icons-react';

import { ProjectInformationType } from '@/sanity/lib/types/project.type';
import { ProjectStatusChip } from '@/(pages)/portfolio/components/project-status-chip';

export const ProjectCard = ({
  project,
  className,
}: {
  project: ProjectInformationType;
  className?: string;
}) => {
  const { title, slug, status, project_information_preview: preview } = project;
  const projectHref = `/portfolio/${slug}` as Route;
  return (
    <Card
      as={Link}
      aria-label={`Ir al proyecto ${title}`}
      href={projectHref}
      isPressable
      isFooterBlurred
      radius="lg"
      className={`group relative w-full overflow-hidden border border-ink-500/80 bg-ink-950 transition-transform duration-300 ${className ?? ''}`}
    >
      <Image
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        alt={preview.image?.alt ?? 'Próximamente disponible'}
        src={preview.image?.url ?? '/coming-soon.webp'}
      />

      <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 group-focus-visible:bg-black/10" />

      <div className="absolute left-4 top-4 z-20">
        <ProjectStatusChip status={status} />
      </div>

      <div className="pointer-events-none absolute right-4 top-4 z-20 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <Chip
          size="sm"
          radius="full"
          variant="solid"
          endContent={<IconArrowUpRight size={15} stroke={1.8} />}
          classNames={{
            base: 'h-8 border border-white/15 !bg-ink-950/90 px-2 shadow-sm',
            content: 'px-0 text-xs font-medium !text-white',
          }}
        >
          Ver proyecto
        </Chip>
      </div>

      <CardFooter className="absolute inset-x-0 bottom-0 z-10 flex-col items-start gap-1.5 border-t border-white/20 bg-ink-50/75 p-4 backdrop-blur-xl sm:p-5 lg:p-4">
        <h3 className="text-xl font-semibold leading-tight text-ink-900">
          {title}
        </h3>

        <p className="line-clamp-2 text-base leading-relaxed text-ink-900">
          {preview.short_description}
        </p>
      </CardFooter>
    </Card>
  );
};
