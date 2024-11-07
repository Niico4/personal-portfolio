import { Button, Tooltip } from '@nextui-org/react';
import { Icon } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const ButtonSocial = ({
  icon: Icon,
  label,
  href,
}: {
  icon: Icon;
  label: string;
  href: string;
}) => (
  <Tooltip
    content={label}
    color="primary"
    className="text-gray-900"
    placement="bottom"
    showArrow
  >
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Button
        isIconOnly
        startContent={<Icon stroke={1.5} color="#e6e6e7" size={28} />}
        radius="full"
        variant="light"
        color="default"
        size="lg"
      />
    </Link>
  </Tooltip>
);

export default ButtonSocial;
