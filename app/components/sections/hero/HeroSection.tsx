'use client';

import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import CountUp from 'react-countup';

import {
  EXPERIENCE_DETAILS,
  SOCIALS_LINKS,
} from '@/(pages)/(home)/constants/hero.data';

import ProfileCard from './ProfileCard';
import ButtonSocial from './ButtonSocial';
import CardDetail from './CardDetail';

const HeroSection = () => {
  const renderDatesDetails = () =>
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
    ));

  const renderSocialLinks = () =>
    SOCIALS_LINKS.map(({ icon, label, href }, index) => (
      <ButtonSocial key={index} icon={icon} label={label} href={href} />
    ));
  return (
    <section className="flex flex-col gap-y-6 w-[90%] mx-auto">
      <ProfileCard />

      <article className="flex gap-6 w-full justify-center">
        {renderDatesDetails()}

        <Card className="bg-slate-900/80  border-1 border-slate-800 flex-1">
          <CardBody className="text-IColorPrimary text-xl gap-3 items-center justify-center">
            <span className="text-primary text-2xl font-semibold">
              Redes Sociales
            </span>
            <div>{renderSocialLinks()}</div>
          </CardBody>
        </Card>
      </article>
    </section>
  );
};

export default HeroSection;
