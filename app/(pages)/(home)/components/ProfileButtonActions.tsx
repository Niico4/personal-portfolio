import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/button';
import { IconFileTextFilled, IconUserFilled } from '@tabler/icons-react';

const ButtonActions = () => {
  return (
    <div className="flex justify-center sm:justify-start items-center gap-4">
      <Button
        aria-label="Currículum"
        as={Link}
        color="primary"
        href="https://drive.google.com/file/d/1q9klaXbJcQRWaY1JntJmqvvvuYI--5ln/view?usp=drive_link"
        radius="sm"
        rel="noopener noreferrer"
        startContent={<IconFileTextFilled size={20} />}
        size="sm"
        target="_blank"
        variant="solid"
      >
        Currículum
      </Button>

      <Button
        aria-label="Sobre mi"
        as={Link}
        className="text-primary-300"
        color="primary"
        href="/about-me"
        radius="sm"
        startContent={<IconUserFilled size={20} />}
        size="sm"
        variant="flat"
      >
        Sobre mi
      </Button>
    </div>
  );
};

export default ButtonActions;
