import { Grandstander } from 'next/font/google';
import React from 'react';

export const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const Title = ({ title, className }: { title: string; className?: string }) => {
  return (
    <h2 className={`title-section ${grandstander.className} ${className}`}>
      {title}
    </h2>
  );
};

export default Title;
