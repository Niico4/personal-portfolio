import React, { FC } from 'react';
import { Card } from '@heroui/card';
import { Grandstander } from 'next/font/google';
import CountUp from 'react-countup';

import { StatCardProps } from '../types/profile';

const grandstander = Grandstander({
  display: 'swap',
  subsets: ['latin'],
});

const StatCard: FC<StatCardProps> = ({ label, value, duration = 2 }) => {
  return (
    <Card className="flex-1 flex-col-center card-bg p-4" radius="sm" isBlurred>
      <span
        className={`${grandstander.className} text-primary-200 text-4xl font-semibold`}
      >
        +<CountUp end={value} start={0} duration={duration} />
      </span>
      <p
        className={`${grandstander.className} text-xl text-soft/95 tracking-wide`}
      >
        {label}
      </p>
    </Card>
  );
};

export default StatCard;
