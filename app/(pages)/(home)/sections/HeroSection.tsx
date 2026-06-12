'use client';

import React from 'react';
import { Card, CardBody } from '@heroui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/button';
import { IconFileCvFilled } from '@tabler/icons-react';

import StatCard from '../components/StatCard';

import { DYNA_PUFF } from '@/layout';

const HeroSection = () => {
  const currentYear = new Date().getFullYear();
  const yearOfExperience = currentYear - 2023;
  const PROJECTS_COMPLETED = 8;

  return (
    <section className="flex flex-col sm:flex-row justify-center gap-5">
      <Card
        className="justify-center card-bg p-4 w-full sm:w-1/3 mx-auto"
        radius="sm"
        isBlurred
      >
        <div className="flex-col-center gap-3 w-3/4 mx-auto">
          <figure className="w-3/4 sm:w-[90%] profile-gradient rounded-full overflow-hidden shadow-[inset_0_0_8px_rgba(255,255,255,0.2),_0_0_13px_rgba(255,255,255,0.3)]">
            <Image
              alt="Avatar de Niico"
              className="object-cover h-full w-full backdrop-blur-sm p-1 bg-black/15 rounded-full border-2 border-white/20"
              src="/avatar.webp"
              height={208}
              width={208}
              priority
            />
          </figure>

          <ul className="flex-center w-1/2 sm:w-4/5">
            <li className="text-sm font-medium text-default tracking-wide text-center">
              <em>Desarrollador de Software</em>
            </li>
          </ul>

          <Button
            aria-label="Currículum"
            as={Link}
            color="primary"
            href="https://drive.google.com/file/d/1q9klaXbJcQRWaY1JntJmqvvvuYI--5ln/view?usp=drive_link"
            rel="noopener noreferrer"
            startContent={<IconFileCvFilled size={20} />}
            size="sm"
            target="_blank"
            fullWidth
          >
            Currículum
          </Button>
        </div>
      </Card>

      <article className="flex flex-col gap-5 sm:w-3/4">
        <Card
          className="sm:flex-row items-center justify-center card-bg gap-6 p-5 w-full "
          radius="sm"
          isBlurred
        >
          <CardBody className="gap-5 p-0">
            <div className="flex flex-col gap-2">
              <h1
                className={`${DYNA_PUFF.className} text-title text-[40px] text-center font-medium md:text-start`}
              >
                ¡Hola!, soy <span className="text-animate">Nicolas</span>
              </h1>

              <p className="text-default font-light tracking-wide leading-relaxed">
                Transformo ideas en webs reales:{' '}
                <strong className="font-medium">
                  diseño la personalidad visual y programo lo que hay bajo el
                  capó
                </strong>
                . ¿El resultado? Algo que se siente natural, pero que no pasa
                desapercibido.
              </p>
            </div>
          </CardBody>
        </Card>

        <div className="flex flex-col gap-5 md:flex-row">
          <StatCard
            label="Años de Experiencia"
            duration={3}
            value={yearOfExperience}
          />
          <StatCard label="Proyectos Realizados" value={PROJECTS_COMPLETED} />
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
