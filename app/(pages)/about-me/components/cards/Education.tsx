import React from 'react';
import { Card, CardBody } from '@heroui/card';

import Timeline from '../timeline/Timeline';
import { EDUCATION_DATA } from '../../constants/data.data';

const CardEducation = () => {
  return (
    <Card className="card-bg-blur" isBlurred>
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
