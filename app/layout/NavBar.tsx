'use client';

import React, { useState } from 'react';
import { Mogra } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from '@heroui/navbar';

import LinkItem from './components/navbar/LinkItem';

const mogra = Mogra({
  subsets: ['latin'],
  weight: '400',
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

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#5353534c] rounded-lg"
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" className={`${mogra.className} text-4xl text-animate`}>
            <span className="text-title">{'<'}</span>
            Niico
            <span className="text-title">{'/>'}</span>
          </Link>
        </NavbarBrand>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-white"
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <div className="flex-center gap-3 px-4 py-2 rounded-lg bg-white/5">
          {navbarItems.map(({ href, label }, index) => (
            <LinkItem
              key={index}
              currentPathname={currentPathname}
              label={label}
              href={href}
            />
          ))}
        </div>
      </NavbarContent>

      <NavbarMenu className="justify-evenly items-center">
        <div className="flex-col-center gap-4">
          {navbarItems.map(({ href, label }, index) => (
            <LinkItem
              key={index}
              currentPathname={currentPathname}
              label={label}
              href={href}
            />
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
