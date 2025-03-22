'use client';

import React from 'react';
import { Grandstander } from 'next/font/google';

import ProfileCard from '../components/ProfileCard';
import StatCard from '../components/StatCard';

export const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const HeroSection = () => {
  const currentYear = new Date().getFullYear();
  const yearOfExperience = currentYear - 2023;
  const PROJECTS_COMPLETED = 10;

  return (
    <section className="flex flex-col gap-7">
      <ProfileCard />

      <article className="flex flex-col gap-7 md:flex-row">
        <StatCard
          label="Años de Experiencia"
          duration={3}
          value={yearOfExperience}
        />
        <StatCard label="Proyectos Realizados" value={PROJECTS_COMPLETED} />
      </article>
    </section>
  );
};

export default HeroSection;
