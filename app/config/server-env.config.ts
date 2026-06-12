import { z } from 'zod';

const serverEnvSchema = z.object({
  database_url: z.string(),
  node_env: z.string().default('development'),
  sanity: z.object({
    api_read_token: z.string(),
  }),
});

export const ServerEnvConfig = serverEnvSchema.parse({
  database_url: process.env.DATABASE_URL, // Database connection string, required
  node_env: process.env.NODE_ENV, // Defaults to 'development' if not set
  sanity: {
    api_read_token: process.env.SANITY_API_READ_TOKEN, // Sanity API read token, required
  },
});

export type ServerEnvConfigType = z.infer<typeof serverEnvSchema>;
