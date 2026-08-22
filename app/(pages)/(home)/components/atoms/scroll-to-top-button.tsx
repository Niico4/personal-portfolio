'use client';

import { IconArrowNarrowUpDashed } from '@tabler/icons-react';

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
      className="flex size-11 items-center justify-center rounded-full text-zinc-400 transition-colors duration-150 ease-out hover:text-zinc-100"
    >
      <IconArrowNarrowUpDashed size={28} stroke={1} aria-hidden="true" />
    </button>
  );
};
