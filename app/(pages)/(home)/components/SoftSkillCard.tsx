import React, { FC } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';

import { SoftSkillProps } from '../types/profile';

const SoftSkillCard: FC<SoftSkillProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <Card
      className="p-6 gap-4 transition-all duration-500 backdrop-blur-md bg-white/[0.07] border border-white/[0.08] hover:bg-white/[0.12] hover:scale-[1.02]"
      radius="sm"
    >
      <CardHeader className="gap-4 p-0">
        <div className="rounded-xl bg-white/[0.08] p-2.5 ring-1 ring-white/[0.06]">
          <Icon size={24} color="#ffffff" stroke={1.5} className="opacity-80" />
        </div>
        <h3 className="text-2xl font-semibold text-faint">{title}</h3>
      </CardHeader>
      <CardBody className="p-0">
        <p className="text-sm md:text-base text-soft leading-relaxed">
          {description}
        </p>
      </CardBody>
    </Card>
  );
};

export default SoftSkillCard;
