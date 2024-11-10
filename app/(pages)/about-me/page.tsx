import React from 'react';
import { Metadata } from 'next';

import Slider from '@/components/slider/Slider';

import {
  CardAboutMe,
  CardEducation,
  CardExperience,
  CardInterests,
  CardService,
} from './components/cards';
import { OPTIONS_TECH_SKILLS, TECH_SKILLS_SLIDES } from './constants/tech.data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sobre Mi | Nicolas Garzón',
    description:
      'Soy un desarrollador web con experiencia en React, Next.js, y tecnologías web modernas. Descubre mi trayectoria, habilidades y educación en desarrollo web. ¡Ve cómo puedo ayudarte a construir soluciones digitales innovadoras!',
    openGraph: {
      title: 'Sobre Mi | Nicolas Garzón',
      description:
        'Soy un desarrollador web con experiencia en React, Next.js, y tecnologías web modernas. Descubre mi trayectoria, habilidades y educación en desarrollo web. ¡Ve cómo puedo ayudarte a construir soluciones digitales innovadoras!',
    },
    twitter: {
      title: 'Sobre Mi | Nicolás Garzón',
      description:
        'Soy un desarrollador web con experiencia en React, Next.js, y tecnologías web modernas. Descubre mi trayectoria, habilidades y educación en desarrollo web. ¡Ve cómo puedo ayudarte a construir soluciones digitales innovadoras!',
    },
  };
}

const AboutMePage = () => {
  return (
    <div className="flex flex-col gap-10 mx-auto md:mx-5 max-lg:mx-5">
      <h2 className="text-IColorPrimary text-4xl font-semibold mx-auto">
        Conóceme Mejor
      </h2>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <article className="flex flex-col gap-4 md:w-7/12">
            <CardAboutMe />
            <CardInterests />
          </article>

          <article className="flex flex-col gap-4 md:w-2/5">
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
