import React, { FC } from 'react';

import { ProfileDetailProps } from '../types/profile';

const ProfileInfoItem: FC<ProfileDetailProps> = ({ icon: Icon, label }) => (
  <li className="flex items-center text-sm font-medium text-soft gap-2 tracking-wide">
    <Icon color="#99c3e1" size={20} />
    {label}
  </li>
);

export default ProfileInfoItem;
