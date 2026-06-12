import 'server-only';

import { client } from '../client';
import { WORK_EXPERIENCE_QUERY } from '../queries/work-experience.query';

import { getSanityFetchOptions, SANITY_TAGS } from './sanity-fetch-options';

export async function getWorkExperience() {
  return client.fetch(
    WORK_EXPERIENCE_QUERY,
    {},
    getSanityFetchOptions([SANITY_TAGS.workExperience]),
  );
}
