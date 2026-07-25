'use client';

import { Button } from '@heroui/button';
import { IconRefresh } from '@tabler/icons-react';

export default function WikiError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-xl rounded-[1.5rem] border border-ink-800 bg-ink-900/20 p-7 text-center sm:p-10">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-300">
        Wiki no disponible
      </p>
      <h1 className="mt-3 text-2xl font-bold text-ink-50">
        No pudimos cargar las notas
      </h1>
      <p className="mt-3 text-sm leading-6 text-ink-300">
        La conexión editorial puede estar temporalmente ocupada. El resto del
        portfolio sigue disponible.
      </p>
      <Button
        type="button"
        onPress={reset}
        className="mt-6"
        color="primary"
        startContent={<IconRefresh aria-hidden="true" size={17} />}
      >
        Intentar de nuevo
      </Button>
    </main>
  );
}
