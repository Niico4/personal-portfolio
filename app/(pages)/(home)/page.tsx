import React from 'react';

import { generateMetadata } from '@/layout';
import HeroSection from '@/components/sections/hero/HeroSection';

export const metadata = generateMetadata({
  title: 'Desarrollador Frontend',
  description:
    'Bienvenido al portafolio de Nicolás Garzón, un desarrollador frontend con experiencia en crear webs innovadoras, rápidas y optimizadas. Descubre proyectos web modernos y responsivos, los servicios de desarrollo frontend que ofrece, y su experiencia en tecnologías como React, Next.js y JavaScript. Conoce más sobre su trayectoria y cómo puede ayudarte a crear sitios web de alto rendimiento.',
});

const HomePage = () => {
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default HomePage;
