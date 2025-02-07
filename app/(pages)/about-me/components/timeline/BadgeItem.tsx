import { FC } from 'react';
import { Chip } from '@heroui/chip';
import { IconLink } from '@tabler/icons-react';

import { TimelineProps } from './Timeline';

const TimelineBadgeItem: FC<Omit<TimelineProps, 'description' | 'variant'>> = ({
  date,
  title,
  badgeLabel,
}) => (
  <>
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-purple-500">{title}</h3>
      <IconLink color="#c2c2c2" />
    </div>
    <div className="flex flex-col gap-2">
      <time className="timeline-time">{date}</time>
      <Chip radius="sm" className="mb-2 text-slate-200" variant="flat">
        {badgeLabel}
      </Chip>
    </div>
  </>
);

export default TimelineBadgeItem;
