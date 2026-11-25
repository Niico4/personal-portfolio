import { IconLayoutGrid, IconUser } from '@tabler/icons-react';

export const NAV_ITEMS = [
  {
    label: 'Inicio',
    href: '/',
    icon: IconUser,
  },
  {
    label: 'Proyectos',
    href: '/projects',
    icon: IconLayoutGrid,
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
