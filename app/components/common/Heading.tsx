import { Grandstander } from 'next/font/google';
import React, { FC } from 'react';

export const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

interface HeadingProps {
  title: string;
  className?: string;
  type: 'h1' | 'h2';
}

const Heading: FC<HeadingProps> = ({ title, className, type }) => {
  return (
    <>
      {type === 'h1' && (
        <h1
          className={`${grandstander.className} ${className} text-title text-4xl sm:text-5xl text-center font-medium z-20`}
        >
          {title}
        </h1>
      )}

      {type === 'h2' && (
        <h2
          className={`${grandstander.className} ${className} text-subtitle/95 text-4xl font-medium z-20`}
        >
          {title}
        </h2>
      )}
    </>
  );
};

export default Heading;
