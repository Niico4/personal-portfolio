import { defineArrayMember, defineField } from 'sanity';

interface AssetReference {
  asset?: {
    _ref?: string;
  };
}

interface ProjectStoryDocument {
  media?: {
    demoVideo?: AssetReference;
    gallery?: AssetReference[];
  };
  technologyGroups?: {
    technologies?: { _ref?: string }[];
  }[];
}

const SINGLETON_SECTIONS = new Set([
  'detailOverview',
  'detailVideo',
  'detailGallery',
  'detailTechnologies',
]);

const headingField = (description: string) =>
  defineField({
    name: 'title',
    title: 'Heading',
    type: 'string',
    description,
    validation: (Rule) => Rule.max(80),
  });

export const createProjectImageMember = () =>
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
  });

export const projectDetailSections = defineField({
  name: 'detailSections',
  title: 'Detail Page Sections',
  type: 'array',
  group: 'story',
  description:
    'Customize the reading order of the project. Leave empty to use the default order. Existing resources that are not explicitly placed are appended automatically.',

  of: [
    defineArrayMember({
      name: 'detailOverview',
      title: 'Overview',
      type: 'object',
      description: 'Places the Project Description in the reading order.',

      fields: [headingField('Optional. Defaults to “Sobre el proyecto”.')],

      preview: {
        select: { title: 'title' },
        prepare: ({ title }) => ({
          title: title || 'Overview',
          subtitle: 'Project Description',
        }),
      },
    }),

    defineArrayMember({
      name: 'detailText',
      title: 'Text',
      type: 'object',

      fields: [
        headingField('Optional. The text can appear without a heading.'),

        defineField({
          name: 'body',
          title: 'Body',
          type: 'richText',
          validation: (Rule) => Rule.required().min(1),
        }),
      ],

      preview: {
        select: { title: 'title' },
        prepare: ({ title }) => ({
          title: title || 'Text',
          subtitle: 'Rich text',
        }),
      },
    }),

    defineArrayMember({
      name: 'detailImageGroup',
      title: 'Image Group',
      type: 'object',
      description: 'A sequence of related screenshots or design previews.',

      fields: [
        headingField('Optional. Images can appear without a heading.'),

        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [createProjectImageMember()],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],

      preview: {
        select: {
          title: 'title',
          images: 'images',
        },
        prepare: ({ title, images }) => ({
          title: title || 'Image Group',
          subtitle: `${images?.length ?? 0} images`,
        }),
      },
    }),

    defineArrayMember({
      name: 'detailVideo',
      title: 'Video Showcase',
      type: 'object',
      description: 'Places the Video Showcase in the reading order.',

      fields: [headingField('Optional. Defaults to “El producto en uso”.')],

      preview: {
        select: { title: 'title' },
        prepare: ({ title }) => ({
          title: title || 'Video Showcase',
          subtitle: 'Media video',
        }),
      },

      validation: (Rule) =>
        Rule.custom((_, { document }) => {
          const project = document as ProjectStoryDocument | undefined;

          return project?.media?.demoVideo?.asset?._ref
            ? true
            : 'Add a Video Showcase in Media, or remove this section.';
        }).warning(),
    }),

    defineArrayMember({
      name: 'detailGallery',
      title: 'Image Gallery',
      type: 'object',
      description: 'Places the Image Gallery in the reading order.',

      fields: [
        headingField('Optional. Defaults to “Más vistas del producto”.'),
      ],

      preview: {
        select: { title: 'title' },
        prepare: ({ title }) => ({
          title: title || 'Image Gallery',
          subtitle: 'Media gallery',
        }),
      },

      validation: (Rule) =>
        Rule.custom((_, { document }) => {
          const project = document as ProjectStoryDocument | undefined;

          const hasImages = project?.media?.gallery?.some(
            (image) => image?.asset?._ref,
          );

          return hasImages
            ? true
            : 'Add an Image Gallery in Media, or remove this section.';
        }).warning(),
    }),

    defineArrayMember({
      name: 'detailTechnologies',
      title: 'Technologies',
      type: 'object',
      description: 'Places the Technology Groups in the reading order.',

      fields: [
        headingField('Optional. Defaults to “Tecnologías del proyecto”.'),
      ],

      preview: {
        select: { title: 'title' },
        prepare: ({ title }) => ({
          title: title || 'Technologies',
          subtitle: 'Technology Groups',
        }),
      },

      validation: (Rule) =>
        Rule.custom((_, { document }) => {
          const project = document as ProjectStoryDocument | undefined;

          const hasTechnologies = project?.technologyGroups?.some((group) =>
            group?.technologies?.some((technology) => technology?._ref),
          );

          return hasTechnologies
            ? true
            : 'Add Technology Groups, or remove this section.';
        }).warning(),
    }),
  ],

  validation: (Rule) =>
    Rule.custom((sections) => {
      if (!Array.isArray(sections)) return true;

      const seen = new Set<string>();

      for (const section of sections) {
        if (
          !section ||
          typeof section !== 'object' ||
          !('_type' in section) ||
          typeof section._type !== 'string'
        ) {
          continue;
        }

        const type = section._type;

        if (!SINGLETON_SECTIONS.has(type)) continue;

        if (seen.has(type)) {
          return 'Each resource section can only appear once.';
        }

        seen.add(type);
      }

      return true;
    }),
});
