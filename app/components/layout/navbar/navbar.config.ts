export const NAV_ITEMS = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Proyectos',
    href: '/projects',
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
