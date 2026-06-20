'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconCode, IconHome, IconUser } from '@tabler/icons-react';
import { LayoutGroup } from 'framer-motion';

import NicolasLogo from '@/components/common/icons/nicolas-logo';

import { NavbarItem } from './navbar-item';

export const NAV_ITEMS = [
  {
    label: 'Inicio',
    href: '/',
    icon: IconHome,
  },
  {
    label: 'Proyectos',
    href: '/portfolio',
    icon: IconCode,
  },
  {
    label: 'Sobre mí',
    href: '/about-me',
    icon: IconUser,
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

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
        bottom-5 left-1/2 -translate-x-1/2
        md:bottom-auto md:left-6 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2
      "
    >
      <LayoutGroup id="floating-navbar">
        <div
          className="
            flex items-center gap-2 rounded-full border border-white/10
            bg-[#15161d]/80 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
            md:flex-col md:gap-3 md:p-2.5
          "
        >
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="
              grid size-11 shrink-0 place-items-center rounded-full
              border border-white/10 bg-black
              transition-transform duration-300 hover:scale-105
              md:size-12
            "
          >
            <NicolasLogo aria-hidden="true" className="size-6" />
          </Link>

          <div className="h-px w-7 bg-white/10 md:w-8" />

          <div className="flex items-center gap-2 md:flex-col md:gap-3">
            {NAV_ITEMS.map((item) => (
              <NavbarItem
                key={item.href}
                item={item}
                isActive={item.href === activeHref}
                activeHref={activeHref}
              />
            ))}
          </div>
        </div>
      </LayoutGroup>
    </nav>
  );
};
