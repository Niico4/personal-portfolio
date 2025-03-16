import { Grandstander } from 'next/font/google';
import React from 'react';

export const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const SubTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2
      className={`${grandstander.className} ${className} text-subtitle text-4xl min-[425px]:text-4xl max-sm:text-center md:text-4xl font-semibold z-20`}
    >
      {title}
    </h2>
  );
};

export default SubTitle;
