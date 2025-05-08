'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@heroui/card';
import { Chip } from '@heroui/chip';

import useProjects from '@/hooks/useProjects';
import ErrorSection from '@/components/common/ErrorSection';
import { TECHNOLOGIES_LIST } from '@/data/technologies';
import GoBackLink from '@/components/common/GoBackLink';

import DescriptionCard from './DescriptionCard';

type Feature = {
  title: string;
  highlight?: boolean;
  children?: FeatureChild[];
};

type FeatureChild = {
  text: string;
};

const renderFeature = (feature: Feature, index: number) => {
  const isNested =
    Array.isArray(feature.children) && feature.children.length > 0;

  const isBold = feature.highlight ? 'font-semibold' : 'font-light';
  const Title = () => (
    <p
      className={`text-default text-base sm:text-lg text-pretty tracking-wide ${isBold}`}
    >
      {feature.title}
    </p>
  );

  return (
    <li key={index} className="text-default">
      {isNested ? (
        <>
          <Title />

          <ul className="ml-4 list-disc">
            {feature.children!.map((child, idx) => (
              <li key={idx} className="text-soft">
                {child.text}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Title />
      )}
    </li>
  );
};

const ProjectDetailSection = () => {
  const params = useParams();
  const { projects } = useProjects();

  const project = projects.find((project) => project.slug === params.slug);

  if (!project)
    return (
      <ErrorSection
        error={`Parece que el proyecto no existe o ha sido eliminado.`}
      />
    );

  const features = project.features as Feature[];

  const renderTech = (tech: string) => {
    const techItem = TECHNOLOGIES_LIST.find(
      (techObj) => techObj.label === tech
    );
    return techItem ? <techItem.icon className="size-full p-1" /> : null;
  };

  return (
    <>
      <section className="flex flex-col gap-8 md:gap-8">
        <div className="flex flex-col items-start">
          <GoBackLink href="/portfolio" />
        </div>

        <article className="grid md:grid-cols-[1fr_40%] gap-8">
          <DescriptionCard
            title={project.title}
            description={project.description}
            repository={project.repository}
            web_site={project.web_site}
          />

          <Card className="card-bg p-5" radius="sm" isBlurred>
            <div className="flex flex-col gap-4">
              <h3 className="text-soft text-xl sm:text-2xl font-semibold">
                Creado con:
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    startContent={renderTech(tech)}
                    size="md"
                    variant="flat"
                    radius="sm"
                  >
                    {tech}
                  </Chip>
                ))}
              </div>
              <Chip
                size="md"
                variant="flat"
                radius="sm"
                color={project.isDev ? 'warning' : 'success'}
              >
                {project.isDev ? 'En desarrollo' : 'Completado'}
              </Chip>
            </div>
          </Card>
        </article>

        {features && Array.isArray(features) && (
          <article>
            <Card className="card-bg p-5" radius="sm" isBlurred>
              <div>
                <h3 className="text-subtitle text-xl sm:text-3xl font-semibold mb-2">
                  Características:
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  {features.map(renderFeature)}
                </ul>
              </div>
            </Card>
          </article>
        )}
      </section>
    </>
  );
};

export default ProjectDetailSection;
