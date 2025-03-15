import React, { FC } from 'react';

import { ProfileDetailProps } from '../types/profile';

const ProfileInfoItem: FC<ProfileDetailProps> = ({ icon: Icon, label }) => (
  <li className="flex items-center text-sm font-medium text-muted gap-2">
    <Icon color="#7cc1fd" size={20} />
    {label}
  </li>
);

export default ProfileInfoItem;
