import { Chip } from '@nextui-org/react';
import { Icon, IconCircleCheck } from '@tabler/icons-react';
import React, { FC } from 'react';

const InfoItem: FC<{ icon: Icon; label: string; className?: string }> = ({
  label,
  className,
  icon: Icon,
}) => (
  <Chip
    startContent={
      <Icon
        color={Icon === IconCircleCheck ? '#17c964' : '#7cc1fd'}
        size={27}
        stroke={1.25}
      />
    }
    color={Icon === IconCircleCheck ? 'success' : 'primary'}
    variant={Icon === IconCircleCheck ? 'flat' : 'light'}
    className={`text-base tracking-wider text-IColorPrimary gap-1 ${className}`}
    radius="sm"
  >
    {label}
  </Chip>
);

export default InfoItem;
