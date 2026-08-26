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
      className="group flex size-11 items-center justify-center rounded-full text-content-muted transition-[color,background-color,transform] duration-150 ease-out hover:bg-line/[0.06] hover:text-content-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-main active:scale-[0.97] active:bg-line/10 motion-reduce:transition-none"
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
