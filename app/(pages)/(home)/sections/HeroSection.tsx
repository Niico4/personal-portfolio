'use client';

import React from 'react';
import { Grandstander } from 'next/font/google';
import CountUp from 'react-countup';
import { Card, CardBody } from '@heroui/card';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react';

import ButtonSocial from '../components/ButtonSocial';
import ProfileCard from '../components/ProfileCard';

export const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const HeroSection = () => {
  return (
    <section className="flex flex-col gap-6">
      <ProfileCard />

      <article className="flex flex-col gap-6 md:flex-row">
        <Card className="card-bg flex-1 p-4" isBlurred>
          <CardBody>
            <span
              className={`${grandstander.className} text-primary-200 text-4xl font-semibold`}
            >
              +
              <CountUp
                end={new Date().getFullYear() - 2022}
                start={0}
                duration={2.5}
              />
            </span>
            <p className="text-2xl font-medium text-paragraph">
              Años de Experiencia
            </p>
          </CardBody>
        </Card>

        <Card className="card-bg flex-1 p-4" isBlurred>
          <CardBody>
            <span
              className={`${grandstander.className} text-primary-200 text-4xl font-semibold`}
            >
              +<CountUp end={20} start={0} duration={2} />
            </span>
            <p className="text-2xl font-medium text-paragraph">
              Proyectos Realizados
            </p>
          </CardBody>
        </Card>

        <Card className="card-bg p-4" isBlurred>
          <CardBody>
            <span
              className={`${grandstander.className} text-primary-200 text-3xl font-semibold max-md:text-center`}
            >
              ¿Hablamos?
            </span>
            <div className="flex-center md:gap-1 lg:gap-3">
              <ButtonSocial
                href="mailto:nicogarzon131@gmail.com"
                icon={IconMail}
                label="Gmail"
              />
              <ButtonSocial
                href="https://www.linkedin.com/in/nicolasgarzon131/'"
                icon={IconBrandLinkedin}
                label="LinkedIn"
              />
              <ButtonSocial
                href="https://github.com/Niico4"
                icon={IconBrandGithub}
                label="GitHub"
              />
            </div>
          </CardBody>
        </Card>
      </article>
    </section>
  );
};

export default HeroSection;
