import 'server-only';

import { client } from '../client';
import { WORK_EXPERIENCE_LIST_QUERY } from '../queries/work-experience.query';
import { WorkExperienceType } from '../types/work-experience.type';

import { getSanityFetchOptions } from './sanity-fetch-options';

export const getWorkExperience = (): Promise<WorkExperienceType[]> => {
  return client.fetch(WORK_EXPERIENCE_LIST_QUERY, {}, getSanityFetchOptions());
};
