import { FC } from 'react';

import { poetsenOne } from '@/fonts';

interface HeadingProps {
  as?: 'h1' | 'h2';
  children: React.ReactNode;
  className?: string;
}

const headingStyles: Record<NonNullable<HeadingProps['as']>, string> = {
  h1: 'text-3xl sm:text-4xl text-zinc-100',
  h2: 'text-2xl sm:text-3xl text-zinc-200',
};

export const Heading: FC<HeadingProps> = ({
  as: Tag = 'h1',
  children,
  className,
}) => {
  return (
    <Tag
      className={`${poetsenOne.className} ${headingStyles[Tag]} ${className ?? ''} z-20`}
    >
      {children}
    </Tag>
  );
};
