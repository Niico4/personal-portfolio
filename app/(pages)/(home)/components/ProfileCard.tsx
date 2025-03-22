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
      className="grid place-items-center card-bg gap-6 p-4 md:grid-cols-[30%_1fr]"
      radius="sm"
      isBlurred
    >
      <CardHeader className="flex-col-center gap-3 p-0">
        <figure className="w-44 xl1440:w-44 lg:w-40 profile-gradient rounded-full overflow-hidden shadow-[inset_0_0_10px_rgba(255,255,255,0.2),_0_0_15px_rgba(255,255,255,0.3)]">
          <Image
            alt="Avatar"
            className="w-auto h-auto object-cover backdrop-blur-sm p-1 bg-black/15 rounded-full border-2 border-white/20"
            src="/avatar.webp"
            height={208}
            width={208}
            priority
          />
        </figure>

        <ul className="flex flex-col justify-center items-start gap-[2px]">
          {PROFILE_DETAILS.map(({ label, icon }, index) => (
            <ProfileInfoItem key={index} label={label} icon={icon} />
          ))}
        </ul>
      </CardHeader>
      <CardBody className="gap-5 p-0">
        <div className="flex flex-col gap-2">
          <h1
            className={`${grandstander.className} text-title text-5xl text-center font-medium md:text-start`}
          >
            ¡Hola!, soy <span className="text-animate">Nicolas</span>
          </h1>

          <p className="text-base text-default font-light text-pretty tracking-wide">
            Diseño y desarrollo experiencias web fluidas, atractivas y
            funcionales. Disfruto combinando creatividad y tecnología para que
            cada proyecto tenga su propia esencia y conecte con quien lo visite.
          </p>
        </div>

        <ButtonActions />
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
