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
import { Fira_Code } from 'next/font/google';

export const fira_Code = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
});

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
      className="bg-transparent rounded-xl mt-3"
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <p className={`text-3xl text-animate ${fira_Code.className}`}>
              <span className="text-white">{'<'}</span>
              Niico
              <span className="text-white">{'/>'}</span>
            </p>
          </Link>
        </NavbarBrand>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-white"
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <Breadcrumbs
          separator="/"
          itemClasses={{
            separator: 'text-IColorPrimary',
            item: 'text-IColorSecondary',
          }}
          classNames={{
            list: 'bg-black/10',
          }}
          variant="solid"
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
                  className={`text-lg hover:text-white/70 transition-all 
                  ${fira_Code.className} ${
                    currentPathname === href && 'link-animate font-extrabold'
                  }`}
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
            className={`w-full text-center text-lg hover:text-white/70 transition-all mx-auto text-slate-200 bg-black/20 px-5
              py-3 rounded-lg
                  ${fira_Code.className} ${
              currentPathname === href && 'link-animate font-extrabold'
            }`}
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
