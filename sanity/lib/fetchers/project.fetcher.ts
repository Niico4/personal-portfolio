import 'server-only';

import { sanityFetch } from '../client';
import { PROJECT_LIST_QUERY } from '../queries/project.query';
import { ProjectType } from '../types/project.type';

export const getProjectList = (): Promise<ProjectType[]> => {
  return sanityFetch({
    query: PROJECT_LIST_QUERY,
    tags: ['project', 'technology', 'projectStatus'],
  });
};
