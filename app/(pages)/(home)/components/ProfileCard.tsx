import React from 'react';
import Image from 'next/image';
import { Grandstander } from 'next/font/google';
import { Card, CardBody, CardHeader } from '@heroui/card';

import { PROFILE_DETAILS } from '../data/profile';

import ProfileInfoItem from './ProfileInfoItem';
import ButtonActions from './ProfileButtonActions';

const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const ProfileCard = () => {
  return (
    <Card
      className="grid items-center justify-center card-bg p-1 md:px-4 md:py-2 md:grid-cols-[30%_1fr]"
      fullWidth
      isBlurred
    >
      <CardHeader className="flex-col-center">
        <figure className="aspect-square max-w-52 mx-auto mb-5 profile-gradient rounded-full overflow-hidden">
          <Image
            src="/avatar.webp"
            alt="Avatar"
            width={200}
            height={200}
            className="w-full h-full object-cover hover:scale-105 transition-all"
            priority
          />
        </figure>

        <ul className="flex flex-col gap-2">
          {PROFILE_DETAILS.map(({ label, icon }, index) => (
            <ProfileInfoItem key={index} label={label} icon={icon} />
          ))}
        </ul>
      </CardHeader>
      <CardBody className="gap-4 md:gap-6">
        <div className="flex flex-col gap-3">
          <h1
            className={`${grandstander.className} text-title text-5xl text-center font-semibold md:text-start md:text-6xl`}
          >
            ¡Hola!, soy <span className="text-animate">Nicolas</span>
          </h1>

          <p className="text-base lg:text-xl text-default font-light">
            Diseño y desarrollo experiencias web fluidas, atractivas y
            funcionales. Disfruto combinando creatividad y tecnología para que
            cada proyecto tenga su propia esencia y conecte con quien lo visite.
          </p>
        </div>

        <div className="flex max-sm:justify-center items-center gap-4">
          <ButtonActions />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
