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
      className="bg-white/10 md:hover:scale-105 items-start gap-2 p-4"
      radius="sm"
    >
      <div className="flex-center gap-3">
        <span className="p-2 bg-white/[0.07] rounded-lg">
          {certificationUrl ? (
            <IconExternalLink stroke={1.5} color="#df87b0" size={28} />
          ) : (
            <IconSchool stroke={1.5} color="#df87b0" size={28} />
          )}
        </span>
        <h3 className="text-faint text-lg font-medium">{title}</h3>
      </div>

      <div className="flex items-center justify-between w-full">
        <p className="text-dimmed text-base">{institution}</p>
        <time className="text-secondary-400 text-sm">{date}</time>
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
