import { createClient, type QueryParams } from 'next-sanity';

import { PublicEnvConfig } from '@/config/public-env.config';
import { ServerEnvConfig } from '@/config/server-env.config';

export const SANITY_TAGS = {
  profile: 'profile',
  projects: 'project',
  technology: 'technology',
  projectStatus: 'projectStatus',
  workExperience: 'workExperience',
} as const;

export const client = createClient({
  projectId: PublicEnvConfig.sanity.project_id,
  dataset: PublicEnvConfig.sanity.dataset,
  apiVersion: PublicEnvConfig.sanity.api_version,
  token: ServerEnvConfig.sanity.api_read_token,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
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
