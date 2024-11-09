import { FC } from 'react';
import { IconLink } from '@tabler/icons-react';
import { Chip } from '@nextui-org/react';

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
      <time className="mb-1 text-base font-normal leading-none text-slate-400">
        {date}
      </time>
      <Chip radius="sm" className="mb-2 text-slate-200" variant="flat">
        {badgeLabel}
      </Chip>
    </div>
  </>
);

export default TimelineBadgeItem;
