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
      url: 'https://nicolas-garzon.vercel.app/',
      siteName: 'Portafolio de Nicolás Garzón',
      images: [
        {
          url: 'https://ik.imagekit.io/0isq9u6sl/portfolio.webp?updatedAt=1731277630302',
          width: 1200,
          height: 630,
          alt: 'Imagen destacada del portafolio de Nicolás Garzón',
        },
      ],
      type: 'website',
    },
    twitter: {
      title: 'Sobre Mi | Nicolás Garzón',
      description:
        'Soy un desarrollador web con experiencia en React, Next.js, y tecnologías web modernas. Descubre mi trayectoria, habilidades y educación en desarrollo web. ¡Ve cómo puedo ayudarte a construir soluciones digitales innovadoras!',
      card: 'summary_large_image',
      images: [
        'https://ik.imagekit.io/0isq9u6sl/portfolio.webp?updatedAt=1731277630302',
      ],
    },
    robots: 'index, follow',
  };
}

const AboutMePage = () => {
  return (
    <div className="flex flex-col gap-14 mx-auto">
      <h2 className="text-IColorPrimary text-4xl font-semibold mx-auto">
        Conóceme Mejor
      </h2>
      <section className="flex flex-col gap-4">
        <div className="flex max-md:flex-col gap-4">
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
      <section className="tech-gradient p-8 backdrop-blur-lg">
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
