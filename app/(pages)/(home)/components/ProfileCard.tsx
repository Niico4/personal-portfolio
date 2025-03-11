import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grandstander } from 'next/font/google';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import {
  IconDeviceLaptop,
  IconFileText,
  IconMapPinFilled,
  IconUserFilled,
} from '@tabler/icons-react';
import { useMediaQuery } from '@uidotdev/usehooks';

const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const ProfileCard = () => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 370px)');

  return (
    <Card
      className="grid items-center justify-center card-bg p-1 md:px-4 md:py-2 md:grid-cols-[30%_1fr]"
      fullWidth
      isBlurred
    >
      <CardHeader className="flex-col-center">
        <div className="aspect-square max-w-52 mx-auto mb-5 profile-gradient rounded-full overflow-hidden">
          <Image
            src="/avatar.webp"
            alt="Avatar"
            width={200}
            height={200}
            className="size-full aspect-square object-cover"
            priority
          />
        </div>

        <ul className="flex flex-col gap-2">
          <li className="flex items-center text-sm md:text-base font-medium text-muted gap-2">
            <IconDeviceLaptop color="#7cc1fd" />
            Desarrollador Frontend
          </li>
          <li className="flex items-center text-sm md:text-base font-medium text-muted gap-2">
            <IconMapPinFilled color="#7cc1fd" />
            Bogotá, Colombia
          </li>
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

        <div className="flex items-center gap-4">
          <Tooltip
            content="Ver mi Currículum Profesional"
            placement="bottom"
            radius="sm"
            color="primary"
            showArrow
          >
            <Button
              as={Link}
              href="https://drive.google.com/file/d/1q9klaXbJcQRWaY1JntJmqvvvuYI--5ln/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              variant="faded"
              radius="sm"
              aria-label="Currículum"
              size={isSmallDevice ? 'sm' : 'md'}
              startContent={<IconFileText stroke={1.5} size={20} />}
            >
              Currículum
            </Button>
          </Tooltip>

          <Tooltip
            content="Conóceme un poco más"
            placement="bottom"
            radius="sm"
            color="primary"
            showArrow
          >
            <Button
              as={Link}
              href="/about-me"
              color="primary"
              radius="sm"
              variant="flat"
              aria-label="Sobre mi"
              size={isSmallDevice ? 'sm' : 'md'}
              startContent={<IconUserFilled size={20} />}
              className="text-primary-200"
            >
              Sobre mi
            </Button>
          </Tooltip>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
