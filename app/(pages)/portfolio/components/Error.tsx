import { Chip } from '@nextui-org/react';
import { IconMoodWrrrFilled } from '@tabler/icons-react';
import React, { FC } from 'react';

const Error: FC<{ error?: string }> = ({ error }) => {
  return (
    <Chip
      startContent={<IconMoodWrrrFilled size={32} />}
      variant="flat"
      color="danger"
      size="lg"
      radius="sm"
      className="text-2xl p-6 mx-auto"
    >
      {error}
    </Chip>
  );
};

export default Error;
