'use client';

import { useEffect, useId, useState } from 'react';
import { Button } from '@heroui/button';
import { IconChevronDown, IconList } from '@tabler/icons-react';

import type { WikiHeading } from '../lib/wiki.types';

const TocLinks = ({
  headings,
  activeId,
  onNavigate,
}: {
  headings: WikiHeading[];
  activeId: string;
  onNavigate?: () => void;
}) => (
  <ol className="mt-3 space-y-0.5 text-sm leading-5">
    {headings.map((heading) => {
      const isActive = heading.id === activeId;

      return (
        <li
          key={heading.id}
          className={
            heading.level === 4
              ? 'pl-5'
              : heading.level === 3
                ? 'pl-2.5'
                : undefined
          }
        >
          <a
            href={`#${heading.id}`}
            aria-current={isActive ? 'location' : undefined}
            onClick={onNavigate}
            className={[
              'block rounded-r-lg border-l-2 px-3 py-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400 motion-reduce:transition-none',
              isActive
                ? 'border-brand-400 bg-brand-400/[0.08] font-medium text-ink-100'
                : 'border-transparent text-ink-300 hover:border-ink-600 hover:bg-ink-900/40 hover:text-ink-100',
            ].join(' ')}
          >
            {heading.title}
          </a>
        </li>
      );
    })}
  </ol>
);

export const WikiTableOfContents = ({
  headings,
}: {
  headings: WikiHeading[];
}) => {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileContentId = useId();

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter(({ isIntersecting }) => isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          )[0];

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-8% 0px -80% 0px',
        threshold: [0, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  return (
    <aside className="order-first xl:order-last xl:sticky xl:top-8">
      <div className="rounded-2xl border border-ink-700/80 bg-ink-900/30 p-1 xl:hidden">
        <Button
          type="button"
          disableRipple
          radius="lg"
          variant="light"
          aria-expanded={isMobileOpen}
          aria-controls={mobileContentId}
          onPress={() => setIsMobileOpen((current) => !current)}
          className="min-h-12 w-full justify-between gap-4 px-3 text-left text-sm font-medium text-ink-100 transition-colors hover:bg-ink-900 focus-visible:ring-2 focus-visible:ring-brand-400 motion-reduce:transition-none"
        >
          <span className="inline-flex items-center gap-2">
            <IconList
              aria-hidden="true"
              className="size-4 text-brand-300"
              stroke={1.8}
            />
            En esta nota
          </span>
          <IconChevronDown
            aria-hidden="true"
            className={[
              'size-4 text-ink-300 transition-transform motion-reduce:transition-none',
              isMobileOpen ? 'rotate-180' : '',
            ].join(' ')}
            stroke={1.8}
          />
        </Button>

        <nav
          id={mobileContentId}
          aria-label="Tabla de contenidos móvil"
          hidden={!isMobileOpen}
          className="max-h-[60vh] overflow-y-auto px-2 pb-3"
        >
          <TocLinks
            headings={headings}
            activeId={activeId}
            onNavigate={() => setIsMobileOpen(false)}
          />
        </nav>
      </div>

      <nav
        aria-label="Tabla de contenidos"
        className="hidden max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain border-l border-ink-800 pr-2 xl:block"
      >
        <p className="flex items-center gap-2 px-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-300">
          <IconList
            aria-hidden="true"
            className="size-3.5 text-brand-300"
            stroke={1.8}
          />
          En esta nota
        </p>
        <TocLinks headings={headings} activeId={activeId} />
      </nav>
    </aside>
  );
};
