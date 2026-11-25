import { IconArrowLeft, IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { LoaderGhost } from './components/common/loader-ghost/loader-ghost';

const NotFoundPage = () => {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center px-5 py-16 sm:px-8">
      <div
        aria-hidden="true"
        className="relative mb-8 flex items-center justify-center"
      >
        <span className="font-display text-[clamp(8rem,30vw,16rem)] leading-none font-semibold tracking-tighter text-fg-muted/5 select-none">
          404
        </span>

        <div className="absolute scale-90 sm:scale-110">
          <LoaderGhost />
        </div>
      </div>

      <section className="flex flex-col items-center text-center">
        <Badge
          variant="outline"
          className="rounded-full px-3 font-normal text-fg-muted"
        >
          Error 404
        </Badge>

        <h1 className="mt-4 font-display text-3xl font-medium tracking-tight text-fg-strong sm:text-4xl">
          Esta ruta se perdió.
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted sm:text-base">
          No encontré nada por acá. Parece que hasta las rutas necesitan un poco
          de refactoring.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'group gap-2.5 rounded-full px-4',
            )}
          >
            <IconArrowLeft
              aria-hidden="true"
              stroke={1.5}
              className="size-4 motion-safe:transition-transform motion-safe:group-hover:-translate-x-0.5"
            />
            Volver al inicio
          </Link>

          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'group gap-2.5 rounded-full px-4 font-normal',
            )}
          >
            Ver proyectos
            <IconArrowUpRight
              aria-hidden="true"
              stroke={1.5}
              className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <p lang="en" className="mt-12 text-xs text-fg-muted/70">
          everything looks fine. except{' '}
          <span className="underline decoration-brand decoration-wavy decoration-1 underline-offset-2">
            this route.
          </span>
        </p>
      </section>
    </main>
  );
};

export default NotFoundPage;
