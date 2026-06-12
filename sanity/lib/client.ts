import { createClient } from 'next-sanity';

import { PublicEnvConfig } from '@/config/public-env.config';
import { ServerEnvConfig } from '@/config/server-env.config';

export const client = createClient({
  projectId: PublicEnvConfig.sanity.project_id,
  dataset: PublicEnvConfig.sanity.dataset,
  apiVersion: PublicEnvConfig.sanity.api_version,
  token: ServerEnvConfig.sanity.api_read_token,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
