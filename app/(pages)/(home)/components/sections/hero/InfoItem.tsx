import { Chip } from '@nextui-org/react';
import { Icon } from '@tabler/icons-react';
import React, { FC } from 'react';

const InfoItem: FC<{ icon: Icon; label: string; className?: string }> = ({
  label,
  className,
  icon: Icon,
}) => (
  <Chip
    startContent={<Icon color="#7cc1fd" size={26} stroke={1.25} />}
    color="primary"
    variant="light"
    className={`text-sm tracking-widest text-IColorPrimary gap-1 ${className}`}
    radius="sm"
  >
    {label}
  </Chip>
);

export default InfoItem;
