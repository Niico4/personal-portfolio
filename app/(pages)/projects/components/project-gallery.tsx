'use client';

import {
  IconChevronLeft,
  IconChevronRight,
  IconMaximize,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { ProjectType } from '@/sanity/lib/types/project.type';

interface ProjectGalleryProps {
  title: string;
  images: ProjectType['media']['gallery'];
}

export const ProjectGallery = ({ title, images }: ProjectGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    updateCurrent();

    api.on('select', updateCurrent);
    api.on('reInit', updateCurrent);

    return () => {
      api.off('select', updateCurrent);
      api.off('reInit', updateCurrent);
    };
  }, [api]);

  const selectedImage = images[current] ?? images[0];

  if (!selectedImage) return null;

  const hasMultipleImages = images.length > 1;

  const counter = `${String(current + 1).padStart(2, '0')} / ${String(
    images.length,
  ).padStart(2, '0')}`;

  return (
    <Dialog>
      <figure className="flex min-w-0 flex-col gap-2">
        <Carousel
          setApi={setApi}
          aria-label={`Galería de ${title}`}
          opts={{
            align: 'start',
            loop: false,
            breakpoints: {
              '(prefers-reduced-motion: reduce)': {
                duration: 0,
              },
            },
          }}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {images.map((image) => (
              <CarouselItem key={image.id} className="basis-full pl-0">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 704px, calc(100vw - 40px)"
                    className="object-contain object-center"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {hasMultipleImages && (
                <CarouselPrevious
                  aria-label="Imagen anterior"
                  className="static size-8 translate-y-0 rounded-lg"
                />
              )}

              <span
                role="status"
                className="text-xs text-fg-muted tabular-nums"
              >
                {counter}
              </span>

              {hasMultipleImages && (
                <CarouselNext
                  aria-label="Imagen siguiente"
                  className="static size-8 translate-y-0 rounded-lg"
                />
              )}
            </div>

            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-lg font-normal text-fg-secondary"
                />
              }
            >
              <IconMaximize
                aria-hidden="true"
                stroke={1.5}
                className="size-4"
              />
              Ampliar
            </DialogTrigger>
          </div>
        </Carousel>

        {selectedImage.caption && (
          <figcaption className="text-xs leading-relaxed text-fg-muted">
            {selectedImage.caption}
          </figcaption>
        )}
      </figure>

      <DialogContent
        className="max-h-[94dvh] w-[94vw] max-w-none gap-4 overflow-y-auto p-3 sm:max-w-6xl sm:p-5"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            api?.scrollPrev(true);
          }

          if (event.key === 'ArrowRight') {
            event.preventDefault();
            api?.scrollNext(true);
          }
        }}
      >
        <div className="space-y-1 pr-8">
          <DialogTitle className="text-base font-medium">{title}</DialogTitle>

          <DialogDescription className="text-xs text-fg-muted">
            Galería del proyecto
          </DialogDescription>
        </div>

        <div className="relative flex min-w-0 items-center justify-center">
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt}
            width={selectedImage.width}
            height={selectedImage.height}
            sizes="(min-width: 1280px) 1100px, 90vw"
            className="h-auto max-h-[65dvh] w-auto max-w-full rounded-lg object-contain sm:max-h-[72dvh]"
          />

          {hasMultipleImages && (
            <>
              <Button
                variant="outline"
                size="icon"
                aria-label="Imagen anterior"
                disabled={!api || current === 0}
                onClick={() => api?.scrollPrev(true)}
                className="absolute left-2 hidden rounded-full bg-background/80 backdrop-blur-md sm:inline-flex"
              >
                <IconChevronLeft
                  aria-hidden="true"
                  stroke={1.5}
                  className="size-5"
                />
              </Button>

              <Button
                variant="outline"
                size="icon"
                aria-label="Imagen siguiente"
                disabled={!api || current >= images.length - 1}
                onClick={() => api?.scrollNext(true)}
                className="absolute right-2 hidden rounded-full bg-background/80 backdrop-blur-md sm:inline-flex"
              >
                <IconChevronRight
                  aria-hidden="true"
                  stroke={1.5}
                  className="size-5"
                />
              </Button>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-3">
          {hasMultipleImages && (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                aria-label="Imagen anterior"
                disabled={!api || current === 0}
                onClick={() => api?.scrollPrev(true)}
                className="rounded-lg sm:hidden"
              >
                <IconChevronLeft aria-hidden="true" stroke={1.5} />
              </Button>

              <div role="status" className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      aria-label={`Ir a la imagen ${index + 1}`}
                      aria-current={index === current ? 'true' : undefined}
                      onClick={() => api?.scrollTo(index, true)}
                      className="flex h-6 items-center rounded-full px-0.5 focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-1.5 rounded-full motion-safe:transition-[width,background-color] motion-safe:duration-200',
                          index === current
                            ? 'w-4 bg-fg-default'
                            : 'w-1.5 bg-fg-muted/40',
                        )}
                      />
                    </button>
                  ))}
                </div>

                <span className="text-xs text-fg-muted tabular-nums">
                  {counter}
                </span>
              </div>

              <Button
                variant="outline"
                size="icon"
                aria-label="Imagen siguiente"
                disabled={!api || current >= images.length - 1}
                onClick={() => api?.scrollNext(true)}
                className="rounded-lg sm:hidden"
              >
                <IconChevronRight aria-hidden="true" stroke={1.5} />
              </Button>
            </div>
          )}

          {selectedImage.caption && (
            <p className="text-center text-sm text-fg-secondary">
              {selectedImage.caption}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
