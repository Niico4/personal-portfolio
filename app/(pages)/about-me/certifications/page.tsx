import React from 'react';
import { Grandstander } from 'next/font/google';

import GoBackLink from '@/components/common/GoBackLink';
import Heading from '@/components/common/Heading';
import LoaderGhost from '@/components/common/LoaderGhost';

const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const CertificationPage = () => {
  return (
    <section className="flex flex-col gap-8 md:gap-8">
      <div className="flex flex-col items-start">
        <GoBackLink href="/about-me" />
      </div>
      <article className="flex-col-center lg:mx-auto lg:w-[90%] gap-4">
        <Heading title="Mis Certificados" type="h1" />

        <p className="text-base md:text-lg text-center text-soft">
          Un vistazo a los certificados que he obtenido en este viaje como
          desarrollador. Cada uno representa un paso, un reto superado y muchas
          horas de aprendizaje.
        </p>
      </article>

      <article className="flex-col-center gap-6">
        <LoaderGhost />
        <h4
          className={`${grandstander.className} text-2xl text-center text-subtitle`}
        >
          Sección en desarrollo...
        </h4>
      </article>
    </section>
  );
};

export default CertificationPage;
