'use client';

import React from 'react';
import CountUp from 'react-countup';
import { Card, CardBody } from '@heroui/card';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from '@tabler/icons-react';

import { grandstander } from '@/layout';

import ButtonSocial from '../components/sections/hero/ButtonSocial';
import ProfileCard from '../components/sections/hero/ProfileCard';

const HeroSection = () => {
  return (
    <section className="flex flex-col gap-6">
      <ProfileCard />

      <article className="flex flex-col gap-6 md:flex-row">
        <Card className="card-bg flex-1 p-4">
          <CardBody>
            <span
              className={`${grandstander.className} text-primary-200 text-4xl font-semibold`}
            >
              +
              <CountUp
                end={new Date().getFullYear() - 2022}
                start={0}
                duration={3}
              />
            </span>
            <p className="text-2xl font-medium text-paragraph">
              Años de Experiencia
            </p>
          </CardBody>
        </Card>

        <Card className="card-bg flex-1 p-4">
          <CardBody>
            <span
              className={`${grandstander.className} text-primary-200 text-4xl font-semibold`}
            >
              +<CountUp end={20} start={0} duration={3} />
            </span>
            <p className="text-2xl font-medium text-paragraph">
              Proyectos Realizados
            </p>
          </CardBody>
        </Card>

        <Card className="card-bg flex-1 p-3">
          <CardBody className="justify-center items-center gap-2">
            <span
              className={`${grandstander.className} text-primary-200 text-3xl font-semibold`}
            >
              Redes Sociales
            </span>
            <div className="flex-center md:gap-1 lg:gap-3">
              <ButtonSocial
                href="mailto:nicogarzon131@gmail.com"
                icon={IconMail}
                label="Gmail"
              />
              <ButtonSocial
                href="https://github.com/Niico4"
                icon={IconBrandGithub}
                label="GitHub"
              />
              <ButtonSocial
                href="https://www.linkedin.com/in/nicolasgarzon131/'"
                icon={IconBrandLinkedin}
                label="LinkedIn"
              />
              <ButtonSocial
                href="https://x.com/Niico4_"
                icon={IconBrandX}
                label="Twitter"
              />
            </div>
          </CardBody>
        </Card>
      </article>
    </section>
  );
};

export default HeroSection;
