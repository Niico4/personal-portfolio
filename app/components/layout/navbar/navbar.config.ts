import { IconBook2, IconBriefcase, IconUser } from '@tabler/icons-react';

export const NAV_ITEMS = [
  {
    label: 'Inicio',
    href: '/',
    icon: IconUser,
  },
  {
    label: 'Servicios',
    href: '/services',
    icon: IconBriefcase,
  },
  {
    label: 'Wiki',
    href: '/wiki',
    icon: IconBook2,
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
