import React, { FC } from 'react';

interface Props {
  date: string;
  title: string;
  description: string;
}

const Timeline: FC<Props> = ({ title, date, description }) => {
  return (
    <ol className="relative border-s border-gray-500">
      <li className="mb-10 ms-4">
        <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-300 bg-gray-400"></div>
        <time className="mb-1 text-sm font-normal leading-none text-secondary-400">
          {date}
        </time>
        <h3 className="max-md:text-xl text-lg mb-3 font-semibold text-title">
          {title}
        </h3>
        <p className="mb-4 text-base font-normal text-paragraph/80">
          {description}
        </p>
      </li>
    </ol>
  );
};

export default Timeline;
