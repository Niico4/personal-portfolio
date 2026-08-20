'use client';

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Button } from '@heroui/button';
import { IconArrowRight, IconSearch, IconX } from '@tabler/icons-react';

import { WIKI_NOTE_LEVELS, type WikiNoteLevel } from '../lib/wiki-contract';

import { WIKI_LEVEL_STYLES, WikiLevelChip } from './wiki-level-chip';

type NotePreview = {
  href: `/wiki/${string}/${string}`;
  title: string;
  level: WikiNoteLevel | null;
  topics: string[];
  updatedAt: string | null;
};

const ALL_FILTER = 'Todas';
const LEVEL_FILTERS = [ALL_FILTER, ...WIKI_NOTE_LEVELS] as const;
type LevelFilter = (typeof LEVEL_FILTERS)[number];

export const NoteExplorer = ({ notes }: { notes: NotePreview[] }) => {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<LevelFilter>(ALL_FILTER);
  const searchInput = useRef<HTMLInputElement>(null);
  const searchId = useId();

  const normalizedQuery = query.trim().toLocaleLowerCase('es');
  const visibleNotes = notes.filter((note) => {
    const matchesLevel = level === ALL_FILTER || note.level === level;
    const matchesQuery =
      !normalizedQuery ||
      [note.title, ...note.topics]
        .join(' ')
        .toLocaleLowerCase('es')
        .includes(normalizedQuery);

    return matchesLevel && matchesQuery;
  });

  const resetExplorer = () => {
    setQuery('');
    setLevel(ALL_FILTER);
    searchInput.current?.focus();
  };

  return (
    <div>
      <div className="border-y border-zinc-800 py-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="relative block min-w-0 flex-1">
            <label htmlFor={searchId} className="sr-only">
              Buscar notas
            </label>
            <IconSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-[1.125rem] -translate-y-1/2 text-zinc-300"
            />
            <input
              ref={searchInput}
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape' && query) {
                  event.preventDefault();
                  setQuery('');
                }
              }}
              placeholder="Buscar por título o tema"
              className="h-11 w-full rounded-xl border border-zinc-700/80 bg-zinc-900/35 pl-10 pr-11 text-sm text-zinc-50 outline-none transition-colors placeholder:text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900/55 focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-400/30 motion-reduce:transition-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <Button
                isIconOnly
                disableRipple
                size="sm"
                radius="md"
                variant="light"
                onPress={() => {
                  setQuery('');
                  searchInput.current?.focus();
                }}
                aria-label="Limpiar búsqueda"
                className="absolute right-0.5 top-1/2 h-10 min-h-10 w-10 min-w-10 -translate-y-1/2 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 focus-visible:ring-2 focus-visible:ring-brand-400 motion-reduce:transition-none"
              >
                <IconX aria-hidden="true" size={16} />
              </Button>
            )}
          </div>

          <div
            aria-label="Filtrar notas por nivel"
            className="flex flex-wrap gap-2"
          >
            {LEVEL_FILTERS.map((candidate) => {
              const isActive = candidate === level;
              const levelStyle =
                candidate === ALL_FILTER
                  ? {
                      selectedControl:
                        'border-brand-400/50 bg-brand-500/10 text-brand-100',
                      indicator: 'bg-brand-300',
                    }
                  : WIKI_LEVEL_STYLES[candidate];

              return (
                <Button
                  key={candidate}
                  type="button"
                  disableRipple
                  size="sm"
                  radius="full"
                  variant="bordered"
                  aria-pressed={isActive}
                  onPress={() => setLevel(candidate)}
                  className={[
                    'h-11 min-h-11 min-w-0 gap-2 border px-3.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-main motion-reduce:transition-none',
                    isActive
                      ? levelStyle.selectedControl
                      : 'border-zinc-700/80 bg-zinc-900/15 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900/55 hover:text-zinc-50',
                  ].join(' ')}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'size-1.5 rounded-full',
                      isActive
                        ? levelStyle.indicator
                        : 'border border-zinc-500 bg-transparent',
                    ].join(' ')}
                  />
                  {candidate}
                </Button>
              );
            })}
          </div>
        </div>

        <p aria-live="polite" className="mt-3 text-right text-xs text-zinc-300">
          {visibleNotes.length === 1
            ? '1 resultado'
            : `${visibleNotes.length} resultados`}
        </p>
      </div>

      {visibleNotes.length > 0 ? (
        <ol className="divide-y divide-zinc-800 border-b border-zinc-800">
          {visibleNotes.map((note) => (
            <li key={note.href}>
              <Link
                href={note.href as Route}
                className="group flex min-h-24 items-center justify-between gap-4 px-3 py-5 outline-none transition-colors hover:bg-zinc-900/40 focus-visible:bg-zinc-900/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400 motion-reduce:transition-none sm:gap-6 sm:px-4"
              >
                <div className="min-w-0">
                  <h3 className="text-balance text-lg font-semibold leading-snug text-zinc-50 transition-colors group-hover:text-brand-200 group-focus-visible:text-brand-200 motion-reduce:transition-none sm:text-xl">
                    {note.title}
                  </h3>

                  {note.topics.length > 0 && (
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-300">
                      {note.topics.join(' · ')}
                    </p>
                  )}

                  {(note.level || note.updatedAt) && (
                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                      {note.level && <WikiLevelChip level={note.level} />}
                      {note.updatedAt && (
                        <span className="text-xs text-zinc-300">
                          Actualizada {note.updatedAt}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-zinc-700 bg-main/30 text-zinc-200 transition group-hover:translate-x-0.5 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-main group-focus-visible:border-brand-400 group-focus-visible:bg-brand-400 group-focus-visible:text-main motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <IconArrowRight size={17} stroke={1.7} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-7 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/20 px-5 py-9 text-center">
          <p className="font-medium text-zinc-100">No hay coincidencias</p>
          <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-zinc-300">
            Prueba otra búsqueda o selecciona un nivel diferente.
          </p>
          <Button
            type="button"
            disableRipple
            radius="full"
            variant="bordered"
            onPress={resetExplorer}
            className="mt-5 min-h-11 border-zinc-600 px-4 text-sm font-medium text-zinc-100 hover:border-brand-400 hover:text-brand-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-main motion-reduce:transition-none"
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};
