'use client';

import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from './navbar.config';
import { NavbarItem } from './navbar-item';

export const FloatingNavbar = () => {
  const pathname = usePathname();

  const activeIndex = NAV_ITEMS.findIndex(({ href }) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`),
  );

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-muted/60 p-1.5 shadow-lg shadow-black/20 backdrop-blur-2xl backdrop-saturate-150 sm:bottom-[calc(2rem+env(safe-area-inset-bottom))]"
    >
      <ul className="relative flex items-center gap-1">
        {NAV_ITEMS.map((item, index) => (
          <li key={item.href}>
            <NavbarItem item={item} isActive={index === activeIndex} />
          </li>
        ))}

        <li
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 size-11 rounded-full border border-white/10 bg-white/8 motion-safe:transition-[transform,opacity] motion-safe:duration-350 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translateX(calc(var(--spacing) * ${Math.max(activeIndex, 0) * 12}))`,
            opacity: activeIndex === -1 ? 0 : 1,
          }}
        />
      </ul>
    </nav>
  );
};
