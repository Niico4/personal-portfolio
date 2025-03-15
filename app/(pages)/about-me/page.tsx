import React from 'react';
import { Metadata } from 'next';
import { Card, CardBody } from '@heroui/card';

import { aboutMeMetadata } from '@/config/metadata/about-me';
import SubTitle from '@/components/common/SubTitle';

import EducationCard from './components/EducationCard';
import ExperienceCard from './components/ExperienceCard';
import { EDUCATION_LIST } from './data/user-info';
import HeroSection from './sections/HeroSection';
import TechnologiesList from './components/TechnoligiesList';

export async function generateMetadata(): Promise<Metadata> {
  return aboutMeMetadata;
}

const AboutMePage = () => {
  return (
    <div className="flex flex-col gap-14 mx-auto">
      <SubTitle title="Un Poco Sobre Mí" className="text-center" />

      <HeroSection />

      <section className="grid md:grid-cols-[1fr_40%] max-md:gap-14 gap-4 place-content-center">
        <Card className="card-bg p-1 md:p-4" radius="sm" isBlurred>
          <CardBody>
            <p className="text-soft">
              Me encanta crear cosas para la web. Más que solo verse bien,
              quiero que cada proyecto se sienta natural, fácil de usar y con su
              propia esencia. Disfruto cada paso, desde la idea hasta los
              últimos retoques, siempre buscando que quien lo use tenga la mejor
              experiencia. Me gusta aprender, experimentar y llevar todo un poco
              más allá, porque creo que{' '}
              <span className="text-custom-primary">
                la web está para conectar, inspirar y sorprender
              </span>
              .
            </p>
          </CardBody>
        </Card>

        <article className="flex flex-col gap-4 justify-center max-md:-order-1">
          {EDUCATION_LIST.map(
            ({ title, date, institution, certificationUrl }, index) => (
              <EducationCard
                key={index}
                title={title}
                date={date}
                institution={institution}
                certificationUrl={certificationUrl}
              />
            )
          )}
        </article>
      </section>

      <ExperienceCard />

      <section className="w-full overflow-hidden p-4">
        <TechnologiesList />
      </section>
    </div>
  );
};
export default AboutMePage;
