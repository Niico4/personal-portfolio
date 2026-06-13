import 'server-only';

import { client } from '../client';
import { EDUCATION_QUERY } from '../queries/education.query';
import { EducationInformationType } from '../types/education.type';

import { getSanityFetchOptions, SANITY_TAGS } from './sanity-fetch-options';

export const getEducation = (): Promise<EducationInformationType[]> => {
  return client.fetch(
    EDUCATION_QUERY,
    {},
    getSanityFetchOptions([SANITY_TAGS.education]),
  );
};
