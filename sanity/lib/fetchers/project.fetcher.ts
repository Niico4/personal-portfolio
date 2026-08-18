import 'server-only';

import { client } from '../client';
import {
  PROJECT_LIST_QUERY,
  PROJECT_BY_SLUG_QUERY,
} from '../queries/project.query';
import { ProjectType } from '../types/project.type';

import { getSanityFetchOptions } from './sanity-fetch-options';

export const getProjectList = (): Promise<ProjectType[]> => {
  return client.fetch(PROJECT_LIST_QUERY, {}, getSanityFetchOptions());
};

export const getProjectBySlug = async (slug: ProjectType['slug']) => {
  return client.fetch(PROJECT_BY_SLUG_QUERY, { slug }, getSanityFetchOptions());
};
