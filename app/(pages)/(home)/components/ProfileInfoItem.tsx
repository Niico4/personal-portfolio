import React, { FC } from 'react';

import { ProfileDetailProps } from '../types/profile';

const ProfileInfoItem: FC<ProfileDetailProps> = ({ icon: Icon, label }) => (
  <li className="flex-center gap-1 ">
    <Icon className="text-primary-400" size={18} />
    <span className="text-sm font-medium text-soft/85 tracking-wide">
      {label}
    </span>
  </li>
);

export default ProfileInfoItem;
