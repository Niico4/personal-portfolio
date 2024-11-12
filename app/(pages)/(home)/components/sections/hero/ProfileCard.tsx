import { Button, Card, CardBody, Tooltip } from '@nextui-org/react';
import React from 'react';
import Image from 'next/image';
import {
  IconSchool,
  IconMapPin,
  IconCircleCheck,
  IconFileText,
} from '@tabler/icons-react';
import Link from 'next/link';

import { DESCRIPTION } from '../../../constants/hero.data';

import InfoItem from './InfoItem';

const ProfileCard = () => {
  return (
    <Card
      className="bg-slate-900/80 border-1 border-slate-800"
      radius="lg"
      isBlurred
    >
      <CardBody className="md:flex-row items-center gap-10">
        <div className="md:w-[30%]">
          <figure className="w-48 aspect-square mx-auto mb-5 gradient-profile rounded-full overflow-hidden">
            <Image
              src="https://ik.imagekit.io/0isq9u6sl/profile?updatedAt=1731378169208"
              alt="Imagen de Perfil"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
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
            <h1 className="text-IColorSecondary text-3xl md:text-4xl font-semibold">
              ¡Hola!, soy <span className="text-animate">Nicolas</span>
            </h1>

            <p className="lg:text-lg tracking-wider my-4">{DESCRIPTION}</p>
          </div>
          <Link
            href="https://drive.google.com/file/d/1q9klaXbJcQRWaY1JntJmqvvvuYI--5ln/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tooltip
              content="Ver o descargar mi CV profesional"
              placement="bottom"
              showArrow
            >
              <Button
                startContent={<IconFileText />}
                color="primary"
                radius="sm"
                variant="shadow"
                className="text-gray-900 font-semibold text-base"
              >
                Currículum
              </Button>
            </Tooltip>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
