import React from 'react';
import { Metadata } from 'next';

import ProjectsSection from './components/sections/ProjectsSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Portafolio | Nicolas Garzón',
    description:
      'Bienvenido a la sección donde podrás explorar los proyectos que he creado. Aquí he recopilado trabajos que muestran mi habilidad en el desarrollo frontend, abarcando diferentes tecnologías y enfoques. Cada proyecto refleja mi compromiso con la calidad, la innovación y la experiencia del usuario. ¡Echa un vistazo a mi trabajo y descubre cómo puedo ayudar a materializar tus ideas!',
    openGraph: {
      title: 'Portafolio | Nicolas Garzón',
      description:
        'Bienvenido a la sección donde podrás explorar los proyectos que he creado. Aquí he recopilado trabajos que muestran mi habilidad en el desarrollo frontend, abarcando diferentes tecnologías y enfoques. Cada proyecto refleja mi compromiso con la calidad, la innovación y la experiencia del usuario. ¡Echa un vistazo a mi trabajo y descubre cómo puedo ayudar a materializar tus ideas!',
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
      title: 'Portafolio | Nicolás Garzón',
      description:
        'Bienvenido a la sección donde podrás explorar los proyectos que he creado. Aquí he recopilado trabajos que muestran mi habilidad en el desarrollo frontend, abarcando diferentes tecnologías y enfoques. Cada proyecto refleja mi compromiso con la calidad, la innovación y la experiencia del usuario. ¡Echa un vistazo a mi trabajo y descubre cómo puedo ayudar a materializar tus ideas!',
      card: 'summary_large_image',
      images: [
        'https://ik.imagekit.io/0isq9u6sl/portfolio.webp?updatedAt=1731277630302',
      ],
    },
    robots: 'index, follow',
  };
}

const PortfolioPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <ProjectsSection />
    </div>
  );
};
export default PortfolioPage;
