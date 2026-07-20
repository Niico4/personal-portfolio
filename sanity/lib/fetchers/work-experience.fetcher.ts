import 'server-only';

import { client } from '../client';
import { WORK_EXPERIENCE_QUERY } from '../queries/work-experience.query';
import { WorkExperience } from '../types/work-experience.type';

import { getSanityFetchOptions } from './sanity-fetch-options';

export const getWorkExperience = (): Promise<WorkExperience[]> => {
  return client.fetch(WORK_EXPERIENCE_QUERY, {}, getSanityFetchOptions());
};
