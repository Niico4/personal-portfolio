import { z } from 'zod';

const publicEnvSchema = z.object({
  url_endpoint: z.string(),
  node_env: z.string().default('development'),
  sanity: z.object({
    project_id: z.string(),
    dataset: z.string(),
    api_version: z.string().default('2026-06-11'),
  }),
});

export const PublicEnvConfig = publicEnvSchema.parse({
  url_endpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT, // For image URL generation (cdn endpoint)
  node_env: process.env.NODE_ENV, // Defaults to 'development' if not set
  sanity: {
    project_id: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Sanity project ID, required
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Sanity dataset, required
    api_version: process.env.NEXT_PUBLIC_SANITY_API_VERSION, // Sanity API version, defaults to a specific date if not set
  },
});

export type PublicEnvConfigType = z.infer<typeof publicEnvSchema>;
