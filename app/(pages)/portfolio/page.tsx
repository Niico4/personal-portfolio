import React from 'react';

import { generateMetadata } from '@/layout';

import ProjectsSection from './components/sections/ProjectsSection';

export const metadata = generateMetadata({
  title: 'Portafolio',
  description:
    'Bienvenido a la sección donde podrás explorar los proyectos que he creado. Aquí he recopilado trabajos que muestran mi habilidad en el desarrollo frontend, abarcando diferentes tecnologías y enfoques. Cada proyecto refleja mi compromiso con la calidad, la innovación y la experiencia del usuario. ¡Echa un vistazo a mi trabajo y descubre cómo puedo ayudar a materializar tus ideas!',
});

const PortfolioPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <ProjectsSection />
    </div>
  );
};
export default PortfolioPage;
