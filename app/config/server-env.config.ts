import { z } from 'zod';

const serverEnvSchema = z.object({
  deployment_env: z.enum(['development', 'preview', 'production']).optional(),
  node_env: z.string().default('development'),
  seo_indexing_enabled: z.stringbool(),
  sanity: z.object({
    api_read_token: z.string(),
    revalidate_secret: z.string(),
  }),
});

export const ServerEnvConfig = serverEnvSchema.parse({
  deployment_env: process.env.VERCEL_ENV,
  node_env: process.env.NODE_ENV,
  seo_indexing_enabled: process.env.SEO_INDEXING_ENABLED ?? false,
  sanity: {
    api_read_token: process.env.SANITY_API_READ_TOKEN,
    revalidate_secret: process.env.SANITY_REVALIDATE_SECRET,
  },
});

export type ServerEnvConfigType = z.infer<typeof serverEnvSchema>;
