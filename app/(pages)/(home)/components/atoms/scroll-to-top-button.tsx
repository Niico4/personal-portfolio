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
      className="flex items-center justify-center rounded-full border border-zinc-300/[0.05] bg-zinc-300/[0.06] text-zinc-400 p-2 backdrop-blur-md"
    >
      <IconArrowNarrowUp size={28} stroke={1} aria-hidden="true" />
    </button>
  );
};
