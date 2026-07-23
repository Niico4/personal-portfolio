import { Button } from '@heroui/button';
import { IconArrowUpRight } from '@tabler/icons-react';

import { Heading } from '@/components/common/heading';
import { BadgeShine } from '@/components/common/badge-shine';

const HeroSection = ({ email }: { email: string }) => {
  return (
    <header className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <BadgeShine
          label="Servicios de desarrollo web"
          className="text-brand-100 uppercase tracking-widest w-max"
        />

        <Heading>
          Desarrollo{' '}
          <span className="text-brand-100 underline decoration-2 decoration-wavy underline-offset-4">
            aplicaciones web a medida
          </span>{' '}
          para negocios y productos digitales
        </Heading>
      </div>

      <p className="leading-8 sm:text-lg [&>b]:font-bold">
        Desarrollo <b>aplicaciones web</b>, <b>sistemas de gestión</b> y{' '}
        <b>productos digitales</b> adaptados a las necesidades de cada negocio.
        Trabajo desde la definición del alcance hasta la interfaz, la lógica,
        los datos y el despliegue, creando soluciones funcionales que puedan
        probarse y continuar evolucionando. También puedo desarrollar{' '}
        <b>sitios web profesionales</b> y <b>páginas informativas</b> cuando el
        proyecto necesita una presencia digital clara, rápida y fácil de
        mantener.
      </p>

      <Button
        as="a"
        radius="full"
        href={`mailto:${email}`}
        variant="flat"
        className="border border-ink-700 mb-7 md:w-max"
        endContent={
          <IconArrowUpRight aria-hidden="true" size={18} stroke={1.8} />
        }
      >
        Hablemos de tu proyecto
      </Button>
    </header>
  );
};

export default HeroSection;
