import React, { FC } from 'react';

import { TimelineProps } from './Timeline';

const TimelineDescriptionItem: FC<
  Omit<TimelineProps, 'badgeLabel' | 'variant'>
> = ({ title, date, description }) => (
  <>
    <time className="mb-1 text-base font-normal leading-none text-slate-400">
      {date}
    </time>
    <h3 className="text-xl font-semibold text-cyan-500">{title}</h3>
    <div className="text-base font-normal text-slate-300">{description}</div>
  </>
);

export default TimelineDescriptionItem;
