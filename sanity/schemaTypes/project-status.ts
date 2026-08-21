import { IconProgress } from '@tabler/icons-react';
import { defineField, defineType } from 'sanity';

export const projectStatusType = defineType({
  name: 'projectStatus',
  title: 'Project Status',
  type: 'document',
  icon: IconProgress,

  fields: [
    defineField({
      name: 'name',
      title: 'Status Name',
      type: 'string',
      description:
        'The name shown in the portfolio. Examples: Published, In Development or On Hold.',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(40)
          .error('Enter a status name between 2 and 40 characters.'),
    }),

    defineField({
      name: 'value',
      title: 'Status Value',
      type: 'slug',
      description:
        'Internal value used in the code. Generate it from the status name and only change it when needed.',
      options: {
        source: 'name',
        maxLength: 40,
      },
      validation: (Rule) =>
        Rule.required().error('Generate a value for this status.'),
    }),
  ],

  preview: {
    select: {
      title: 'name',
    },

    prepare({ title }) {
      return {
        title: title ?? 'Unnamed status',
      };
    },
  },
});
