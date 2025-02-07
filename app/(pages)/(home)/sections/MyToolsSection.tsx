'use client';

import React from 'react';
import { Grandstander } from 'next/font/google';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Tooltip } from '@heroui/tooltip';

import { TECH_ICONS, TOOLS_ICONS } from '../constants/tools.data';

export const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const MyToolsSection = () => {
  return (
    <section className="flex-col-center gap-10">
      <h2 className={`title-section ${grandstander.className}`}>
        Mis Secretos para Crear
      </h2>

      <article className="flex flex-col items justify-center gap-10 md:flex-row">
        <Card className="p-6 card-bg md:gap-6">
          <CardHeader className="justify-center">
            <h3 className="font-medium text-paragraph/90 text-2xl">
              Mis herramientas favoritas
            </h3>
          </CardHeader>
          <CardBody className="flex-row flex-wrap items-center justify-center gap-8 p-6 bg-[#33415590] rounded-lg shadow-md shadow-white/15">
            {TECH_ICONS.map(({ name, icon: Icon }) => (
              <Tooltip key={name} content={name} showArrow>
                <Icon className="w-auto h-10 lg:h-14 2xl:h-18" />
              </Tooltip>
            ))}
          </CardBody>
        </Card>

        <Card className="p-6 card-bg md:gap-6">
          <CardHeader className="justify-center">
            <h3 className="font-medium text-paragraph/90 text-2xl">
              Lo que nunca falta
            </h3>
          </CardHeader>
          <CardBody className="flex-row flex-wrap items-center justify-center gap-8 p-6 bg-[#33415590] rounded-lg shadow-md shadow-white/15">
            {TOOLS_ICONS.map(({ name, icon: Icon }) => (
              <Tooltip key={name} content={name} showArrow>
                <Icon className="w-auto h-10 lg:h-14 2xl:h-18" />
              </Tooltip>
            ))}
          </CardBody>
        </Card>
      </article>
    </section>
  );
};

export default MyToolsSection;
