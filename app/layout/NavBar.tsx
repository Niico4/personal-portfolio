'use client';

import React, { useState, useEffect } from 'react';
import { Grandstander } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from '@heroui/navbar';
import { Tooltip } from '@heroui/tooltip';
import { Breadcrumbs, BreadcrumbItem } from '@heroui/breadcrumbs';

import useBackgroundStore from '@/store/useBackgroundStore';

import ToggleBackground from './components/navbar/ToggleBackground';

export const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const navbarItems = [
  {
    label: 'Inicio',
    href: '/',
    description: 'Bienvenido a mi sitio web',
  },
  {
    label: 'Portafolio',
    href: '/portfolio',
    description: 'Mis proyectos y logros',
  },
  {
    label: 'Sobre Mi',
    href: '/about-me',
    description: 'Conóceme un poco más',
  },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPathname = usePathname();
  const { initializeState, toggleChange } = useBackgroundStore();

  useEffect(() => {
    initializeState();
  }, [initializeState]);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-card rounded-lg md:p-3"
      style={{
        boxShadow: '0px 0px 4px 3px rgba(255, 255, 255, .1)',
      }}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <p
              className={`text-4xl text-animate md:text-5xl ${grandstander.className}`}
            >
              <span className="text-title">{'<'}</span>
              Niico
              <span className="text-title">{'/>'}</span>
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
            separator: 'text-paragraph',
            item: 'text-title',
          }}
          classNames={{
            list: 'bg-white/5 p-3',
          }}
          variant="solid"
        >
          {navbarItems.map(({ href, label, description }, index) => (
            <BreadcrumbItem key={index}>
              <Tooltip
                content={description}
                radius="sm"
                color="secondary"
                placement="bottom"
                showArrow
              >
                <Link
                  className={`text-xl transition-all sm:text-medium max-xl:text-lg
                  ${grandstander.className} ${
                    currentPathname === href
                      ? 'text-primary-200 font-semibold underline underline-offset-4'
                      : 'text-paragraph hover:text-paragraph/80'
                  }`}
                  href={href}
                >
                  {label}
                </Link>
              </Tooltip>
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
        <ToggleBackground onChange={toggleChange} />
      </NavbarContent>

      <NavbarMenu className="p-10 mt-10 justify-evenly items-center">
        <div className="flex-col-center gap-4">
          {navbarItems.map(({ href, label }, index) => (
            <Link
              key={index}
              className={`text-xl transition-all 
                  ${grandstander.className} ${
                currentPathname === href
                  ? 'text-primary-200 font-semibold underline underline-offset-4'
                  : 'text-paragraph hover:text-paragraph/80'
              }`}
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>
        <ToggleBackground onChange={toggleChange} />
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
