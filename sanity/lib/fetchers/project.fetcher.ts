import 'server-only';

import { client } from '../client';
import {
  PROJECTS_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
} from '../queries/project.query';
import { Project } from '../types/project.type';

import { getSanityFetchOptions } from './sanity-fetch-options';

export const getProjects = (): Promise<Project[]> => {
  return client.fetch(PROJECTS_QUERY, {}, getSanityFetchOptions());
};

export const getProjectSlugs = () => {
  return client.fetch<{ slug: Project['slug'] }[]>(
    PROJECT_SLUGS_QUERY,
    {},
    getSanityFetchOptions(),
  );
};

export const getProject = async (slug: Project['slug']) => {
  return client.fetch(PROJECT_QUERY, { slug }, getSanityFetchOptions());
};
