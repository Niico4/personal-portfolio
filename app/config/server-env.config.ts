import { z } from 'zod';

const serverEnvSchema = z.object({
  database_url: z.string(),
  node_env: z.string().default('development'),
});

export const ServerEnvConfig = serverEnvSchema.parse({
  database_url: process.env.DATABASE_URL, // Database connection string, required
  node_env: process.env.NODE_ENV, // Defaults to 'development' if not set
});

export type ServerEnvConfigType = z.infer<typeof serverEnvSchema>;
