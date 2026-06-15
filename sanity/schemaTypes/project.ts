import { IconRocket } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

type SanityAssetField = {
  asset?: {
    _ref?: string;
  };
};

type ProjectStatus = 'published' | 'completed' | 'inDevelopment' | 'concept';

type ProjectDocument = {
  status?: ProjectStatus;
};

type ProjectLinks = {
  liveDemoUrl?: string;
  repositoryUrl?: string;
};

const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  published: 'Published',
  completed: 'Completed',
  inDevelopment: 'In development',
  concept: 'Concept',
};

const PROJECT_STATUSES_WITH_OPTIONAL_CONTENT: ProjectStatus[] = [
  'inDevelopment',
  'concept',
];

const PROJECT_STATUSES_WITH_REQUIRED_MEDIA: ProjectStatus[] = [
  'published',
  'completed',
];

const getProjectStatus = (document: unknown) =>
  (document as ProjectDocument | undefined)?.status;

const allowsOptionalContent = (document: unknown) => {
  const status = getProjectStatus(document);

  return (
    status !== undefined &&
    PROJECT_STATUSES_WITH_OPTIONAL_CONTENT.includes(status)
  );
};

const requiresMediaAndTechnologies = (document: unknown) => {
  const status = getProjectStatus(document);

  return (
    status !== undefined &&
    PROJECT_STATUSES_WITH_REQUIRED_MEDIA.includes(status)
  );
};

const isPublishedProject = (document: unknown) =>
  getProjectStatus(document) === 'published';

const hasAsset = (value: unknown) =>
  Boolean((value as SanityAssetField | undefined)?.asset?._ref);

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
    {
      name: 'settings',
      title: 'Settings',
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
      name: 'status',
      title: 'Project Status',
      type: 'string',
      group: 'main',
      description:
        'Defines the current state of the project. This status is shown in the portfolio and controls which fields are required.',
      options: {
        list: [
          {
            title: 'Published',
            value: 'published',
          },
          {
            title: 'Completed',
            value: 'completed',
          },
          {
            title: 'In Development',
            value: 'inDevelopment',
          },
          {
            title: 'Concept',
            value: 'concept',
          },
        ],
        layout: 'dropdown',
      },
      initialValue: 'completed',
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
            'Image used in the project card. Required only when the project is not in development.',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Short text describing the image for accessibility.',
              validation: (Rule) =>
                Rule.custom((altText, context) => {
                  const imageHasAsset = hasAsset(context.parent);

                  if (!imageHasAsset) return true;

                  if (!altText) {
                    return 'Alt text is required when a preview image is uploaded.';
                  }

                  return true;
                }),
            }),
          ],
          validation: (Rule) =>
            Rule.custom((image, context) => {
              if (!requiresMediaAndTechnologies(context.document)) return true;

              if (!hasAsset(image)) {
                return 'Preview image is required when the project is not in development.';
              }

              return true;
            }),
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
            'Main video shown in the project detail page. Required only when the project is not in development.',
          options: {
            accept: 'video/mp4,video/webm,video/quicktime',
          },
          validation: (Rule) =>
            Rule.custom((video, context) => {
              if (!requiresMediaAndTechnologies(context.document)) return true;

              if (!hasAsset(video)) {
                return 'Demo video is required when the project is not in development.';
              }

              return true;
            }),
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
        'Technologies shown as chips/badges. Required only when the project is not in development.',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.custom((technologies, context) => {
          if (!requiresMediaAndTechnologies(context.document)) return true;

          if (!Array.isArray(technologies) || technologies.length === 0) {
            return 'Add at least one technology for published or completed projects.';
          }

          return true;
        }),
    }),

    defineField({
      name: 'links',
      title: 'Project Links',
      type: 'object',
      group: 'links',
      description:
        'External project links used by the action buttons. Repository URL is required only when the project is not in development.',
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
        }),
      ],
      validation: (Rule) =>
        Rule.custom((links, context) => {
          if (allowsOptionalContent(context.document)) return true;

          const value = links as ProjectLinks | undefined;

          if (!value?.repositoryUrl) {
            return 'Repository URL is required for published or completed projects.';
          }

          if (isPublishedProject(context.document) && !value?.liveDemoUrl) {
            return 'Live demo URL is required when the project status is Published.';
          }

          return true;
        }),
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description:
        'Controls the order of this project in the portfolio. Lower numbers appear first.',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      shortDescription: 'preview.shortDescription',
      media: 'preview.image',
      status: 'status',
      displayOrder: 'displayOrder',
    },
    prepare({ title, shortDescription, media, status, displayOrder }) {
      const fallbackTitle = title ?? 'Untitled project';
      const fallbackDescription = shortDescription ?? 'No short description';

      const statusLabel =
        PROJECT_STATUS_LABELS[status as ProjectStatus] ?? 'No status';

      const order =
        typeof displayOrder === 'number' ? `Order ${displayOrder}` : 'No order';

      return {
        title: fallbackTitle,
        subtitle: `${order} · ${statusLabel} · ${fallbackDescription}`,
        media,
      };
    },
  },
});
