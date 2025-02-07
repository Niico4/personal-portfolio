import React from 'react';
import { Card, CardBody } from '@heroui/card';

import Timeline from '../timeline/Timeline';
import { EXPERIENCE_DATA } from '../../constants/data.data';

const CardExperience = () => {
  return (
    <>
      {EXPERIENCE_DATA.map(({ date, description, title }, index) => (
        <Card className="card-bg-blur" key={index} isBlurred>
          <CardBody>
            <Timeline
              variant="description"
              date={date}
              title={title}
              description={description.map((description, index) => (
                <p className="mb-2" key={index}>
                  {description}
                </p>
              ))}
            />
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default CardExperience;
