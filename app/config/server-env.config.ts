import { z } from 'zod';

const notionIdSchema = z
  .string()
  .trim()
  .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

const serverEnvSchema = z.object({
  deployment_env: z.enum(['development', 'preview', 'production']).optional(),
  node_env: z.string().default('development'),
  seo_indexing_enabled: z.stringbool(),
  notion: z.object({
    api_key: z.string().trim().min(1).optional(),
    notebooks_data_source_id: notionIdSchema.optional(),
    notes_data_source_id: notionIdSchema.optional(),
    topics_data_source_id: notionIdSchema.optional(),
  }),
  sanity: z.object({
    api_read_token: z.string(),
  }),
});

export const ServerEnvConfig = serverEnvSchema.parse({
  deployment_env: process.env.VERCEL_ENV,
  node_env: process.env.NODE_ENV,
  seo_indexing_enabled: process.env.SEO_INDEXING_ENABLED ?? false,
  notion: {
    api_key: process.env.NOTION_API_KEY,
    notebooks_data_source_id: process.env.NOTION_NOTEBOOKS_DATA_SOURCE_ID,
    notes_data_source_id: process.env.NOTION_NOTES_DATA_SOURCE_ID,
    topics_data_source_id: process.env.NOTION_TOPICS_DATA_SOURCE_ID,
  },
  sanity: {
    api_read_token: process.env.SANITY_API_READ_TOKEN,
  },
});

export type ServerEnvConfigType = z.infer<typeof serverEnvSchema>;
