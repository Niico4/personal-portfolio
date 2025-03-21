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

import { SOCIAL_LINKS } from '@/(pages)/(home)/data/profile';
import SocialLink from '@/(pages)/(home)/components/SocialLink';

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
      className="bg-white/[0.04] rounded-full mx-auto"
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarBrand className="hidden sm:block">
          <Link
            href="/"
            className={`${mogra.className} text-4xl text-animate`}
            aria-label="Logo"
          >
            N
          </Link>
        </NavbarBrand>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-white"
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <div className="flex-center gap-3 px-4 py-2 rounded-lg ">
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

      <NavbarContent justify="end">
        <ul className="flex-center gap-3 mb-1 bg-white/5 rounded-full px-2 py-1">
          {SOCIAL_LINKS.map(({ label, href, icon }, index) => (
            <li key={index}>
              <SocialLink href={href} icon={icon} label={label} />
            </li>
          ))}
        </ul>
      </NavbarContent>

      <NavbarMenu className="justify-evenly items-center top-0 bottom-0 !h-auto">
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
