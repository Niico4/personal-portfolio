import 'server-only';

import { cache } from 'react';

import { SANITY_TAGS, sanityFetch } from '../client';
import {
  PROJECT_DETAIL_QUERY,
  PROJECT_LIST_QUERY,
} from '../queries/project.query';
import type { ProjectDetailType, ProjectListItem } from '../types/project.type';

export const getProjectList = (): Promise<ProjectListItem[]> => {
  return sanityFetch({
    query: PROJECT_LIST_QUERY,
    tags: [SANITY_TAGS.project],
  });
};

export const getProjectDetailBySlug = cache(
  (slug: string): Promise<ProjectDetailType | null> => {
    return sanityFetch({
      query: PROJECT_DETAIL_QUERY,
      params: { slug },
      tags: [SANITY_TAGS.project, SANITY_TAGS.technology],
    });
  },
);
