import 'server-only';

import { client } from '../client';
import { WORK_EXPERIENCE_QUERY } from '../queries/work-experience.query';
import { WorkExperienceInformationType } from '../types/work-experience.type';

import { getSanityFetchOptions, SANITY_TAGS } from './sanity-fetch-options';

export const getWorkExperience = (): Promise<
  WorkExperienceInformationType[]
> => {
  return client.fetch(
    WORK_EXPERIENCE_QUERY,
    {},
    getSanityFetchOptions([SANITY_TAGS.workExperience]),
  );
};
