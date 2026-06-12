import { defineField, defineType } from 'sanity';

export const educationType = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',

  fields: [
    defineField({
      name: 'academicTitle',
      title: 'Academic Title',
      type: 'string',
      description: 'Academic title or program name.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'institutionName',
      title: 'Institution Name',
      type: 'string',
      description: 'Name of the institution, academy or platform.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'institutionLogo',
      title: 'Institution Logo',
      type: 'image',
      description: 'Logo or icon shown next to the institution name.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Short description of the logo for accessibility.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description:
        'Date when this education started. Use the first day of the month if only month/year matters.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description:
        'Date when this education ended. Leave empty only if you are currently studying it.',
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const parent = context.parent as {
            startDate?: string;
            isCurrentlyStudying?: boolean;
          };

          if (parent?.isCurrentlyStudying) return true;

          if (!endDate) {
            return 'End date is required when this education is not currently active.';
          }

          if (
            parent?.startDate &&
            new Date(endDate) < new Date(parent.startDate)
          ) {
            return 'End date must be after the start date.';
          }

          return true;
        }),
    }),

    defineField({
      name: 'isCurrentlyStudying',
      title: 'Is Currently Studying?',
      type: 'boolean',
      description:
        'Enable this if you are currently studying this program. The end date can be empty in that case.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'credential',
      title: 'Credential',
      type: 'object',
      description:
        'Optional certificate, diploma or verification reference for this education.',
      fields: [
        defineField({
          name: 'credentialFile',
          title: 'Credential File',
          type: 'file',
          description:
            'Upload a certificate or diploma file directly to Sanity. Recommended for PDF or image files.',
          options: {
            accept: 'application/pdf',
          },
        }),

        defineField({
          name: 'credentialUrl',
          title: 'Credential URL',
          type: 'url',
          description:
            'External verification or certificate URL. Example: Drive, official institution page, etc.',
        }),
      ],
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description:
        'Controls the order of this education item in the portfolio. Lower numbers appear first.',
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'academicTitle',
      institutionName: 'institutionName',
      institutionLogo: 'institutionLogo',
      isCurrentlyStudying: 'isCurrentlyStudying',
      endDate: 'endDate',
    },
    prepare({
      title,
      institutionName,
      institutionLogo,
      isCurrentlyStudying,
      endDate,
    }) {
      return {
        title,
        subtitle: `${institutionName ?? 'No institution'} · ${
          isCurrentlyStudying ? 'Currently studying' : (endDate ?? 'Completed')
        }`,
        media: institutionLogo,
      };
    },
  },
});
