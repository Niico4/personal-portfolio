import {
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconDeviceLaptop,
  IconMapPinFilled,
  IconBook,
  IconCode,
  IconUsersGroup,
} from '@tabler/icons-react';

import { SocialLinkProps, SoftSkillProps } from '../types/profile';

export const PROFILE_DETAILS = [
  {
    label: 'Desarrollador Frontend',
    icon: IconDeviceLaptop,
  },
  {
    label: 'Bogotá, Colombia',
    icon: IconMapPinFilled,
  },
];

export const SOCIAL_LINKS: SocialLinkProps[] = [
  {
    icon: IconMail,
    label: 'Gmail',
    href: 'mailto:nicogarzon131@gmail.com',
  },
  {
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nicolasgarzon131/',
  },
  {
    icon: IconBrandGithub,
    label: 'GitHub',
    href: 'https://github.com/Niico4',
  },
];

export const SOFT_SKILLS: SoftSkillProps[] = [
  {
    title: 'De la Idea al Producto Final',
    description:
      'Desarrollo soluciones intuitivas y atractivas, priorizando la experiencia del usuario en cada decisión de diseño.',
    icon: IconDeviceLaptop,
  },
  {
    title: 'Metodología Ágil',
    description:
      'Trabajo con sprints iterativos, adaptándome rápidamente a cambios y nuevos requerimientos.',
    icon: IconBook,
  },
  {
    title: 'Código Limpio',
    description:
      'Escribo código mantenible y escalable, siguiendo las mejores prácticas y patrones de diseño modernos.',
    icon: IconCode,
  },
  {
    title: 'Colaboración Efectiva',
    description:
      'Comunicación clara y constante con el equipo y stakeholders para garantizar resultados óptimos.',
    icon: IconUsersGroup,
  },
];
