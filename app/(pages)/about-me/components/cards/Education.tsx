import React from 'react';
import { Card, CardBody } from '@nextui-org/react';

import Timeline from '../timeline/Timeline';
import { EDUCATION_DATA } from '../../constants/data.data';

const CardEducation = () => {
  return (
    <Card className="bg-black/50 p-4 flex-1" isBlurred>
      <CardBody>
        {EDUCATION_DATA.map(({ title, badgeLabel, date }, index) => (
          <Timeline
            key={index}
            variant="badge"
            date={date}
            title={title}
            badgeLabel={badgeLabel}
          />
        ))}
      </CardBody>
    </Card>
  );
};

export default CardEducation;
