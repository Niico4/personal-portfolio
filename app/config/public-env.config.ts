import { z } from 'zod';

const publicEnvSchema = z.object({
  site_url: z.url(),
  sanity: z.object({
    project_id: z.string(),
    dataset: z.string(),
    api_version: z.string().default('2026-06-11'),
  }),
});

export const PublicEnvConfig = publicEnvSchema.parse({
  site_url: process.env.NEXT_PUBLIC_SITE_URL,
  sanity: {
    project_id: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    api_version: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  },
});

export type PublicEnvConfigType = z.infer<typeof publicEnvSchema>;
