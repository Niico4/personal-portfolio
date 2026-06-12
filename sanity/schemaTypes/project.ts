import { IconRocket } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: IconRocket,

  groups: [
    {
      name: 'main',
      title: 'Main',
      default: true,
    },
    {
      name: 'preview',
      title: 'Preview',
    },
    {
      name: 'detail',
      title: 'Detail',
    },
    {
      name: 'technologies',
      title: 'Technologies',
    },
    {
      name: 'links',
      title: 'Links',
    },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'main',
      description:
        'The project name shown in the project detail page and preview card.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Project Slug',
      type: 'slug',
      group: 'main',
      description: 'URL identifier for the project detail page.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isInDevelopment',
      title: 'Is In Development',
      type: 'boolean',
      group: 'main',
      description: 'Enable this if the project is still under development.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'preview',
      title: 'Project Preview',
      type: 'object',
      group: 'preview',
      description: 'Content used in project cards and preview sections.',
      fields: [
        defineField({
          name: 'shortDescription',
          title: 'Short Description',
          type: 'text',
          rows: 3,
          description:
            'Short description shown in the project card. Keep it clear and ideally under 220 characters.',
          validation: (Rule) => Rule.required().max(220),
        }),

        defineField({
          name: 'image',
          title: 'Preview Image',
          type: 'image',
          description:
            'Image used in the project card. This is different from the demo video.',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Short text describing the image for accessibility.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'detail',
      title: 'Project Detail',
      type: 'object',
      group: 'detail',
      description: 'Content used inside the project detail page.',
      fields: [
        defineField({
          name: 'originDescription',
          title: 'Origin Description',
          type: 'text',
          rows: 4,
          description:
            'Short text explaining the problem or context where the project was born.',
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: 'demoVideo',
          title: 'Demo Video',
          type: 'file',
          description:
            'Main video shown in the project detail page to demonstrate how the app works.',
          options: {
            accept: 'video/mp4,video/webm,video/quicktime',
          },
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: 'description',
          title: 'Project Description',
          type: 'text',
          rows: 7,
          description:
            'Main project description: how it was designed, built, and what technologies or architecture were used.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      group: 'technologies',
      description:
        'Technologies shown as chips/badges in the project detail page.',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'links',
      title: 'Project Links',
      type: 'object',
      group: 'links',
      description: 'External project links used by the action buttons.',
      fields: [
        defineField({
          name: 'liveDemoUrl',
          title: 'Live Demo URL',
          type: 'url',
          description: 'Public demo or deployed project URL.',
        }),

        defineField({
          name: 'repositoryUrl',
          title: 'Repository URL',
          type: 'url',
          description: 'GitHub repository URL.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      shortDescription: 'preview.shortDescription',
      media: 'preview.image',
      isInDevelopment: 'isInDevelopment',
    },
    prepare({ title, shortDescription, media, isInDevelopment }) {
      return {
        title,
        subtitle: isInDevelopment
          ? `In development · ${shortDescription}`
          : shortDescription,
        media,
      };
    },
  },
});
