import { IconCode } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: IconCode,

  groups: [
    {
      name: 'overview',
      title: 'Overview',
      default: true,
    },
    {
      name: 'technologies',
      title: 'Technologies & Tools',
    },
    {
      name: 'links',
      title: 'Links & Media',
    },
    {
      name: 'settings',
      title: 'Display',
    },
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [
        {
          field: 'displayOrder',
          direction: 'asc',
        },
      ],
    },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      group: 'overview',
      description:
        'The public name of the project. Used in cards, headings and the project page.',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100)
          .error('Enter a project name between 2 and 100 characters long.'),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'overview',
      description:
        'Used in the project URL. Generate it from the project name and only change it when needed.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error('Generate a URL slug for this project.'),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'reference',
      group: 'overview',
      to: [{ type: 'projectStatus' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'overview',
      rows: 3,
      description:
        'A quick explanation of what the project does. This is shown before opening the full project details.',
      validation: (Rule) =>
        Rule.required()
          .max(220)
          .error('Keep the short description under 220 characters.'),
    }),

    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      group: 'overview',
      description:
        'Briefly explain what the project does, why it exist or the context needed to understand it.',
      validation: (Rule) =>
        Rule.required().error('Add a description of this project.'),
    }),

    defineField({
      name: 'features',
      title: 'Key Highlights',
      type: 'array',
      group: 'overview',
      description:
        'Add the most relevant details about the project. Focus on things that help explain what makes it useful or interesting.',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(6)
          .error('Add between 1 and 6 project highlights.'),
    }),

    defineField({
      name: 'technologies',
      title: 'Technologies & Tools',
      type: 'array',
      group: 'technologies',
      description:
        'Technologies, tools and platforms used in the project. Optional when the project is still a concept and the stack has not been decided.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'technology' }],
        }),
      ],

      validation: (Rule) => Rule.unique(),
    }),

    defineField({
      name: 'links',
      title: 'Links & Media',
      type: 'object',
      group: 'links',
      description:
        'Add only the links or media that visitors are allowed to access.',
      fields: [
        defineField({
          name: 'demoVideo',
          title: 'Demo Video',
          type: 'file',
          description:
            'Optional. Upload a short video showing the project in use.',
          options: {
            accept: 'video/mp4,video/webm,video/quicktime',
          },
        }),

        defineField({
          name: 'liveDemoUrl',
          title: 'Live URL',
          type: 'url',
          description:
            'Public URL where visitors can open or test the project. Required when the project is published.',
        }),

        defineField({
          name: 'repositoryUrl',
          title: 'Repository URL',
          type: 'url',
          description:
            'Optional. Add it only when the source code is publicly available.',
        }),
      ],
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description:
        'Controls where the project appears in the portfolio. Lower numbers appear first.',
      initialValue: 1,
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .error('Enter a whole number of 1 or higher'),
    }),

    defineField({
      name: 'isVisible',
      title: 'Show in Portfolio',
      type: 'boolean',
      group: 'settings',
      description:
        'Turn this off to keep the project in the CMS without making it visible on the website.',
      initialValue: true,
      validation: (Rule) =>
        Rule.required().error(
          'Choose whether to show this project in the portfolio.',
        ),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      status: 'status.name',
      isVisible: 'isVisible',
    },

    prepare({ title, status, isVisible }) {
      const projectTitle = title ?? 'Untitled project';

      return {
        title: projectTitle,
        subtitle: `${status} · ${isVisible ? 'Visible' : 'Hidden'}`,
      };
    },
  },
});
