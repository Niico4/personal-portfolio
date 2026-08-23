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
      className="group flex size-11 items-center justify-center rounded-full text-zinc-400 transition-[color,background-color,transform] duration-150 ease-out hover:bg-zinc-800 hover:text-zinc-100 active:scale-[0.97] active:bg-zinc-700/70"
    >
      <IconArrowNarrowUpDashed
        size={28}
        stroke={1}
        aria-hidden="true"
        className="transition-transform duration-150 ease-out group-hover:-translate-y-px group-active:translate-y-0"
      />
    </button>
  );
};
