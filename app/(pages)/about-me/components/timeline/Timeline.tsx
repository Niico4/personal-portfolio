import React, { FC, ReactNode } from 'react';

import TimelineBadgeItem from './BadgeItem';
import TimelineDescriptionItem from './DescriptionItem';

export interface TimelineProps {
  date: string;
  title: string;
  description?: ReactNode;
  badgeLabel?: string;
  variant: TimelineItemType;
}

export type TimelineItemType = 'description' | 'badge';

const Timeline: FC<TimelineProps> = ({
  title,
  date,
  description,
  badgeLabel,
  variant,
}) => {
  return (
    <ol className="relative border-s border-gray-200">
      <li className="ms-4">
        <div className="absolute w-3 h-3 bg-purple-400 rounded-full mt-1.5 -start-1.5 border border-purple-600"></div>

        {variant === 'description' && (
          <TimelineDescriptionItem
            title={title}
            date={date}
            description={description}
          />
        )}

        {variant === 'badge' && (
          <TimelineBadgeItem
            title={title}
            date={date}
            badgeLabel={badgeLabel}
          />
        )}
      </li>
    </ol>
  );
};

export default Timeline;
