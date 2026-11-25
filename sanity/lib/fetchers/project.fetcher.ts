import 'server-only';

import { cache } from 'react';

import { SANITY_TAGS, sanityFetch } from '../client';
import {
  PROJECT_DETAIL_QUERY,
  PROJECT_LIST_QUERY,
} from '../queries/project.query';
import type { ProjectType } from '../types/project.type';

export const getProjectList = (): Promise<ProjectType[]> => {
  return sanityFetch({
    query: PROJECT_LIST_QUERY,
    tags: [SANITY_TAGS.project, SANITY_TAGS.technology],
  });
};

export const getProjectBySlug = cache(
  (slug: string): Promise<ProjectType | null> => {
    return sanityFetch({
      query: PROJECT_DETAIL_QUERY,
      params: { slug },
      tags: [SANITY_TAGS.project, SANITY_TAGS.technology],
    });
  },
);
