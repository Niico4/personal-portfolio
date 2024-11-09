import {
  IconBulbFilled,
  IconMessageFilled,
  IconDropletFilled,
  IconBoltFilled,
} from '@tabler/icons-react';
import { EmblaOptionsType } from 'embla-carousel';

export const OPTIONS_SOFT_SKILLS: EmblaOptionsType = {
  slidesToScroll: 'auto',
  loop: true,
};

export const SOFT_SKILLS = [
  {
    title: 'Resolución de problemas',
    description:
      'Encuentro soluciones efectivas a los desafíos que se presentan en el camino.',
    icon: IconBulbFilled,
  },
  {
    title: 'Comunicación',
    description:
      'Expreso mis ideas claramente y colaboro con otros para lograr objetivos comunes.',
    icon: IconMessageFilled,
  },
  {
    title: 'Adaptabilidad',
    description:
      'Me ajusto rápidamente a nuevas situaciones y aprendo sobre la marcha.',
    icon: IconDropletFilled,
  },
  {
    title: 'Autodidacta',
    description:
      'Busco constantemente aprender y mejorar mis habilidades de manera independiente.',
    icon: IconBoltFilled,
  },
];
