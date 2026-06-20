'use client';

import Link from 'next/link';
import { Button } from '@heroui/button';
import { IconCode, IconHome } from '@tabler/icons-react';

export const NotFoundActions = () => {
  return (
    <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <Button
        as={Link}
        href="/"
        color="primary"
        radius="full"
        size="lg"
        startContent={<IconHome size={20} />}
      >
        Volver al inicio
      </Button>

      <Button
        as={Link}
        href="/portfolio"
        radius="full"
        size="lg"
        startContent={<IconCode size={20} />}
        variant="bordered"
      >
        Ver proyectos
      </Button>
    </div>
  );
};
