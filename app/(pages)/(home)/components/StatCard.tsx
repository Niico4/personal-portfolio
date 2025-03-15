import React, { FC } from 'react';
import { Card, CardBody } from '@heroui/card';
import { Grandstander } from 'next/font/google';
import CountUp from 'react-countup';

import { StatCardProps } from '../types/profile';

const grandstander = Grandstander({
  display: 'swap',
  subsets: ['latin'],
});

const StatCard: FC<StatCardProps> = ({ label, value, duration = 2 }) => {
  return (
    <Card
      className="flex-1 card-bg p-1 md:p-4"
      isBlurred
      suppressHydrationWarning
    >
      <CardBody>
        <span
          className={`${grandstander.className} text-primary-200 text-4xl font-semibold`}
        >
          +<CountUp end={value} start={0} duration={duration} />
        </span>
        <p className="text-2xl font-medium text-default">{label}</p>
      </CardBody>
    </Card>
  );
};

export default StatCard;
