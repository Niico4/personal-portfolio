'use client';

import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Grandstander } from 'next/font/google';
import { Card, CardFooter, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Skeleton } from '@heroui/skeleton';
import { IconCode, IconExternalLink, IconEye } from '@tabler/icons-react';

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
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  const timestamp = new Date().getTime();
  const srcImage = `${urlEndpoint}${image}.webp?=${timestamp}`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const handleResize = () => setIsMobile(window.innerWidth < 500);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isClient]);

  if (!isClient) return null;

  return (
    <Card
      isFooterBlurred
      radius="sm"
      className="relative w-full h-full aspect-video max-w-[450px] col-span-12 sm:col-span-7 border border-white/15 md:hover:scale-105"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start gap-4">
        {isDev && (
          <Chip
            color="warning"
            variant="flat"
            startContent={<IconCode stroke={1.5} />}
          >
            En Desarrollo
          </Chip>
        )}
      </CardHeader>

      <Skeleton isLoaded={isImageLoaded} className="">
        <Image
          width={450}
          height={300}
          alt={title}
          className="z-0 w-full h-auto aspect-video object-cover"
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
          className={`${grandstander.className} text-faint font-bold max-sm:text-2xl text-3xl`}
        >
          {title}
        </h4>
        <div className="flex items-center md:items-start gap-2 md:gap-4 w-full">
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

          <Button
            radius="sm"
            variant="solid"
            color="secondary"
            aria-label="Ver Detalles"
            startContent={<IconEye />}
            size={isMobile ? 'sm' : 'md'}
            onPress={() => router.push(`/portfolio/${image}`)}
          >
            Ver Detalles
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
