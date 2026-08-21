import { IconHome, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';

import { Heading } from './components/atoms/common/heading';
import { LoaderGhost } from './components/atoms/loader-ghost/loader-ghost';

const NotFoundPage = () => {
  return (
    <main className="relative flex min-h-dvh items-center overflow-hidden">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <span className="mb-5 border border-white/10 bg-white/[0.04] px-3 text-zinc-400 rounded-full py-1 flex gap-2 items-center">
            <IconSparkles aria-hidden="true" size={14} stroke={1.5} />
            Error 404
          </span>

          <Heading>Esta ruta se perdió.</Heading>

          <p className="mt-4 max-w-lg text-base leading-7 text-zinc-400 sm:text-lg">
            No encontré nada por acá. Puedes volver al inicio o seguir
            explorando mis proyectos.
          </p>

          <Link
            href="/"
            className="flex items-center gap-2 bg-brand-400 text-brand-950 font-medium px-4 py-3 rounded-full mt-8"
          >
            Volver al inicio
            <IconHome size={20} stroke={1.5} />
          </Link>
        </div>

        <div
          aria-hidden="true"
          className="order-1 flex min-h-[280px] items-center justify-center lg:order-2 lg:min-h-[420px]"
        >
          <div className="relative flex items-center justify-center">
            <span
              className="
                select-none
                text-[clamp(9rem,30vw,18rem)]
                font-semibold
                leading-none
                tracking-[-0.08em]
                text-white/[0.025]
              "
            >
              404
            </span>

            <div className="absolute scale-90 sm:scale-110 lg:scale-125">
              <LoaderGhost />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
