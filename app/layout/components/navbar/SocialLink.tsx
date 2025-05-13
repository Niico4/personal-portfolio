import React from 'react';
import Link from 'next/link';
import { Tooltip } from '@heroui/tooltip';
import { Icon } from '@tabler/icons-react';

export interface SocialLinkProps {
  icon: Icon;
  label: string;
  href: string;
}

const SocialLink = ({ label, href, icon: Icon }: SocialLinkProps) => (
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
