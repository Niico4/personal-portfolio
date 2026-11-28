'use client';

import { usePathname } from 'next/navigation';

import { LocalTime } from '@/components/layout/navbar/local-time';

import { NAV_ITEMS } from './navbar.config';
import { NavbarItem } from './navbar-item';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="grid grid-cols-[auto_1fr_auto] items-center gap-x-[clamp(1.25rem,4vw,2rem)] border-b border-border pb-4 max-[426px]:grid-cols-[1fr_auto] max-[426px]:gap-y-1 max-[426px]:pb-1">
      <span className="font-display text-[1.22rem] font-bold tracking-[-0.06em]">
        nicoo
      </span>

      <nav
        aria-label="Navegación principal"
        className="max-[426px]:col-span-2 max-[426px]:row-start-2 max-[426px]:-ml-1"
      >
        <ul className="flex items-center gap-[0.8rem]">
          {NAV_ITEMS.map((item) => {
            const isPage = pathname === item.href;
            const isLocation =
              item.href !== '/' && pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <NavbarItem
                  item={item}
                  ariaCurrent={
                    isPage ? 'page' : isLocation ? 'location' : undefined
                  }
                />
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="max-[426px]:col-start-2 max-[426px]:row-start-1">
        <LocalTime />
      </div>
    </header>
  );
};
