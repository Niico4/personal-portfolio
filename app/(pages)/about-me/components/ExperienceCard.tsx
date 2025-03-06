import React from 'react';
import { Card, CardBody } from '@heroui/card';

import { EXPERIENCE_LIST } from '../data/user-info';

import Timeline from './Timeline';

const ExperienceCard = () => {
  return (
    <>
      <Card
        className="bg-zinc-900/70 p-4"
        isBlurred
        radius="sm"
        style={{
          boxShadow:
            '15px 15px 30px rgba(0, 0, 0, 0.8), -15px -15px 30px rgba(0, 0, 0, 0.8)',
        }}
      >
        <CardBody>
          {EXPERIENCE_LIST.map(({ date, description, title }, index) => (
            <Timeline
              key={index}
              date={date}
              title={title}
              description={description}
            />
          ))}
        </CardBody>
      </Card>
    </>
  );
};

export default ExperienceCard;
