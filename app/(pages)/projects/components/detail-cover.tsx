import { IconArrowsMaximize } from '@tabler/icons-react';
import Image from 'next/image';

import { ImageZoom } from '@/(pages)/projects/components/image-zoom';
import type { DetailCover as DetailCoverType } from '@/sanity/lib/types/project.type';

interface DetailCoverProps {
  title: string;
  image: DetailCoverType;
}

const getCropRect = (image: DetailCoverType) => {
  const { crop } = image;

  if (!crop) return image;

  const { top, bottom, left, right } = crop;

  if (!top && !bottom && !left && !right) return image;

  const width = Math.round((1 - left - right) * image.width);
  const height = Math.round((1 - top - bottom) * image.height);

  if (width <= 0 || height <= 0) return image;

  const x = Math.round(left * image.width);
  const y = Math.round(top * image.height);

  return {
    ...image,
    url: `${image.url}?rect=${x},${y},${width},${height}`,
    width,
    height,
  };
};

export const DetailCover = ({ title, image }: DetailCoverProps) => {
  const view = getCropRect(image);
  const alt = image.alt?.trim() || `Portada de ${title}`;
  const caption = image.caption?.trim();

  return (
    <ImageZoom image={image} alt={alt} label={`Portada de ${title}`}>
      <Image
        src={view.url}
        width={view.width}
        height={view.height}
        sizes="(min-width: 760px) 680px, calc(100vw - 3rem)"
        alt={alt}
        preload
        className="h-auto w-full rounded-xl"
      />

      <span className="flex min-h-11 items-center justify-between gap-[0.65rem] text-[0.8rem] text-muted-foreground">
        {caption && (
          <span className="inline-flex items-center gap-[0.35rem]">
            {caption}
          </span>
        )}

        <span className="ml-auto inline-flex shrink-0 items-center gap-[0.35rem] group-hover/zoom:text-primary group-focus-visible/zoom:text-primary group-active/zoom:text-primary">
          <IconArrowsMaximize size={14} aria-hidden="true" />
          Ampliar imagen
        </span>
      </span>
    </ImageZoom>
  );
};
