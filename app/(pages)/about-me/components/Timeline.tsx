import React, { FC } from 'react';

import { TimeLineProps } from '../types/about-me';

const Timeline: FC<TimeLineProps> = ({ title, date, description }) => {
  return (
    <ol className="relative border-s border-gray-500">
      <li className="mb-10 ms-4">
        <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-300 bg-gray-400"></div>
        <time className="mb-1 text-sm font-normal leading-none text-secondary-400">
          {date}
        </time>
        <h3 className="text-xl mb-3 font-semibold text-subtitle/95">{title}</h3>
        <p className="mb-4 text-base font-normal text-default">{description}</p>
      </li>
    </ol>
  );
};

export default Timeline;
