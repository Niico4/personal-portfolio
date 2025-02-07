import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import {
  IconFileText,
  IconMapPin,
  IconSchool,
  IconUserFilled,
} from '@tabler/icons-react';

import { grandstander } from '@/layout';

const ProfileCard = () => {
  return (
    <Card
      className="md:flex-row items-center justify-center card-bg p-6 md:gap-10"
      fullWidth
    >
      <CardHeader className="flex-col-center md:w-1/4">
        <div className="w-48 mx-auto mb-5 profile-gradient rounded-full overflow-hidden">
          <Image
            src="https://ik.imagekit.io/0isq9u6sl/profile.webp?updatedAt=1731466256645"
            alt="Avatar de Nicolas"
            width={0}
            height={0}
            sizes="100%"
            className="size-full object-cover"
            loading="lazy"
          />
        </div>

        <ul className="flex flex-col gap-2">
          <li className="flex items-center text-sm md:text-base font-medium text-paragraph gap-2">
            <IconSchool color="#7cc1fd" />
            Desarrollador Frontend
          </li>
          <li className="flex items-center text-sm md:text-base font-medium text-paragraph gap-2">
            <IconMapPin color="#7cc1fd" />
            Bogotá, Colombia
          </li>
        </ul>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1
              className={`${grandstander.className} text-title text-3xl font-semibold md:text-6xl`}
            >
              ¡Hola!, soy <span className="text-animate">Nicolas</span>
            </h1>

            <p className="lg:text-xl text-paragraph font-light">
              Me encanta crear sitios web que no solo se vean increíbles, sino
              que también se sientan fluidos y fáciles de usar. Disfruto
              combinando creatividad y tecnología para que cada proyecto tenga
              su propia esencia y conecte con quien lo visita.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Tooltip
              content="Ver mi Currículum Profesional"
              placement="bottom"
              radius="sm"
              color="secondary"
              showArrow
            >
              <Button
                as={Link}
                href="https://drive.google.com/file/d/1q9klaXbJcQRWaY1JntJmqvvvuYI--5ln/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                radius="sm"
                startContent={<IconFileText />}
                className="text-primary-800 font-medium tracking-wide md:text-medium"
              >
                Currículum
              </Button>
            </Tooltip>

            <Tooltip
              content="Conóceme un poco más"
              placement="bottom"
              radius="sm"
              color="secondary"
              showArrow
            >
              <Button
                as={Link}
                href="/about-me"
                color="primary"
                radius="sm"
                variant="flat"
                startContent={<IconUserFilled />}
                className="text-primary-200 font-medium tracking-wide md:text-medium"
              >
                Más sobre mi
              </Button>
            </Tooltip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
