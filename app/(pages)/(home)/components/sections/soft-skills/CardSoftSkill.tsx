import React, { FC } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Icon } from '@tabler/icons-react';

const CardSoftSkill: FC<{ title: string; description: string; icon: Icon }> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <Card className="flex-row items-center bg-gradient-to-l from-[#7828C8]/40 via-[#4B2981]/40 to-[#1E293B]/40 border border-[#7828c8b0] px-4 py-2">
      <CardHeader className="flex-center w-auto p-3 rounded-full bg-white/10">
        <Icon size={32} color="#EFDCFF" stroke={1.5} />
      </CardHeader>
      <CardBody className="w-full">
        <h3 className="text-title text-xl font-medium md:tracking-wider md:text-2xl">
          {title}
        </h3>
        <p className="text-paragraph/80 text-base md:text-medium">
          {description}
        </p>
      </CardBody>
    </Card>
  );
};

export default CardSoftSkill;
