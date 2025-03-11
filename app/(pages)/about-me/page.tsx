import React from 'react';
import { Metadata } from 'next';

import { aboutMeMetadata } from '@/config/metadata/about-me';
import SubTitle from '@/components/common/SubTitle';

import AboutMeCard from './components/AboutMeCard';
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
        <AboutMeCard />

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
