import { IconUserCircle } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

const EDUCATION_STATUS_OPTIONS = [
  {
    title: 'In Progress',
    value: 'inProgress',
  },
  {
    title: 'Completed',
    value: 'completed',
  },
  {
    title: 'On Hold',
    value: 'onHold',
  },
] as const;

export type EducationStatusType =
  (typeof EDUCATION_STATUS_OPTIONS)[number]['value'];

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: IconUserCircle,

  groups: [
    {
      name: 'identity',
      title: 'Overview',
      default: true,
    },
    {
      name: 'contact',
      title: 'Contact & Links',
    },
    {
      name: 'education',
      title: 'Education',
    },
  ],

  fields: [
    defineField({
      name: 'professionalTitle',
      title: 'Professional Title',
      type: 'string',
      group: 'identity',
      description:
        'The role shown next to your name. Example: Software Developer.',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .error('Enter a professional title between 2 and 80 characters.'),
    }),

    defineField({
      name: 'aboutMeDescription',
      title: 'Introduction',
      type: 'portableText',
      group: 'identity',
      description:
        'Main introduction shown in the portfolio. Keep it focused on your experience, what you do and how you work.',
      validation: (Rule) =>
        Rule.required().error('Add your profile introduction.'),
    }),

    defineField({
      name: 'resume',
      title: 'Resume / CV',
      type: 'object',
      group: 'contact',
      description:
        'Upload your resume or add a public link to show it in the portfolio.',
      fields: [
        defineField({
          name: 'file',
          title: 'Resume PDF',
          type: 'file',
          description: 'Upload the PDF version of your resume.',
          options: {
            accept: 'application/pdf',
          },
        }),

        defineField({
          name: 'externalUrl',
          title: 'External URL',
          type: 'url',
          description:
            'Public link to your resume if it is hosted somewhere else.',
        }),
      ],
      validation: (Rule) =>
        Rule.custom((resume) => {
          if (!resume) return true;

          const value = resume as {
            file?: unknown;
            externalUrl?: string;
          };

          if (!value.file && !value.externalUrl) {
            return 'Add a PDF or external URL, or remove the empty resume field.';
          }

          return true;
        }),
    }),

    defineField({
      name: 'contact',
      title: 'Contact & Social Links',
      type: 'object',
      group: 'contact',
      description: 'Email and professional profiles shown in the portfolio.',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          description: 'Public email visitors can use to contact you.',
          validation: (Rule) =>
            Rule.required()
              .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                name: 'valid email address',
                invert: false,
              })
              .error('Enter a valid email address.'),
        }),

        defineField({
          name: 'githubUrl',
          title: 'GitHub URL',
          type: 'url',
          description: 'Public link to your GitHub profile.',
        }),

        defineField({
          name: 'linkedinUrl',
          title: 'LinkedIn URL',
          type: 'url',
          description: 'Public link to your LinkedIn profile.',
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Add your contact information.'),
    }),

    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      group: 'education',
      description:
        'Education and training shown in the portfolio. Drag the items to change their display order.',
      of: [
        defineArrayMember({
          name: 'institution',
          title: 'Education Entry',
          type: 'object',

          fields: [
            defineField({
              name: 'academicTitle',
              title: 'Program / Qualification',
              type: 'string',
              description:
                'Name of the degree, program, course or certification.',
              validation: (Rule) =>
                Rule.min(2)
                  .max(150)
                  .error('Enter a program name under 150 characters.'),
            }),

            defineField({
              name: 'institutionName',
              title: 'Institution',
              type: 'string',
              description:
                'University, institution, academy or learning platform. Example: Udemy.',
              validation: (Rule) =>
                Rule.min(2)
                  .max(100)
                  .error('Enter an institution name under 100 characters.'),
            }),

            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              description:
                'When the program started. Use the first day of the month if only the month and year matter.',
              validation: (Rule) =>
                Rule.required().error('Enter the start date.'),
            }),

            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              description:
                'Choose the option that best describes the current state of this program.',
              options: {
                list: EDUCATION_STATUS_OPTIONS.map((value) => value),
                layout: 'dropdown',
              },
              initialValue: 'inProgress',
              validation: (Rule) =>
                Rule.required().error(
                  'Select the current status of this program.',
                ),
            }),

            defineField({
              name: 'endDate',
              title: 'End / Pause Date',
              type: 'date',
              description:
                'When the program ended or was paused. Leave empty while it is in progress.',
              hidden: ({ parent }) => parent?.status === 'inProgress',
              validation: (Rule) =>
                Rule.custom((endDate, { parent }) => {
                  const { startDate, status } = (parent ?? {}) as {
                    startDate?: string;
                    status?: EducationStatusType;
                  };

                  if (status === 'inProgress') {
                    if (endDate) {
                      return 'Remove the end date while the program is in progress.';
                    }

                    return true;
                  }

                  if (!endDate) {
                    return status === 'onHold'
                      ? 'Enter the date when the program was paused.'
                      : 'Enter the program end date.';
                  }

                  if (startDate && endDate < startDate) {
                    return 'The end date cannot be earlier than the start date.';
                  }

                  return true;
                }),
            }),

            defineField({
              name: 'details',
              title: 'Additional Details',
              type: 'text',
              rows: 2,
              description:
                'Extra context worth showing, such as the location or study format.',
            }),
          ],

          preview: {
            select: {
              academicTitle: 'academicTitle',
              institutionName: 'institutionName',
              status: 'status',
            },

            prepare({ academicTitle, institutionName, status }) {
              const statusLabel =
                EDUCATION_STATUS_OPTIONS.find(
                  (option) => option.value === status,
                )?.title ?? 'No status';

              return {
                title: academicTitle ?? 'Untitled education',
                subtitle: `${institutionName ?? 'No institution'} · ${statusLabel}`,
              };
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      professionalTitle: 'professionalTitle',
      location: 'location',
    },

    prepare({ professionalTitle, location }) {
      const details = [professionalTitle, location].filter(Boolean).join(' · ');

      return {
        title: 'Profile',
        subtitle: details || 'Profile information',
      };
    },
  },
});
