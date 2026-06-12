import 'server-only';

import { client } from '../client';
import { EDUCATION_QUERY } from '../queries/education.query';

import { getSanityFetchOptions, SANITY_TAGS } from './sanity-fetch-options';

export async function getEducation() {
  return client.fetch(
    EDUCATION_QUERY,
    {},
    getSanityFetchOptions([SANITY_TAGS.education]),
  );
}
