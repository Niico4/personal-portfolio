import 'server-only';

import { client } from '../client';
import {
  PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
} from '../queries/project.query';

import { getSanityFetchOptions, SANITY_TAGS } from './sanity-fetch-options';

export async function getProjects() {
  return client.fetch(
    PROJECTS_QUERY,
    {},
    getSanityFetchOptions([SANITY_TAGS.projects]),
  );
}

export async function getProjectBySlug(slug: string) {
  if (!slug) return null;

  return client.fetch(
    PROJECT_BY_SLUG_QUERY,
    { slug },
    getSanityFetchOptions([
      SANITY_TAGS.projects,
      SANITY_TAGS.project,
      `${SANITY_TAGS.project}:${slug}`,
    ]),
  );
}

export async function getProjectSlugs() {
  return client.fetch(
    PROJECT_SLUGS_QUERY,
    {},
    getSanityFetchOptions([SANITY_TAGS.projects]),
  );
}
