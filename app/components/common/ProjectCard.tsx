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
import { useMediaQuery } from 'usehooks-ts';

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
  const isSmallDevice = useMediaQuery('(max-width : 375px)');

  const router = useRouter();

  const timestamp = new Date().getTime();
  const srcImage = `${urlEndpoint}${image}.webp?=${timestamp}`;

  return (
    <Card
      className="relative border border-white/10 overflow-hidden backdrop-blur-lg"
      isBlurred
      fullWidth
      radius="sm"
    >
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-[0.06]"></div>

      <CardHeader className="overflow-hidden h-[150px] sm:h-[200px] p-0">
        {isDev && (
          <div className="absolute top-0 left-0 right-0 flex items-center justify-end p-2 z-10 w-full backdrop-blur-md bg-white/5">
            <Chip
              color="warning"
              variant="flat"
              radius="sm"
              size={isSmallDevice ? 'sm' : 'md'}
              startContent={
                <IconLoader stroke={1.5} size={isSmallDevice ? 18 : 20} />
              }
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
            width={390}
            height={220}
            src={srcImage}
            alt={title}
            onLoad={() => setIsImageLoaded(true)}
            className="w-full h-full object-cover transition-all opacity-85 hover:scale-110"
            priority
          />
        </Skeleton>
      </CardHeader>

      <CardBody className="flex-1 gap-3 backdrop-blur-sm bg-white/[0.06]">
        <h3 className="text-default font-bold text-[28px] lg:text-2xl">
          {title}
        </h3>

        <div className="flex items-center gap-4">
          {webSite && (
            <Button
              as={Link}
              href={webSite}
              radius="sm"
              color="secondary"
              startContent={<IconExternalLink stroke={1.5} size={20} />}
              aria-label="Sitio Web"
              target="_blank"
              rel="noopener noreferrer"
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
            startContent={<IconInfoCircle stroke={1.5} size={20} />}
            size={isSmallDevice ? 'sm' : 'md'}
            onPress={() => router.push(`/portfolio/${image}`)}
          >
            Detalles
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
