import React from 'react';
import { Metadata } from 'next';

import HeroSection from './components/sections/hero/HeroSection';
import SkillsSection from './components/sections/skills/SkillsSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Desarrollador Frontend | Nicolas Garzón',
    description:
      'Bienvenido al portafolio de Nicolás Garzón, un desarrollador frontend con experiencia en crear webs innovadoras, rápidas y optimizadas. Descubre proyectos web modernos y responsivos, los servicios de desarrollo frontend que ofrece, y su experiencia en tecnologías como React, Next.js y JavaScript. Conoce más sobre su trayectoria y cómo puede ayudarte a crear sitios web de alto rendimiento.',
  };
}

const HomePage = () => {
  return (
    <div className="flex flex-col gap-10">
      <HeroSection />
      <SkillsSection />
    </div>
  );
};

export default HomePage;
