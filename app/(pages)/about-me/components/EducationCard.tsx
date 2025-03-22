import React, { FC } from 'react';
import { Card } from '@heroui/card';
import { IconExternalLink, IconSchool } from '@tabler/icons-react';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';

import { EducationCardProps } from '../types/about-me';

const EducationCard: FC<EducationCardProps> = ({
  title,
  date,
  institution,
  certificationUrl,
}) => {
  const cardContent = (
    <Card
      className="bg-orange-300/[0.06] border border-purple-400/5 md:hover:scale-105 items-start gap-2 p-4"
      radius="sm"
      isBlurred
    >
      <div className="flex-center gap-3">
        <span className="p-2 bg-white/[0.07] rounded-lg">
          {certificationUrl ? (
            <IconExternalLink
              stroke={1.5}
              className="text-secondary-300"
              size={28}
            />
          ) : (
            <IconSchool stroke={1.5} className="text-secondary-300" size={28} />
          )}
        </span>
        <h3 className="text-subtitle/95 text-lg font-semibold">{title}</h3>
      </div>

      <div className="flex items-center justify-between w-full">
        <p className="text-default text-sm">{institution}</p>
        <time className="text-secondary-200 text-sm">{date}</time>
      </div>
    </Card>
  );

  return certificationUrl ? (
    <Popover placement="bottom" color="warning" showArrow backdrop="opaque">
      <PopoverTrigger className="cursor-pointer">{cardContent}</PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <h3 className="text-base font-bold">Funcionalidad en desarrollo</h3>
          <p className="text-small">
            ¡Estoy trabajando en esta sección! Pronto podrás ver mis
            certificados.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    cardContent
  );
};

export default EducationCard;
