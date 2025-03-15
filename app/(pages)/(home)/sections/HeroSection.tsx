'use client';

import React from 'react';
import { Grandstander } from 'next/font/google';
import { Card, CardBody } from '@heroui/card';

import SocialLink from '../components/SocialLink';
import ProfileCard from '../components/ProfileCard';
import StatCard from '../components/StatCard';
import { PROJECTS_COMPLETED, SOCIAL_LINKS } from '../data/profile';

export const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const HeroSection = () => {
  const currentYear = new Date().getFullYear();
  const yearOfExperience = currentYear - 2022;

  return (
    <section className="flex flex-col gap-6">
      <ProfileCard />

      <article className="flex flex-col gap-6 md:flex-row">
        <StatCard
          label="Años de Experiencia"
          duration={3}
          value={yearOfExperience}
        />
        <StatCard label="Proyectos Realizados" value={PROJECTS_COMPLETED} />

        <Card className="card-bg p-1 md:p-4" isBlurred>
          <CardBody>
            <span
              className={`${grandstander.className} text-primary-200 text-3xl font-semibold text-center`}
            >
              ¿Hablamos?
            </span>
            <div className="flex-center md:gap-1 lg:gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }, index) => (
                <SocialLink key={index} href={href} icon={icon} label={label} />
              ))}
            </div>
          </CardBody>
        </Card>
      </article>
    </section>
  );
};

export default HeroSection;
