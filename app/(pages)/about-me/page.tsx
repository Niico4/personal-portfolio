import React from 'react';

import { generateMetadata } from '@/layout';
import Slider from '@/components/slider/Slider';

import { OPTIONS_TECH_SKILLS, TECH_SKILLS_SLIDES } from './constants/tech.data';
import {
  CardAboutMe,
  CardEducation,
  CardExperience,
  CardInterests,
  CardService,
} from './components/cards';

export const metadata = generateMetadata({
  title: 'Sobre Mi',
  description:
    'Soy un desarrollador web con experiencia en React, Next.js, y tecnologías web modernas. Descubre mi trayectoria, habilidades y educación en desarrollo web. ¡Ve cómo puedo ayudarte a construir soluciones digitales innovadoras!',
});

const AboutMePage = () => {
  return (
    <div className="flex flex-col gap-10 mx-auto">
      <h2 className="text-IColorPrimary text-4xl font-semibold mx-auto">
        Conóceme Mejor
      </h2>
      <section className="flex flex-col gap-4">
        <div className="flex gap-4">
          <article className="flex flex-col gap-4 w-7/12">
            <CardAboutMe />
            <CardInterests />
          </article>

          <article className="flex flex-col gap-4 w-2/5">
            <CardEducation />
            <CardService />
          </article>
        </div>
        <article>
          <CardExperience />
        </article>
      </section>
      <section className="bg-tech p-8 backdrop-blur-lg">
        <Slider
          options={OPTIONS_TECH_SKILLS}
          slides={TECH_SKILLS_SLIDES}
          isAutoScroll
        />
      </section>
    </div>
  );
};
export default AboutMePage;
