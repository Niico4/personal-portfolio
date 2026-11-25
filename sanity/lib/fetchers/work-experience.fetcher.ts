import 'server-only';

import { SANITY_TAGS, sanityFetch } from '../client';
import { WORK_EXPERIENCE_LIST_QUERY } from '../queries/work-experience.query';
import type { WorkExperienceType } from '../types/work-experience.type';

export const getWorkExperience = (): Promise<WorkExperienceType[]> => {
  return sanityFetch({
    query: WORK_EXPERIENCE_LIST_QUERY,
    tags: [SANITY_TAGS.workExperience],
  });
};
