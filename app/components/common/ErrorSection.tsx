'use client';

import React from 'react';
import Image from 'next/image';
import { Grandstander } from 'next/font/google';
import { Button } from '@heroui/button';
import { IconArrowNarrowRight, IconReload } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const ErrorSection = ({
  error,
  reload,
}: {
  error: string;
  reload?: boolean;
}) => {
  const router = useRouter();
  return (
    <section className="grid gap-6 md:grid-cols-2 md:gap-0 items-center justify-center w-11/12 mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 md:items-start">
        <p
          className={`${grandstander.className} text-3xl md:text-5xl max-md:text-center font-bold text-faint z-10`}
        >
          {error}
        </p>
        <Button
          color="secondary"
          variant="flat"
          className="text-secondary-300"
          onPress={reload ? () => router.refresh() : () => router.push('/')}
          endContent={
            reload ? (
              <IconReload stroke={1} />
            ) : (
              <IconArrowNarrowRight stroke={1} />
            )
          }
        >
          {reload ? 'Recargar Página' : 'Volver al Inicio'}
        </Button>
      </div>

      <figure
        className="w-4/5 mx-auto z-10"
        style={{
          filter: 'drop-shadow(2px 2px 15px rgba(191, 223, 254, 0.6))',
        }}
      >
        <Image
          src="/astronaut.webp"
          alt="Astronauta"
          width={500}
          height={300}
          className="w-full h-auto aspect-square object-cover"
          priority
        />
      </figure>
    </section>
  );
};

export default ErrorSection;
