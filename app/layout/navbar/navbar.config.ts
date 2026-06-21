import { IconHome, IconCode, IconUser } from '@tabler/icons-react';

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
