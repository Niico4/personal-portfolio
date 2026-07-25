import Link from 'next/link';
import { IconArrowUpRight, IconNotes } from '@tabler/icons-react';

import type { WikiNotebook } from '../lib/wiki.types';
import { formatWikiDate } from '../lib/wiki-format';

import { WikiImage } from './wiki-image';

export const NotebookCard = ({
  notebook,
  priority = false,
}: {
  notebook: WikiNotebook;
  priority?: boolean;
}) => {
  const updatedAt = formatWikiDate(notebook.updatedAt);

  return (
    <Link
      href={`/wiki/${notebook.slug}`}
      className="group grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-[1.5rem] border border-ink-800 bg-main outline-none transition duration-300 hover:-translate-y-0.5 hover:border-ink-600 hover:bg-ink-900/10 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-main motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="relative mx-3 mt-3 aspect-[16/9] overflow-hidden rounded-[1.1rem] bg-ink-900">
        {notebook.cover ? (
          <WikiImage
            src={notebook.cover.url}
            alt=""
            sizes="(min-width: 1536px) 22rem, (min-width: 768px) 30rem, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div
            aria-hidden="true"
            className="grid size-full place-items-center bg-ink-900/60"
          >
            <IconNotes className="size-10 text-ink-700" stroke={1.2} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 items-end justify-between gap-4 p-4 sm:p-5">
        <div className="flex min-h-36 min-w-0 flex-1 flex-col">
          <h2 className="text-balance text-xl font-bold leading-tight tracking-[-0.025em] text-ink-50 transition-colors group-hover:text-brand-200 group-focus-visible:text-brand-200 sm:text-2xl">
            {notebook.title}
          </h2>

          {notebook.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-200">
              {notebook.description}
            </p>
          )}

          <p className="mt-auto pt-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-300">
            {notebook.noteCount !== null &&
              (notebook.noteCount === 1
                ? '1 nota'
                : `${notebook.noteCount} notas`)}
            {notebook.noteCount !== null && updatedAt ? ' · ' : ''}
            {updatedAt ? `Actualizado ${updatedAt}` : ''}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-ink-600 bg-ink-900/30 text-ink-100 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-main group-focus-visible:border-brand-400 group-focus-visible:bg-brand-400 group-focus-visible:text-main motion-reduce:transform-none"
        >
          <IconArrowUpRight size={17} stroke={1.8} />
        </span>
      </div>
    </Link>
  );
};
