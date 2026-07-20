'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGroup } from 'framer-motion';

import NicolasLogo from '@/components/common/icons/nicolas-logo';

import { NavbarItem } from './navbar-item';
import { NAV_ITEMS } from './navbar.config';

const getActiveHref = (pathname: string) => {
  return NAV_ITEMS.find((item) => {
    if (item.href === '/') {
      return pathname === '/';
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  })?.href;
};

export const FloatingNavbar = () => {
  const pathname = usePathname();
  const activeHref = getActiveHref(pathname);

  return (
    <nav
      aria-label="Navegación principal"
      className="
        fixed
        bottom-[calc(1rem+env(safe-area-inset-bottom))]
        left-1/2
        z-50
        max-w-[calc(100vw-2rem)]
        -translate-x-1/2

        sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom))]

        lg:bottom-auto
        lg:left-[max(1.25rem,calc((100vw-72rem)/2-4.5rem))]
        lg:top-1/2
        lg:-translate-x-0
        lg:-translate-y-1/2
      "
    >
      <LayoutGroup id="floating-navbar">
        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-ink-700/70
            bg-ink-950/85
            p-2
            shadow-[0_16px_50px_rgba(0,0,0,0.4)]
            backdrop-blur-xl

            lg:flex-col
          "
        >
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="
              grid
              size-11
              shrink-0
              place-items-center
              rounded-full
              border
              border-ink-700
              bg-main
              outline-none
              transition
              duration-300

              hover:scale-105
              hover:border-ink-500

              focus-visible:ring-2
              focus-visible:ring-brand-400
              focus-visible:ring-offset-2
              focus-visible:ring-offset-ink-950

              motion-reduce:transform-none
            "
          >
            <NicolasLogo aria-hidden="true" className="size-6" />
          </Link>

          <div
            aria-hidden="true"
            className="
              mx-1
              h-7
              w-px
              shrink-0
              bg-ink-700/70

              lg:mx-0
              lg:my-1
              lg:h-px
              lg:w-7
            "
          />

          <ul className="flex items-center gap-2 lg:flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavbarItem
                  item={item}
                  isActive={item.href === activeHref}
                  activeHref={activeHref}
                />
              </li>
            ))}
          </ul>
        </div>
      </LayoutGroup>
    </nav>
  );
};
