import { IconRocket } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

type SanityAssetField = {
  asset?: {
    _ref?: string;
  };
};

const PROJECT_STATUS_OPTIONS = [
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
] as const;

type ProjectStatus = (typeof PROJECT_STATUS_OPTIONS)[number]['value'];

type ProjectDocument = {
  status?: ProjectStatus;
};

type ProjectLinks = {
  liveDemoUrl?: string;
};

const PROJECT_STATUSES_REQUIRING_IMAGE: readonly ProjectStatus[] = [
  'published',
  'completed',
];

const PROJECT_STATUSES_REQUIRING_TECHNOLOGIES: readonly ProjectStatus[] = [
  'published',
  'completed',
  'inDevelopment',
];

const getProjectStatus = (document: unknown): ProjectStatus | undefined =>
  (document as ProjectDocument | undefined)?.status;

const requiresPreviewImage = (document: unknown) => {
  const status = getProjectStatus(document);

  return status ? PROJECT_STATUSES_REQUIRING_IMAGE.includes(status) : false;
};

const requiresTechnologies = (document: unknown) => {
  const status = getProjectStatus(document);

  return status
    ? PROJECT_STATUSES_REQUIRING_TECHNOLOGIES.includes(status)
    : false;
};

const isPublishedProject = (document: unknown) =>
  getProjectStatus(document) === 'published';

const hasAsset = (value: unknown) =>
  Boolean((value as SanityAssetField | undefined)?.asset?._ref);

const getProjectStatusLabel = (status: unknown) =>
  PROJECT_STATUS_OPTIONS.find((option) => option.value === status)?.title ??
  'No status';

const truncatePreviewText = (value: string, maximumLength = 90): string => {
  if (value.length <= maximumLength) return value;

  return `${value.slice(0, maximumLength).trimEnd()}…`;
};

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: IconRocket,

  groups: [
    {
      name: 'overview',
      title: 'Project Overview',
      default: true,
    },
    {
      name: 'preview',
      title: 'Card Preview',
    },
    {
      name: 'detail',
      title: 'Project Story',
    },
    {
      name: 'technologies',
      title: 'Technology Stack',
    },
    {
      name: 'links',
      title: 'Project Links',
    },
    {
      name: 'settings',
      title: 'Display Settings',
    },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      group: 'overview',
      description:
        'Required. Public project name shown in cards, headings and the project detail page.',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100)
          .error('Add a project name between 2 and 100 characters.'),
    }),

    defineField({
      name: 'slug',
      title: 'Project URL Slug',
      type: 'slug',
      group: 'overview',
      description:
        'Required. Unique identifier used in the project detail page URL. Generate it from the project name and edit it only when necessary.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error('Generate a URL slug for this project.'),
    }),

    defineField({
      name: 'status',
      title: 'Current Project Status',
      type: 'string',
      group: 'overview',
      description:
        'Required. Published means the project is finished and publicly available. Completed means it is finished but may not be deployed. In Development means it is actively being built. Concept means it is still in research or design.',
      options: {
        list: PROJECT_STATUS_OPTIONS.map(({ title, value }) => ({
          title,
          value,
        })),
        layout: 'dropdown',
      },
      initialValue: 'inDevelopment',
      validation: (Rule) =>
        Rule.required().error('Select the current project status.'),
    }),

    defineField({
      name: 'preview',
      title: 'Card Preview Content',
      type: 'object',
      group: 'preview',
      description:
        'Required. Summary and visual used wherever the project appears as a card or featured item.',
      fields: [
        defineField({
          name: 'shortDescription',
          title: 'Short Description',
          type: 'text',
          rows: 3,
          description:
            'Required. Explain what the project is or what it helps the user do. Keep it concrete and under 220 characters.',
          validation: (Rule) =>
            Rule.required()
              .max(220)
              .error(
                'Add a short project description using no more than 220 characters.',
              ),
        }),

        defineField({
          name: 'image',
          title: 'Project Preview Image',
          type: 'image',
          description:
            'Main project visual used in cards and as the video poster. Required for Published and Completed projects. Optional while the project is still a concept or in development.',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description:
                'Required when an image is uploaded. Describe the relevant interface or content visible in the image, not the project name alone.',
              validation: (Rule) =>
                Rule.custom((altText, context) => {
                  if (!hasAsset(context.parent)) {
                    return true;
                  }

                  if (typeof altText !== 'string' || !altText.trim()) {
                    return 'Add alternative text for the uploaded preview image.';
                  }

                  if (altText.trim().length > 160) {
                    return 'Keep the alternative text under 160 characters.';
                  }

                  return true;
                }),
            }),
          ],
          validation: (Rule) =>
            Rule.custom((image, context) => {
              if (!requiresPreviewImage(context.document)) {
                return true;
              }

              if (!hasAsset(image)) {
                return 'Add a preview image for Published and Completed projects.';
              }

              return true;
            }),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Add the project card preview content.'),
    }),

    defineField({
      name: 'detail',
      title: 'Project Detail Content',
      type: 'object',
      group: 'detail',
      description:
        'Required. Detailed content used to explain the project beyond its card preview.',
      fields: [
        defineField({
          name: 'demoVideo',
          title: 'Demo Video',
          type: 'file',
          description:
            'Optional. Upload a short video that demonstrates the main project flow. Leave it empty when the project is better explained with images, text or a live demo.',
          options: {
            accept: 'video/mp4,video/webm,video/quicktime',
          },
        }),

        defineField({
          name: 'contentSections',
          title: 'Project Story Sections',
          type: 'array',
          description:
            'Required. Build the project story using independent sections. Drag them to control their order. The frontend generates the section numbers automatically.',
          of: [
            defineArrayMember({
              name: 'contentSection',
              title: 'Story Section',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Section Title',
                  type: 'string',
                  description:
                    'Required. Name that clearly introduces the section. Examples: De dónde nació, Cómo funciona, Construcción, Seguridad or Próximos pasos.',
                  validation: (Rule) =>
                    Rule.required()
                      .min(2)
                      .max(80)
                      .error(
                        'Add a section title between 2 and 80 characters.',
                      ),
                }),

                defineField({
                  name: 'content',
                  title: 'Section Content',
                  type: 'portableText',
                  description:
                    'Required. Explain this part of the project using paragraphs, lists, headings or links when they improve readability.',
                  validation: (Rule) =>
                    Rule.required().error(
                      'Add the content for this project section.',
                    ),
                }),
              ],

              preview: {
                select: {
                  title: 'title',
                },
                prepare({ title }) {
                  return {
                    title: title ?? 'Untitled section',
                  };
                },
              },
            }),
          ],
          validation: (Rule) =>
            Rule.required()
              .min(1)
              .error('Add at least one project story section.'),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Add the detailed content for this project.'),
    }),

    defineField({
      name: 'technologies',
      title: 'Tools and Technologies',
      type: 'array',
      group: 'technologies',
      description:
        'Technologies, platforms and tools used to build the project. Required for Published, Completed and In Development projects. Optional for concepts without a defined stack.',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.unique().custom((technologies, context) => {
          if (!requiresTechnologies(context.document)) {
            return true;
          }

          if (!Array.isArray(technologies) || technologies.length === 0) {
            return 'Add at least one technology for Published, Completed and In Development projects.';
          }

          const hasEmptyTechnology = technologies.some(
            (technology) =>
              typeof technology !== 'string' || !technology.trim(),
          );

          if (hasEmptyTechnology) {
            return 'Remove empty technology values.';
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
        'Optional external links displayed as project actions. Only add links that visitors are allowed to access.',
      fields: [
        defineField({
          name: 'liveDemoUrl',
          title: 'Live Project URL',
          type: 'url',
          description:
            'Required when the status is Published. Public URL where visitors can open, test or view the project.',
        }),

        defineField({
          name: 'repositoryUrl',
          title: 'Public Repository URL',
          type: 'url',
          description:
            'Optional. Public source-code repository. Leave empty for private, client or company repositories.',
        }),
      ],
      validation: (Rule) =>
        Rule.custom((links, context) => {
          if (!isPublishedProject(context.document)) {
            return true;
          }

          const value = links as ProjectLinks | undefined;

          if (!value?.liveDemoUrl) {
            return 'Add a live project URL when the status is Published.';
          }

          return true;
        }),
    }),

    defineField({
      name: 'displayOrder',
      title: 'Portfolio Display Order',
      type: 'number',
      group: 'settings',
      description:
        'Required. Controls the project position in the portfolio. Lower numbers appear first. Projects with the same number can be ordered by their last update date.',
      initialValue: 0,
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .error('Use a whole number equal to or greater than 0.'),
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
      const projectTitle = title ?? 'Untitled project';

      const description = truncatePreviewText(
        shortDescription ?? 'No short description',
      );

      const statusLabel = getProjectStatusLabel(status);

      const orderLabel =
        typeof displayOrder === 'number' ? `Order ${displayOrder}` : 'No order';

      return {
        title: projectTitle,
        subtitle: `${orderLabel} · ${statusLabel} · ${description}`,
        media,
      };
    },
  },
});
