import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from '@tabler/icons-react';

export const SOCIALS_LINKS = [
  { icon: IconBrandX, label: 'Twitter', href: 'https://x.com/Niico4_' },
  {
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nicolasgarzon131/',
  },
  { icon: IconMail, label: 'Gmail', href: 'mailto:nicogarzon131@gmail.com' },
  { icon: IconBrandGithub, label: 'GitHub', href: 'https://github.com/Niico4' },
];

const startYear = 2022;

export const EXPERIENCE_DETAILS = [
  {
    label: 'Años de Experiencia',
    value: new Date().getFullYear() - startYear,
  },
  { label: 'Proyectos Realizados', value: 20 },
];

export const DESCRIPTION =
  'Desarrollador Frontend apasionado por crear aplicaciones web innovadoras, funcionales y con un diseño visual impactante. Combino creatividad y habilidades técnicas para ofrecer soluciones efectivas y atractivas.';
