import { EmblaOptionsType } from 'embla-carousel';

import { TECH_ICONS } from './iconsTech';

export const OPTIONS_TECH_SKILLS: EmblaOptionsType = {
  slidesToScroll: 10,
  loop: true,
};

export const TECH_SKILLS_SLIDES = TECH_ICONS.map(
  ({ title, icon: Icon }, index) => (
    <div className="gap-2" key={index}>
      <Icon className="size-16" aria-label={`Icono de ${title}`} />
    </div>
  )
);
