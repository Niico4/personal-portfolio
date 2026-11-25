import { IconLayoutList } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const skillsType = defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  icon: IconLayoutList,

  fields: [
    defineField({
      name: 'groups',
      title: 'Skill Groups',
      type: 'array',
      description:
        'Organize the technologies and tools displayed on the portfolio homepage.',
      of: [
        defineArrayMember({
          name: 'skillGroup',
          title: 'Skill Group',
          type: 'object',

          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'Examples: Frontend, Backend & Data or Tools.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'technologies',
              title: 'Technologies & Tools',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'reference',
                  to: [{ type: 'technology' }],
                }),
              ],
              validation: (Rule) => Rule.required().min(1).unique(),
            }),
          ],

          preview: {
            select: {
              title: 'name',
            },
          },
        }),
      ],

      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Skills',
        subtitle: 'Portfolio technologies and tools',
      };
    },
  },
});
