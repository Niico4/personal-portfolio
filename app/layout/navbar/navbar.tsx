'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGroup } from 'framer-motion';

import NicolasLogo from '@/components/common/icons/nicolas-logo';

import { NavbarItem } from './navbar-item';
import { NAV_ITEMS } from './navbar.config';

const getActiveHref = (pathname: string) => {
  return NAV_ITEMS.find((item) => {
    if (item.href === '/') return pathname === '/';

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
        fixed z-50
        bottom-3 left-1/2 max-w-[calc(100vw-2rem)] -translate-x-1/2 sm:bottom-5
        lg:bottom-auto lg:left-5 lg:top-1/2 lg:-translate-x-0 lg:-translate-y-1/2
      "
    >
      <LayoutGroup id="floating-navbar">
        <div
          className="
            flex items-center gap-2 rounded-full border border-white/10
            bg-[#15161d]/80 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
            lg:flex-col lg:gap-2
          "
        >
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="
              grid size-11 shrink-0 place-items-center rounded-full
              border border-white/10 bg-black
              transition-transform duration-300 hover:scale-105
            "
          >
            <NicolasLogo aria-hidden="true" className="size-6" />
          </Link>

          <div className="h-px w-7 bg-white/10" />

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
