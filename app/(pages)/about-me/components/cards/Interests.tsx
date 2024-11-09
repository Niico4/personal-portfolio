import React from 'react';
import { Card, CardBody, Chip } from '@nextui-org/react';

import { INTERESTS_DATA } from '../../constants/data.data';

const CardInterests = () => {
  return (
    <Card className="bg-slate-900/80 border-1 border-slate-800 p-4 flex-1">
      <CardBody className="flex-row flex-wrap gap-3">
        {INTERESTS_DATA.map((interest, index) => (
          <Chip key={index} variant="flat" color="warning" className="flex-1">
            {interest}
          </Chip>
        ))}
      </CardBody>
    </Card>
  );
};

export default CardInterests;
