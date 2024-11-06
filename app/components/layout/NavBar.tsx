'use client';

import React from 'react';
import { BreadcrumbItem, Breadcrumbs, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navbarItems = [
  {
    label: 'Inicio',
    href: '/',
    description: 'Bienvenido a mi Sitio Web',
  },
  {
    label: 'Portafolio',
    href: '/portfolio',
    description: 'Mis proyectos y logros',
  },
  {
    label: 'Sobre de Mi',
    href: '/about-me',
    description: 'Conoce un poco más sobre mi',
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
            {navbarItems.map(({ href, label, description }, index) => (
              <BreadcrumbItem key={index}>
                <Tooltip
                  content={description}
                  color="primary"
                  className="text-gray-900"
                  showArrow
                >
                  <Link
                    className={`${
                      currentPathname === href && 'text-primary'
                    } text-lg`}
                    href={href}
                  >
                    {label}
                  </Link>
                </Tooltip>
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
