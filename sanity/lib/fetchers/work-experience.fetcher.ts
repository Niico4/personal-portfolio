import 'server-only';

import { WORK_EXPERIENCE_LIST_QUERY } from '../queries/work-experience.query';
import { WorkExperienceType } from '../types/work-experience.type';
import { sanityFetch } from '../client';

export const getWorkExperience = (): Promise<WorkExperienceType[]> => {
  return sanityFetch({
    query: WORK_EXPERIENCE_LIST_QUERY,
    tags: ['workExperience'],
  });
};
