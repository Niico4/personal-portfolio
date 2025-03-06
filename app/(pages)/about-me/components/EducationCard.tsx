import React, { FC } from 'react';
import { Card, CardBody } from '@heroui/card';
import { IconExternalLink, IconSchool } from '@tabler/icons-react';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';

interface Props {
  title: string;
  date: string;
  institution: string;
  certificationUrl?: string;
}

const EducationCard: FC<Props> = ({
  title,
  date,
  institution,
  certificationUrl,
}) => {
  const cardContent = (
    <Card
      className="bg-white/10 md:hover:scale-105"
      isBlurred
      radius="sm"
      style={{
        border: '1px solid rgba(124, 193, 253, 0.2)',
      }}
    >
      <CardBody className="justify-center gap-1">
        <div className="flex-center">
          <h4 className="text-custom-secondary text-sm">{date}</h4>
        </div>
        <div className="flex items-center gap-4">
          {certificationUrl ? (
            <IconExternalLink stroke={1} color="#C084FC" size={48} />
          ) : (
            <IconSchool stroke={1} color="#C084FC" size={48} />
          )}

          <div className="flex flex-col justify-center gap-1">
            <h3 className="text-title/85 text-lg font-medium">{title}</h3>
            <p className="text-paragraph/80 text-md">{institution}</p>
          </div>
        </div>
      </CardBody>
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
