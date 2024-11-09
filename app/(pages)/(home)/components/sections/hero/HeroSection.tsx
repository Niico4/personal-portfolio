'use client';

import { Card, CardBody } from '@nextui-org/react';
import React, { useMemo } from 'react';
import CountUp from 'react-countup';

import {
  EXPERIENCE_DETAILS,
  SOCIALS_LINKS,
} from '@/(pages)/(home)/constants/hero.data';

import CardDetail from './CardDetail';
import ButtonSocial from './ButtonSocial';
import ProfileCard from './ProfileCard';

const HeroSection = () => {
  const renderedDatesDetails = useMemo(
    () =>
      EXPERIENCE_DETAILS.map(({ label, value }, index) => (
        <CardDetail
          key={index}
          title={
            <p>
              +<CountUp end={value} start={0} duration={4} />
            </p>
          }
          description={label}
        />
      )),
    []
  );

  const renderedSocialLinks = useMemo(
    () =>
      SOCIALS_LINKS.map(({ icon, label, href }, index) => (
        <ButtonSocial key={index} icon={icon} label={label} href={href} />
      )),
    []
  );
  return (
    <section className="flex flex-col gap-y-6 w-[90%] mx-auto">
      <ProfileCard />

      <article className="flex flex-col md:flex-row gap-6 w-full justify-center">
        {renderedDatesDetails}

        <Card className="bg-slate-900/80 border-1 border-slate-800 flex-1">
          <CardBody className="text-IColorPrimary text-xl gap-3 items-center justify-center">
            <span className="text-primary text-2xl font-semibold">
              Redes Sociales
            </span>
            <div>{renderedSocialLinks}</div>
          </CardBody>
        </Card>
      </article>
    </section>
  );
};

export default HeroSection;
