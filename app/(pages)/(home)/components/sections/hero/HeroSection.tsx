'use client';

import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import CountUp from 'react-countup';

import {
  EXPERIENCE_DETAILS,
  SOCIALS_LINKS,
} from '../../../constants/hero.data';

import CardDetail from './CardDetail';
import ButtonSocial from './ButtonSocial';
import ProfileCard from './ProfileCard';

const HeroSection = () => {
  return (
    <section className="flex flex-col gap-6">
      <ProfileCard />

      <article className="flex max-sm:flex-col gap-6">
        {EXPERIENCE_DETAILS.map(({ label, value }, index) => (
          <CardDetail
            key={index}
            title={
              <p>
                +<CountUp end={value} start={0} duration={4} />
              </p>
            }
            description={label}
          />
        ))}

        <Card className="card-bg flex-1">
          <CardBody className="text-IColorPrimary text-xl items-center">
            <span className="text-primary text-2xl font-semibold">
              Redes Sociales
            </span>
            <div>
              {SOCIALS_LINKS.map(({ icon, label, href }, index) => (
                <ButtonSocial
                  key={index}
                  icon={icon}
                  label={label}
                  href={href}
                />
              ))}
            </div>
          </CardBody>
        </Card>
      </article>
    </section>
  );
};

export default HeroSection;
