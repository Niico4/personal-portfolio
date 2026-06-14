'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardFooter } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { IconArrowUpRight } from '@tabler/icons-react';

import comingSoonWebp from '../../../public/coming_soon.webp';

import { ProjectInformationType } from '@/sanity/lib/types/project.type';

const ProjectCard = ({
  project,
  className,
}: {
  project: ProjectInformationType;
  className?: string;
}) => {
  const { title, slug, project_information_preview: preview } = project;

  return (
    <Card
      as={Link}
      href={`/portfolio/${slug}`}
      isPressable
      isFooterBlurred
      radius="lg"
      className={`group relative w-full overflow-hidden border border-ink-500/80 bg-ink-950 transition-transform duration-300 ${className}`}
    >
      <Image
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        alt={preview.image?.alt ?? 'Próximamente disponible'}
        src={preview.image?.url ?? comingSoonWebp}
      />

      <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 group-focus-visible:bg-black/10" />

      <div className="absolute right-4 top-4 z-20 opacity-0 shadow-sm backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 translate-y-2">
        <Chip
          endContent={<IconArrowUpRight size={18} stroke={1.7} />}
          size="lg"
          color="primary"
        >
          Ver proyecto
        </Chip>
      </div>

      <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex-col items-start gap-1.5 border-t border-white/20 bg-ink-50/70 p-5 backdrop-blur-xl">
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

export default ProjectCard;
