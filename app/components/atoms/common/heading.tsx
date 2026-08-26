import { FC } from 'react';

interface HeadingProps {
  as?: 'h1' | 'h2';
  children: React.ReactNode;
  className?: string;
}

const headingStyles: Record<NonNullable<HeadingProps['as']>, string> = {
  h1: 'text-3xl leading-[1.1] sm:text-[2rem]',
  h2: 'text-[1.875rem] leading-[1.12] sm:text-[2rem]',
};

export const Heading: FC<HeadingProps> = ({
  as: Tag = 'h1',
  children,
  className,
}) => {
  return (
    <Tag
      className={`${headingStyles[Tag]} ${className ?? ''} z-20 font-medium tracking-[-0.025em] text-content-primary`}
    >
      {children}
    </Tag>
  );
};
