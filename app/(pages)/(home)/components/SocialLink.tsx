import React, { FC } from 'react';
import Link from 'next/link';
import { Tooltip } from '@heroui/tooltip';

import { SocialLinkProps } from '../types/profile';

const SocialLink: FC<SocialLinkProps> = ({ label, href, icon: Icon }) => (
  <Tooltip content={label} color="primary" placement="bottom" showArrow>
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Enlace de ${label}`}
      className="block rounded-full text-default p-1 hover:text-subtitle hover:bg-white/20 hover:scale-110 transition-all"
    >
      <Icon stroke={1.5} />
    </Link>
  </Tooltip>
);

export default SocialLink;
