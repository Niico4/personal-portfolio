import React, { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grandstander } from 'next/font/google';
import { Card, CardFooter, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Skeleton } from '@heroui/skeleton';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import {
  IconExclamationCircle,
  IconExternalLink,
  IconEye,
} from '@tabler/icons-react';

import useMobile from '@/hooks/useMobile';

const grandstander = Grandstander({
  display: 'swap',
  subsets: ['latin'],
});
interface Props {
  title: string;
  image: string;
  isDev: boolean;
  urlEndpoint: string;
  webSite?: string;
}

const ProjectCard: FC<Props> = ({
  image,
  isDev,
  title,
  urlEndpoint,
  webSite,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { isMobile } = useMobile();

  const timestamp = new Date().getTime();
  const srcImage = `${urlEndpoint}${image}.webp?=${timestamp}`;

  return (
    <Card
      isFooterBlurred
      radius="sm"
      className="relative w-full md:w-[450px] col-span-12 sm:col-span-7 border border-white/15 md:hover:scale-105"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start gap-4">
        {isDev && (
          <Chip
            color="warning"
            variant="flat"
            startContent={<IconExclamationCircle stroke={1.5} />}
          >
            En Desarrollo
          </Chip>
        )}
      </CardHeader>

      <Skeleton
        isLoaded={isImageLoaded}
        className="aspect-video w-full md:w-[450px]"
      >
        <Image
          width={450}
          height={300}
          alt={title}
          className="z-0 aspect-video w-full h-full object-cover"
          src={srcImage}
          onLoad={() => setIsImageLoaded(true)}
        />
      </Skeleton>

      <div
        className={
          'absolute w-full h-full bg-gradient-to-t from-black/25 via-black/60 to-black/85'
        }
      />

      <CardFooter className="flex-col items-start gap-2 bg-black/15 border-gray-400/30 border-1 overflow-hidden py-1 absolute before:rounded-lg rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <h4
          className={`${grandstander.className} text-neutral-300 font-bold max-sm:text-2xl text-3xl`}
        >
          {title}
        </h4>
        <div className="flex items-center md:items-start max-md-gap-1 gap-4 w-full">
          {webSite && (
            <Button
              as={Link}
              href={webSite}
              radius="sm"
              variant="faded"
              color="secondary"
              startContent={<IconExternalLink />}
              aria-label="Sitio Web"
              target="_blank"
              rel="noopener noreferrer"
              size={isMobile ? 'sm' : 'md'}
            >
              Sitio Web
            </Button>
          )}

          <Popover
            placement="bottom"
            color="warning"
            showArrow
            backdrop="opaque"
          >
            <PopoverTrigger>
              <Button
                radius="sm"
                variant="solid"
                color="secondary"
                aria-label="Ver Detalles"
                startContent={<IconEye />}
                size={isMobile ? 'sm' : 'md'}
              >
                Ver Detalles
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <h3 className="text-base font-bold">
                  Funcionalidad en desarrollo
                </h3>
                <p className="text-small">
                  ¡Estoy trabajando en esta sección! Pronto podrás ver más
                  detalles sobre mis proyectos.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
