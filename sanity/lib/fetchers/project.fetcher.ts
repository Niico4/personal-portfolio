import 'server-only';

import { client } from '../client';
import {
  PROJECTS_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
} from '../queries/project.query';
import { ProjectInformationType } from '../types/project.type';

import { getSanityFetchOptions, SANITY_TAGS } from './sanity-fetch-options';

export const getProjects = (): Promise<ProjectInformationType[]> => {
  return client.fetch(
    PROJECTS_QUERY,
    {},
    getSanityFetchOptions([SANITY_TAGS.projects]),
  );
};

export const getProjectSlugs = () => {
  return client.fetch<{ slug: ProjectInformationType['slug'] }[]>(
    PROJECT_SLUGS_QUERY,
    {},
    getSanityFetchOptions([SANITY_TAGS.projects]),
  );
};

export const getProject = async (slug: ProjectInformationType['slug']) => {
  return client.fetch(
    PROJECT_QUERY,
    { slug },
    getSanityFetchOptions([SANITY_TAGS.project]),
  );
};
