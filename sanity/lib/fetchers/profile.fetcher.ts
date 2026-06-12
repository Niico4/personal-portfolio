import 'server-only';
import { client } from '../client';
import { PROFILE_QUERY } from '../queries/profile.query';

import { getSanityFetchOptions, SANITY_TAGS } from './sanity-fetch-options';

export async function getProfile() {
  return client.fetch(
    PROFILE_QUERY,
    {},
    getSanityFetchOptions([SANITY_TAGS.profile]),
  );
}
