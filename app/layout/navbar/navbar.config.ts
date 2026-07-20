import { IconCode, IconUser } from '@tabler/icons-react';

export const NAV_ITEMS = [
  {
    label: 'Inicio',
    href: '/',
    icon: IconUser,
  },
  {
    label: 'Proyectos',
    href: '/portfolio',
    icon: IconCode,
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
