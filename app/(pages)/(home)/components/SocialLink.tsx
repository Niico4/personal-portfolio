import React, { FC } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';

import { SocialLinkProps } from '../types/profile';

const SocialLink: FC<SocialLinkProps> = ({ label, href, icon: Icon }) => (
  <Tooltip content={label} color="secondary" placement="bottom" showArrow>
    <Button
      as={Link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      isIconOnly
      startContent={<Icon color="#E6E6E7" size={28} />}
      variant="light"
      aria-label={`Enlace de ${label}`}
    />
  </Tooltip>
);

export default SocialLink;
