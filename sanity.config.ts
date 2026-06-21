'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { PublicEnvConfig } from '@/config/public-env.config';

import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/studio-content-structure';

const singletonTypes = new Set(['profile']);

const allowedSingletonActions = new Set([
  'publish',
  'discardChanges',
  'restore',
]);

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',

  basePath: '/studio',
  projectId: PublicEnvConfig.sanity.project_id,
  dataset: PublicEnvConfig.sanity.dataset,

  schema: {
    types: schema.types,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (previousActions, context) => {
      if (!singletonTypes.has(context.schemaType)) {
        return previousActions;
      }

      return previousActions.filter(
        ({ action }) => action && allowedSingletonActions.has(action),
      );
    },
  },

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: PublicEnvConfig.sanity.api_version }),
  ],
});
