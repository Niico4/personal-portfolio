import React, { FC } from 'react';
import { Card } from '@heroui/card';
import CountUp from 'react-countup';

import { StatCardProps } from '../types/profile';

import { DYNA_PUFF } from '@/layout';

const StatCard: FC<StatCardProps> = ({ label, value, duration = 2 }) => {
  return (
    <Card className="flex-col-center w-full card-bg p-4" radius="sm" isBlurred>
      <span
        className={`${DYNA_PUFF.className} text-primary-200 text-3xl font-normal`}
      >
        +<CountUp end={value} start={0} duration={duration} />
      </span>
      <p className="text-sm font-semibold text-soft/95 tracking-wider">
        {label}
      </p>
    </Card>
  );
};

export default StatCard;
