import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import { Icon } from '@tabler/icons-react';

const ButtonSocial = ({
  icon: Icon,
  label,
  href,
}: {
  icon: Icon;
  label: string;
  href: string;
}) => (
  <Tooltip content={label} color="secondary" placement="bottom" showArrow>
    <Button
      as={Link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      isIconOnly
      startContent={<Icon color="#E6E6E7" size={28} />}
      variant="flat"
    />
  </Tooltip>
);

export default ButtonSocial;
