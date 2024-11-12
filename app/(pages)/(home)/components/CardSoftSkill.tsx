import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { Icon } from '@tabler/icons-react';
import React, { FC } from 'react';

const CardSoftSkill: FC<{ title: string; description: string; icon: Icon }> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <Card className="soft-skill-gradient grid grid-cols-[auto_1fr] items-start">
      <CardHeader>
        <Icon size={42} color="#7cc1fd" />
      </CardHeader>
      <CardBody>
        <h3 className="text-gray-50 text-xl font-medium tracking-wider">
          {title}
        </h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </CardBody>
    </Card>
  );
};

export default CardSoftSkill;
