import { IconBriefcase, IconCode, IconUser } from '@tabler/icons-react';

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
  {
    label: 'Servicios',
    href: '/services',
    icon: IconBriefcase,
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
