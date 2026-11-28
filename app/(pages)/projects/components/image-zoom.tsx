'use client';

import Image from 'next/image';
import { type ReactNode, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { ProjectImageSource } from '@/sanity/lib/types/project.type';

interface ImageZoomProps {
  image: ProjectImageSource;
  alt: string;
  label: string;
  children: ReactNode;
}

const actionClassName =
  'min-h-11 min-w-11 px-2 text-[0.8rem] font-normal hover:bg-transparent hover:text-primary';

export const ImageZoom = ({ image, alt, label, children }: ImageZoomProps) => {
  const viewport = useRef<HTMLElement>(null);
  const [zoomed, setZoomed] = useState(false);

  const isPortrait = image.width < image.height;

  const toggleZoom = () => {
    viewport.current?.scrollTo(0, 0);
    setZoomed((current) => !current);
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setZoomed(false);
      }}
    >
      <DialogTrigger
        aria-label={`Ampliar imagen: ${label}`}
        className="group/zoom relative block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
      >
        {children}
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-background/94 supports-backdrop-filter:backdrop-blur-none motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none"
        className="max-h-[calc(100dvh-2rem)] w-[min(75rem,calc(100vw-2rem))] max-w-none grid-rows-[auto_minmax(0,1fr)] gap-0 rounded-none bg-background p-0 text-foreground ring-0 sm:max-w-none motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none"
      >
        <DialogHeader className="min-h-11 flex-row flex-wrap items-center justify-between gap-x-3 gap-y-0 px-[0.65rem] py-1">
          <DialogTitle className="min-w-0 text-[0.8rem] leading-normal font-normal wrap-anywhere text-muted-foreground">
            {label}
          </DialogTitle>

          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="ghost"
              className={actionClassName}
              onClick={toggleZoom}
            >
              {zoomed ? 'Ajustar' : 'Ver detalle'}
            </Button>

            <DialogClose
              render={<Button variant="ghost" className={actionClassName} />}
            >
              Cerrar
            </DialogClose>
          </div>
        </DialogHeader>

        <section
          ref={viewport}
          tabIndex={zoomed ? 0 : undefined}
          aria-label="Imagen ampliada"
          className="min-h-0 [scrollbar-color:var(--muted-foreground)_var(--background)] overflow-auto overscroll-contain"
        >
          <Image
            src={image.url}
            alt={alt}
            width={image.width}
            height={image.height}
            sizes={
              zoomed
                ? isPortrait
                  ? 'min(90vw, 560px)'
                  : 'clamp(800px, 150vw, 1800px)'
                : 'min(75rem, calc(100vw - 2rem))'
            }
            className={cn(
              'mx-auto block h-auto object-contain',
              zoomed
                ? cn(
                    'max-h-none max-w-none',
                    isPortrait ? 'w-[min(90vw,560px)]' : 'w-[max(150%,800px)]',
                  )
                : 'max-h-[78dvh] w-auto max-w-full',
            )}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
};
