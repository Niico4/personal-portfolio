import 'server-only';
import { sanityFetch } from '../client';
import { PROFILE_QUERY } from '../queries/profile.query';
import { ProfileType } from '../types/profile.type';

export const getProfile = (): Promise<ProfileType> => {
  return sanityFetch({
    query: PROFILE_QUERY,
    tags: ['profile'],
  });
};
