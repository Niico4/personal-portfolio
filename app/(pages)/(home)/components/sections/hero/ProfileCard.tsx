import { Button, Card, CardBody, Tooltip } from '@nextui-org/react';
import React from 'react';
import Image from 'next/image';
import { IconFileText } from '@tabler/icons-react';
import Link from 'next/link';

import { DESCRIPTION, INFO_ITEMS } from '../../../constants/hero.data';

import InfoItem from './InfoItem';

const ProfileCard = () => {
  return (
    <Card className="card-bg" radius="lg" isBlurred>
      <CardBody className="flex-col md:grid grid-cols-[30%_1fr] items-center gap-10">
        <article>
          <figure className="w-48 aspect-square mx-auto mb-5 profile-gradient rounded-full overflow-hidden">
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

          <ul className="flex flex-col gap-1 items-center">
            {INFO_ITEMS.map(({ label, icon }, index) => (
              <InfoItem key={index} icon={icon} label={label} />
            ))}
          </ul>
        </article>

        <div className="text-IColorPrimary">
          <div>
            <h1 className="text-IColorSecondary text-3xl md:text-4xl font-semibold">
              ¡Hola!, soy <span className="text-animate">Nicolas</span>
            </h1>

            <p className="lg:text-lg tracking-wide my-4">{DESCRIPTION}</p>
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
                startContent={<IconFileText stroke={1.5} />}
                color="primary"
                radius="sm"
                variant="flat"
                className="text-primary text-base"
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
