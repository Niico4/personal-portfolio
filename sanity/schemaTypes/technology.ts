import { IconCode } from '@tabler/icons-react';
import { defineField, defineType } from 'sanity';

export const technologyType = defineType({
  name: 'technology',
  title: 'Technology / Tool',
  type: 'document',
  icon: IconCode,

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description:
        'The name shown in the portfolio. Examples: React, Next.js, Figma or PostgreSQL.',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(60)
          .error('Enter a name between 1 and 60 characters.'),
    }),
  ],

  preview: {
    select: {
      title: 'name',
    },

    prepare({ title }) {
      return {
        title: title ?? 'Unnamed technology',
      };
    },
  },
});
