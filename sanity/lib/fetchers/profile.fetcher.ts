import 'server-only';

import { SANITY_TAGS, sanityFetch } from '../client';
import { PROFILE_QUERY } from '../queries/profile.query';
import type { ProfileType } from '../types/profile.type';

export const getProfile = (): Promise<ProfileType> => {
  return sanityFetch({
    query: PROFILE_QUERY,
    tags: [SANITY_TAGS.profile],
  });
};
