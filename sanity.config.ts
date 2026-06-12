'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/studioContentStructure';

import { PublicEnvConfig } from '@/config/public-env.config';

const singletonTypes = new Set(['profile']);

export default defineConfig({
  basePath: '/studio',
  projectId: PublicEnvConfig.sanity.project_id,
  dataset: PublicEnvConfig.sanity.dataset,
  schema: {
    types: schema.types,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)), // Filter out singleton types from the "New document" options
  },
  plugins: [
    structureTool({ structure }),
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: PublicEnvConfig.sanity.api_version }),
  ],
});
