import { FC } from 'react';

import { poetsenOne } from '@/fonts';

interface HeadingProps {
  as?: 'h1' | 'h2';
  children: React.ReactNode;
  className?: string;
}

const headingStyles: Record<NonNullable<HeadingProps['as']>, string> = {
  h1: 'text-4xl text-ink-50 sm:text-5xl',
  h2: 'text-2xl text-ink-100 sm:text-3xl',
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
