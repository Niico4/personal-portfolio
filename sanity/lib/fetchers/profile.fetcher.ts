import 'server-only';
import { client } from '../client';
import { PROFILE_QUERY } from '../queries/profile.query';
import { ProfileType } from '../types/profile.type';

import { getSanityFetchOptions } from './sanity-fetch-options';

export const getProfile = (): Promise<ProfileType> => {
  return client.fetch(PROFILE_QUERY, {}, getSanityFetchOptions());
};
