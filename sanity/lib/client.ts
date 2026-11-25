import 'server-only';

import { createClient, type QueryParams } from 'next-sanity';

import { PublicEnvConfig } from '@/config/public-env.config';
import { ServerEnvConfig } from '@/config/server-env.config';

export const SANITY_TAGS = {
  profile: 'profile',
  project: 'project',
  technology: 'technology',
  workExperience: 'workExperience',
  skills: 'skills',
} as const;

export const client = createClient({
  projectId: PublicEnvConfig.sanity.project_id,
  dataset: PublicEnvConfig.sanity.dataset,
  apiVersion: PublicEnvConfig.sanity.api_version,
  token: ServerEnvConfig.sanity.api_read_token,
  perspective: 'published',
  useCdn: false,
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: false,
      tags,
    },
  });
}
