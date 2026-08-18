'use client';

import { IconArrowNarrowUp } from '@tabler/icons-react';

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={scrollToTop}
      className="flex items-center gap-1 rounded-full border border-zinc-300/10 bg-zinc-300/5 py-0.5 pl-2.5 pr-2 text-xs font-medium text-zinc-500"
    >
      Ir arriba
      <IconArrowNarrowUp size={14} stroke={1.5} aria-hidden="true" />
    </button>
  );
};
