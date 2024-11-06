'use client';

import React from 'react';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navbarItems = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Acerca de Mi',
    href: '/about-me',
  },
  {
    label: 'Portafolio',
    href: '/portfolio',
  },
];

const NavBar = () => {
  const currentPathname = usePathname();
  return (
    <nav className="w-full py-8">
      <ul className="flex items-center justify-between">
        <li className="flex items-center text-IColorSecondary">
          <span className="text-3xl">{'<'}</span>
          <p className="text-3xl text-animate">Niico</p>
          <span className="text-3xl">{'/>'}</span>
        </li>
        <li>
          <Breadcrumbs
            itemClasses={{
              separator: 'text-IColorPrimary',
              item: 'text-IColorSecondary',
            }}
          >
            {navbarItems.map(({ href, label }, index) => (
              <BreadcrumbItem key={index}>
                <Link
                  className={`${
                    currentPathname === href && 'text-primary'
                  } text-lg`}
                  href={href}
                >
                  {label}
                </Link>
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
