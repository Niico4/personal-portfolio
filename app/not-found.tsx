import { Chip } from '@heroui/chip';
import { IconSparkles } from '@tabler/icons-react';

import { LoaderGhost } from './components/common/loader-ghost/loader-ghost';
import { Heading } from './components/common/heading';
import { NotFoundActions } from './components/not-found-actions';

const NotFoundPage = () => {
  return (
    <section className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col items-center justify-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:gap-16">
      <div className="flex justify-center lg:justify-start">
        <div className="relative flex aspect-square w-full max-w-[300px] items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-md sm:size-[360px] sm:max-w-none lg:size-[400px]">
          <div
            aria-hidden="true"
            className="absolute inset-5 rounded-[1.5rem] border border-cyan-300/10 bg-cyan-300/[0.025]"
          />

          <div
            aria-hidden="true"
            className="absolute -left-8 top-12 size-28 rounded-full bg-cyan-400/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-8 right-10 size-32 rounded-full bg-purple-400/10 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-6">
            <div className="scale-90 sm:scale-100 lg:scale-110">
              <LoaderGhost />
            </div>

            <div className="flex w-max items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/60 backdrop-blur-md">
              <span className="size-2 rounded-full bg-cyan-300" />
              Buscando ruta...
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 text-center lg:mx-0 lg:items-start lg:text-left">
        <Chip
          className="border border-cyan-400/20 bg-cyan-400/10 px-2 text-cyan-100"
          radius="full"
          startContent={<IconSparkles size={16} />}
          variant="flat"
        >
          Error 404
        </Chip>

        <Heading>Esta ruta se volvió fantasma.</Heading>

        <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg">
          La página que intentas abrir no existe, fue movida o todavía no está
          publicada. Puedes volver al inicio o explorar mis proyectos.
        </p>

        <NotFoundActions />
      </div>
    </section>
  );
};

export default NotFoundPage;
