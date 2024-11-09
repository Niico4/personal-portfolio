'use client';

import React, { useState } from 'react';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  Tooltip,
} from '@nextui-org/react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPathname = usePathname();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="w-[95%] xl:w-2/3 min-[1300px]:w-1/2 mx-auto bg-transparent rounded-xl mt-3"
    >
      <NavbarContent>
        <NavbarBrand>
          <span className="text-3xl text-white">{'<'}</span>
          <p className="text-3xl text-animate">Niico</p>
          <span className="text-3xl text-white">{'/>'}</span>
        </NavbarBrand>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-white"
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
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
                    currentPathname === href && 'text-primary font-extrabold'
                  } text-lg font-medium hover:text-white/60 transition-all`}
                  href={href}
                >
                  {label}
                </Link>
              </Tooltip>
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </NavbarContent>

      <NavbarMenu className="p-10">
        {navbarItems.map(({ href, label }, index) => (
          <Link
            key={index}
            className={`${
              currentPathname === href ? 'text-primary' : 'text-slate-200'
            } text-2xl mx-auto font-semibold`}
            href={href}
          >
            {label}
          </Link>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
