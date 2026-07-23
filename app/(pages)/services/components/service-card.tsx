import { FC } from 'react';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { IconCheck } from '@tabler/icons-react';

import { Service } from '../sections/my-services-section';

interface Props {
  service: Service;
}

const ACCENT_STYLES = {
  brand: {
    borderCard: 'border-brand-500/15',
    hoverBorderCard: 'hover:border-brand-400/20',
    glowEffectCard: 'bg-brand-500/[0.07]',
    badgeText: 'text-brand-300',
    bgBadge: 'bg-brand-500/10',
    borderBadge: 'border-brand-500/10',
    backgroundFooter: 'bg-brand-500/5',
  },
  purple: {
    borderCard: 'border-purple-500/15',
    hoverBorderCard: 'hover:border-purple-400/20',
    glowEffectCard: 'bg-purple-500/[0.07]',
    badgeText: 'text-purple-300',
    bgBadge: 'bg-purple-500/10',
    borderBadge: 'border-purple-500/10',
    backgroundFooter: 'bg-purple-500/5',
  },
  amber: {
    borderCard: 'border-amber-500/15',
    hoverBorderCard: 'hover:border-amber-400/20',
    glowEffectCard: 'bg-amber-500/[0.07]',
    badgeText: 'text-amber-300',
    bgBadge: 'bg-amber-500/10',
    borderBadge: 'border-amber-500/10',
    backgroundFooter: 'bg-amber-500/5',
  },
} as const;

export const ServiceCard: FC<Props> = ({ service }) => {
  const { number, eyebrow, title, description, features, accent, canBeUseful } =
    service;
  const styles = ACCENT_STYLES[accent];

  return (
    <Card
      className={`p-2 sm:p-5 border ${styles.borderCard} transition-colors duration-300 ${styles.hoverBorderCard}`}
      isBlurred
    >
      <div
        aria-hidden="true"
        className={`absolute -left-24 -top-24 size-72 rounded-full ${styles.glowEffectCard} blur-3xl`}
      />

      <CardBody className="gap-3">
        <span
          className={`w-max px-2 py-[2px] text-xs font-mono rounded-full ${styles.badgeText} ${styles.bgBadge} border ${styles.borderBadge}`}
        >
          {number} {eyebrow}
        </span>

        <h3 className="text-xl text-ink-50/90 font-semibold tracking-tight">
          {title}
        </h3>

        <p className="text-ink-200 text-sm">{description}</p>

        <ul
          aria-label="Características de las aplicaciones web y sistemas de gestión"
          className={`grid gap-2 ${number === '01' ? 'sm:grid-cols-2' : 'sm:grid-cols-1'}`}
        >
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center justify-start gap-2 text-xs text-ink-200 tracking-wide"
            >
              <IconCheck
                aria-hidden="true"
                stroke={1.5}
                size={16}
                className={`${styles.badgeText}`}
              />

              {feature}
            </li>
          ))}
        </ul>
      </CardBody>

      {canBeUseful && (
        <CardFooter
          className={`flex-col items-start gap ${styles.backgroundFooter} rounded-xl mt-2`}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-ink-300">
            Puede servirte si
          </p>

          <Divider aria-hidden className={`${styles.borderBadge} mb-2 mt-1`} />

          <p className="text-sm leading-6 text-ink-200/80">
            Tu operación depende de hojas de cálculo, mensajes, tareas manuales
            o información distribuida entre diferentes herramientas.
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
