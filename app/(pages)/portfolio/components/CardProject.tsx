import React, { FC } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from '@nextui-org/react';
import Image from 'next/image';
import { IconBrandGithub, IconWorldWww } from '@tabler/icons-react';
import Link from 'next/link';

interface ICardProps {
  title: string;
  description: string;
  image: string;
  urlEndpoint: string;
  technologies: string[];
  repository: string;
  webSite: string;
}

const ButtonsFooterCard: FC<Pick<ICardProps, 'repository' | 'webSite'>> = ({
  repository,
  webSite,
}) => (
  <>
    {repository && (
      <Link href={repository}>
        <Button
          variant="flat"
          color="default"
          className="text-IColorPrimary"
          startContent={<IconBrandGithub />}
        >
          Repositorio
        </Button>
      </Link>
    )}
    {webSite && (
      <Link href={webSite}>
        <Button
          variant="solid"
          color="primary"
          className="text-slate-800 font-semibold"
          startContent={<IconWorldWww />}
        >
          Sitio Web
        </Button>
      </Link>
    )}
  </>
);

const ProjectCard: FC<ICardProps> = ({
  image,
  description,
  title,
  urlEndpoint,
  technologies,
  repository,
  webSite,
}) => {
  const srcImage = `${urlEndpoint}${image}.webp`;
  return (
    <Card className="bg-slate-900/70 border border-slate-600 flex-1">
      <CardHeader>
        <figure className="aspect-video">
          <Image
            src={srcImage}
            alt={`Imagen de ${title}`}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover opacity-80 hover:scale-110 hover:opacity-100 transition-all"
            loading="lazy"
          />
        </figure>
      </CardHeader>
      <CardBody className="px-6">
        <h3 className="text-3xl font-bold text-IColorPrimary mb-5 text-slate-200">
          {title}
        </h3>
        <p className="text-lg text-slate-300">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
          {technologies.map((technology, index) => (
            <Chip
              key={index}
              variant="flat"
              className="text-blue-300 capitalize"
              color="primary"
              radius="lg"
            >
              {technology}
            </Chip>
          ))}
        </div>
      </CardBody>
      <CardFooter className="flex-row justify-center gap-4 mb-5">
        <ButtonsFooterCard repository={repository} webSite={webSite} />
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
