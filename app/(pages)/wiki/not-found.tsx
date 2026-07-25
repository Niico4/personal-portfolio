import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';

export default function WikiNotFound() {
  return (
    <main className="mx-auto max-w-xl py-12 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-300">
        404 · Wiki
      </p>
      <h1 className="mt-4 text-3xl font-bold text-ink-50">
        Esta nota no está disponible
      </h1>
      <p className="mt-4 leading-7 text-ink-300">
        Puede que todavía sea un borrador, esté archivada o ya no pertenezca a
        este notebook.
      </p>
      <Link
        href="/wiki"
        className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-700 px-5 text-sm text-ink-100 transition-colors hover:border-brand-400 hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      >
        <IconArrowLeft aria-hidden="true" size={17} />
        Volver a la Wiki
      </Link>
    </main>
  );
}
