import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { Icon } from '@tabler/icons-react';
import React, { FC } from 'react';

const CardSoftSkill: FC<{ title: string; description: string; icon: Icon }> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <Card className="w-[350px] bg-neutral-800/90 grid grid-cols-[auto_1fr] items-start place-content-center">
      <CardHeader className="justify-center items-center">
        <Icon size={38} color="#7cc1fd" />
      </CardHeader>
      <CardBody>
        <h3 className="text-IColorSecondary text-lg tracking-wider">{title}</h3>
        <p className="text-IColorPrimary text-sm font-light">{description}</p>
      </CardBody>
    </Card>
  );
};

export default CardSoftSkill;
