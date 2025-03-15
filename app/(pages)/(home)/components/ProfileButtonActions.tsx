import React from 'react';
import Link from 'next/link';
import { Tooltip } from '@heroui/tooltip';
import { Button } from '@heroui/button';
import { useIsClient, useMediaQuery } from 'usehooks-ts';
import { IconFileText, IconUserFilled } from '@tabler/icons-react';

const ButtonActions = () => {
  const isClient = useIsClient();
  const isSmallDevice = useMediaQuery('(max-width : 370px)', {
    initializeWithValue: isClient,
  });

  const buttonSize = isSmallDevice ? 'sm' : 'md';
  const iconSize = isSmallDevice ? 20 : 24;

  return (
    <>
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
          size={buttonSize}
          startContent={<IconFileText stroke={1.5} size={iconSize} />}
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
          size={buttonSize}
          startContent={<IconUserFilled size={iconSize} />}
          className="text-primary-200"
        >
          Sobre mi
        </Button>
      </Tooltip>
    </>
  );
};

export default ButtonActions;
