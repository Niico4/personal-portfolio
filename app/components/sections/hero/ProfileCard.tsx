import { Button, Card, CardBody } from '@nextui-org/react';
import React from 'react';
import Image from 'next/image';
import {
  IconSchool,
  IconMapPin,
  IconCircleCheck,
  IconFileText,
} from '@tabler/icons-react';

import imgProfile from '@/../public/test.webp';
import { DESCRIPTION } from '@/(pages)/(home)/constants/hero.data';

import InfoItem from './InfoItem';

const ProfileCard = () => {
  return (
    <Card
      className="bg-slate-900/80 border-1 border-slate-800"
      radius="lg"
      isBlurred
    >
      <CardBody className="flex-row items-center gap-10">
        <div className="w-[30%]">
          <Image
            src={imgProfile}
            alt="Imagen de Perfil"
            className="w-48 aspect-square object-cover rounded-full mx-auto mb-5"
          />
          <ul className="w-full flex flex-col items-start gap-2">
            <InfoItem icon={IconSchool} label="Desarrollador Frontend" />
            <InfoItem icon={IconMapPin} label="Bogotá, Colombia" />
            <InfoItem
              icon={IconCircleCheck}
              label="Freelancer"
              className="mx-auto mt-2"
            />
          </ul>
        </div>

        <div className="text-IColorPrimary">
          <div>
            <h1 className="text-IColorSecondary text-4xl font-semibold">
              ¡Hola!, soy <span className="text-animate">Nicolas</span>
            </h1>

            <p className="text-lg tracking-wider my-4">{DESCRIPTION}</p>
          </div>
          <Button
            startContent={<IconFileText />}
            color="primary"
            variant="shadow"
            className="text-gray-900 font-semibold text-base"
          >
            Curriculum
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
