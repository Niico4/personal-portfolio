import { Button } from '@heroui/button';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { IconExternalLink, IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import { Project } from '@prisma/client';
import { useMediaQuery } from 'usehooks-ts';

import Heading from '@/components/common/Heading';

const DescriptionCard = (
  project: Pick<Project, 'title' | 'description' | 'repository' | 'web_site'>,
) => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 370px)');
  return (
    <Card className="card-bg shrink p-4" radius="sm" isBlurred>
      <CardHeader className="flex-col items-start">
        <Heading title={project.title} type="h2" className="sm:text-5xl" />
      </CardHeader>
      <CardBody>
        <p className="text-default text-base sm:text-lg text-pretty tracking-wide">
          {project.description}
        </p>
      </CardBody>
      <CardFooter className="flex items-center gap-4">
        {project.web_site && (
          <Button
            as={Link}
            href={project.web_site}
            rel="noopener noreferrer"
            target="_blank"
            variant="solid"
            color="primary"
            aria-label="Sitio Web"
            startContent={<IconExternalLink stroke={1.5} size={20} />}
            radius="sm"
            size={isSmallDevice ? 'sm' : 'md'}
          >
            Sitio Web
          </Button>
        )}
        {project.repository && (
          <Button
            as={Link}
            href={project.repository}
            rel="noopener noreferrer"
            target="_blank"
            variant="flat"
            color="default"
            aria-label="Repositorio"
            startContent={<IconBrandGithub stroke={1.5} size={20} />}
            radius="sm"
            size={isSmallDevice ? 'sm' : 'md'}
          >
            Repositorio
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DescriptionCard;
