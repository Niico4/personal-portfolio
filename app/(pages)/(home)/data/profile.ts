import {
  IconDeviceLaptop,
  IconBook,
  IconCode,
  IconUsersGroup,
} from '@tabler/icons-react';

import { SoftSkillProps } from '../types/profile';

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
