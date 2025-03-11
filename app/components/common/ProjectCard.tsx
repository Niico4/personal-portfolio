import React, { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Skeleton } from '@heroui/skeleton';
import {
  IconExternalLink,
  IconInfoCircle,
  IconLoader,
} from '@tabler/icons-react';
import { useMediaQuery } from '@uidotdev/usehooks';

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
  const isSmallDevice = useMediaQuery('only screen and (max-width : 375px)');

  const router = useRouter();

  const timestamp = new Date().getTime();
  const srcImage = `${urlEndpoint}${image}.webp?=${timestamp}`;

  return (
    <Card
      className="project-card-animated border border-white/10 p-3 gap-5"
      fullWidth
      radius="sm"
    >
      <CardHeader className="overflow-hidden rounded-lg aspect-video p-0">
        {isDev && (
          <div className="absolute top-0 left-0 right-0 flex items-center justify-end p-2 z-10 w-full backdrop-blur-sm bg-white/5">
            <Chip
              color="warning"
              variant="flat"
              radius="sm"
              size={isSmallDevice ? 'sm' : 'md'}
              startContent={<IconLoader stroke={1.5} size={20} />}
            >
              En Desarrollo
            </Chip>
          </div>
        )}
        <Skeleton
          isLoaded={isImageLoaded}
          className="w-full h-full"
          classNames={{ content: 'h-full w-full' }}
        >
          <Image
            width={440}
            height={250}
            src={srcImage}
            alt={title}
            onLoad={() => setIsImageLoaded(true)}
            className="w-full h-full object-cover transition-all opacity-85 hover:scale-110"
          />
        </Skeleton>
      </CardHeader>

      <CardBody className="flex-1 gap-3 p-0">
        <h3 className="text-faint font-bold text-[28px] lg:text-3xl">
          {title}
        </h3>

        <div className="flex items-center gap-4">
          {webSite && (
            <Button
              as={Link}
              href={webSite}
              radius="sm"
              variant="flat"
              color="secondary"
              startContent={<IconExternalLink stroke={1.5} />}
              aria-label="Sitio Web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-300"
              size={isSmallDevice ? 'sm' : 'md'}
            >
              Sitio Web
            </Button>
          )}

          <Button
            radius="sm"
            variant="flat"
            color="default"
            aria-label="Ver Detalles"
            startContent={<IconInfoCircle stroke={1.5} />}
            size={isSmallDevice ? 'sm' : 'md'}
            onPress={() => router.push(`/portfolio/${image}`)}
          >
            Ver Detalles
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
