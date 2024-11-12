import React from 'react';
import { Card, CardBody, Chip } from '@nextui-org/react';

import { INTERESTS_DATA } from '../../constants/data.data';

const CardInterests = () => {
  return (
    <Card className="card-bg p-4 flex-1">
      <CardBody className="flex-row flex-wrap gap-3">
        {INTERESTS_DATA.map((interest, index) => (
          <Chip key={index} variant="flat" color="success" className="flex-1">
            {interest}
          </Chip>
        ))}
      </CardBody>
    </Card>
  );
};

export default CardInterests;
