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
      name: 'media',
      title: 'Media',
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
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      group: 'overview',
      description:
        'The public name of the project. Used in cards, headings and metadata.',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'overview',
      description: 'Used in the project URL. Only change it when necessary.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'overview',
      rows: 3,
      description:
        'A short introduction used in project cards, page headers and metadata.',
      validation: (Rule) => Rule.required().max(220),
    }),

    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'richText',
      group: 'overview',
      description:
        'Explain the context, your contribution, the decisions you made and what you built.',
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'technologyGroups',
      title: 'Technology Groups',
      type: 'array',
      group: 'technologies',
      description:
        'Organize the technologies and tools used in the project into meaningful groups.',
      of: [
        defineArrayMember({
          name: 'technologyGroup',
          title: 'Technology Group',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Group Name',
              type: 'string',
              description:
                'Example: Frontend, Backend & Data, Design or Tools.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'technologies',
              title: 'Technologies',
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
              technologies: 'technologies',
            },

            prepare({ title, technologies }) {
              const count = technologies?.length ?? 0;

              return {
                title,
                subtitle: `${count} technologies`,
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
      group: 'media',
      description: 'Manage visual assets, project showcases and public links.',
      validation: (Rule) =>
        Rule.required().custom((media) => {
          const value = media as
            | {
                demoVideo?: {
                  asset?: {
                    _ref?: string;
                  };
                };
                gallery?: unknown[];
              }
            | undefined;

          if (value?.demoVideo?.asset?._ref && value.gallery?.length) {
            return 'Choose either a demo video or an image gallery, not both.';
          }

          return true;
        }),

      fields: [
        defineField({
          name: 'cover',
          title: 'Cover Image',
          type: 'image',
          description: 'Main image used in project cards and social previews.',
          validation: (Rule) => Rule.required().assetRequired(),
        }),

        defineField({
          name: 'icon',
          title: 'Project Icon',
          type: 'image',
          description:
            'Optional project icon, preferably with a transparent background.',
        }),

        defineField({
          name: 'demoVideo',
          title: 'Video Showcase',
          type: 'file',
          description:
            'Upload a video showcasing the project. Use this instead of an image gallery.',
          options: {
            accept: 'video/mp4,video/webm',
          },
        }),

        defineField({
          name: 'gallery',
          title: 'Image Gallery',
          type: 'array',
          description:
            'Upload screenshots or design previews in the order they should appear.',
          of: [
            defineArrayMember({
              type: 'image',
              options: {
                hotspot: true,
              },

              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                  description: 'Describe what the screenshot or design shows.',
                  validation: (Rule) => Rule.required(),
                }),

                defineField({
                  name: 'caption',
                  title: 'Caption',
                  type: 'string',
                  description: 'Optional context about the screen or feature.',
                }),
              ],

              validation: (Rule) => Rule.required().assetRequired(),
            }),
          ],
        }),

        defineField({
          name: 'liveDemoUrl',
          title: 'Live URL',
          type: 'url',
          description: 'Public URL where visitors can explore the project.',
        }),

        defineField({
          name: 'repositoryUrl',
          title: 'Repository URL',
          type: 'url',
          description: 'Public repository containing the project source code.',
        }),

        defineField({
          name: 'figmaUrl',
          title: 'Figma URL',
          type: 'url',
          description:
            'Public link to the Figma design or interactive prototype.',
        }),
      ],
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description:
        'Controls the order in which projects appear in the portfolio.',
      initialValue: 1,
      validation: (Rule) => Rule.required().integer().min(1),
    }),

    defineField({
      name: 'isVisible',
      title: 'Show in Portfolio',
      type: 'boolean',
      group: 'settings',
      description: 'Controls whether the project is publicly visible.',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isVisible: 'isVisible',
      icon: 'media.icon',
      cover: 'media.cover',
    },

    prepare({ title, isVisible, icon, cover }) {
      return {
        title: title ?? 'Untitled project',
        subtitle: isVisible ? 'Visible' : 'Hidden',
        media: icon ?? cover,
      };
    },
  },
});
