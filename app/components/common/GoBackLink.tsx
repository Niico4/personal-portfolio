import React from 'react';
import Link from 'next/link';
import { IconArrowNarrowLeft } from '@tabler/icons-react';

const GoBackLink = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="flex-center gap-2 text-secondary-200 text-lg underline hover:-translate-y-1 hover:text-secondary-200/75 underline-offset-2 transition-all group z-20"
    >
      <IconArrowNarrowLeft
        stroke={1.5}
        className="group-hover:-translate-x-1 transition-all"
      />
      volver
    </Link>
  );
};

export default GoBackLink;
