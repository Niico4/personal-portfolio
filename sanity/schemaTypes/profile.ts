import { IconUserCircle } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: IconUserCircle,

  groups: [
    {
      name: 'identity',
      title: 'Profile Overview',
      default: true,
    },
    {
      name: 'contact',
      title: 'Contact & Links',
    },
    {
      name: 'techSkills',
      title: 'Technical Skills',
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
        'Required. Main professional role shown near your name. Example: Full Stack Developer.',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .error('Add a professional title between 2 and 80 characters.'),
    }),

    defineField({
      name: 'aboutMeDescription',
      title: 'About Me',
      type: 'portableText',
      group: 'identity',
      description:
        'Required. Main introduction shown in the hero. Explain your experience, professional focus and the kind of products you build.',
      validation: (Rule) =>
        Rule.required().error('Add the main profile introduction.'),
    }),

    defineField({
      name: 'rightNowIAm',
      title: 'Current Focus',
      type: 'portableText',
      group: 'identity',
      description:
        'Optional. Short update about what you are currently building, learning or focusing on. Leave empty when there is nothing relevant to show.',
    }),

    defineField({
      name: 'isAvailable',
      title: 'Available for Opportunities',
      type: 'boolean',
      group: 'identity',
      description:
        'Required. Controls whether the portfolio shows that you are currently open to work or new professional opportunities.',
      initialValue: true,
      validation: (Rule) =>
        Rule.required().error('Specify your current availability.'),
    }),

    defineField({
      name: 'location',
      title: 'Current Location',
      type: 'string',
      group: 'identity',
      description:
        'Optional. City and country shown in the portfolio. Leave empty if you prefer not to publish your location. Example: Bogotá D.C., Colombia.',
      validation: (Rule) =>
        Rule.max(100).warning('Keep the location under 100 characters.'),
    }),

    defineField({
      name: 'resume',
      title: 'Resume / CV',
      type: 'object',
      group: 'contact',
      description:
        'Optional. Add a PDF file or an external URL to display the resume action in the portfolio.',
      fields: [
        defineField({
          name: 'file',
          title: 'PDF File',
          type: 'file',
          description:
            'Optional. Upload the resume directly to Sanity. Use a PDF file intended for public access.',
          options: {
            accept: 'application/pdf',
          },
        }),

        defineField({
          name: 'externalUrl',
          title: 'External URL',
          type: 'url',
          description:
            'Optional. Public link to the resume hosted elsewhere, such as Google Drive or Notion.',
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
            return 'Add a PDF file or an external URL, or remove the empty resume field.';
          }

          return true;
        }),
    }),

    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      group: 'contact',
      description:
        'Required. Main contact channel and optional professional profiles shown in the portfolio.',
      fields: [
        defineField({
          name: 'email',
          title: 'Contact Email',
          type: 'string',
          description:
            'Required. Public email visitors and recruiters can use to contact you.',
          validation: (Rule) =>
            Rule.required()
              .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                name: 'valid email address',
                invert: false,
              })
              .error('Add a valid contact email address.'),
        }),

        defineField({
          name: 'githubUrl',
          title: 'GitHub Profile URL',
          type: 'url',
          description:
            'Optional. Public GitHub profile. Leave empty if GitHub should not appear in the portfolio.',
        }),

        defineField({
          name: 'linkedinUrl',
          title: 'LinkedIn Profile URL',
          type: 'url',
          description:
            'Optional. Public LinkedIn profile. Leave empty if LinkedIn should not appear in the portfolio.',
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Add the profile contact information.'),
    }),

    defineField({
      name: 'techSkills',
      title: 'Technical Skills',
      type: 'array',
      group: 'techSkills',
      description:
        'Required. Core technologies shown in the skills section. Drag the items to control the order in which they appear.',
      of: [
        defineArrayMember({
          name: 'skill',
          title: 'Technical Skill',
          type: 'object',

          fields: [
            defineField({
              name: 'name',
              title: 'Display Name',
              type: 'string',
              description:
                'Required. Technology name displayed in the portfolio. Example: React, Next.js or PostgreSQL.',
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .max(50)
                  .error('Add a skill name under 50 characters.'),
            }),

            defineField({
              name: 'iconKey',
              title: 'Icon Key',
              type: 'string',
              description:
                'Optional. Internal key used by the frontend to find a matching icon. Use lowercase letters and numbers without spaces or symbols. Example: Next.js → nextjs. Leave empty to use the default icon.',
              validation: (Rule) =>
                Rule.regex(/^[a-z0-9]+$/, {
                  name: 'lowercase key without spaces or symbols',
                  invert: false,
                }).error(
                  'Use only lowercase letters and numbers, without spaces or symbols.',
                ),
            }),
          ],

          preview: {
            select: {
              name: 'name',
              iconKey: 'iconKey',
            },
            prepare({ name, iconKey }) {
              return {
                title: name ?? 'Unnamed skill',
                subtitle: iconKey
                  ? `Icon key: ${iconKey}`
                  : 'Uses the default icon',
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Add at least one technical skill.'),
    }),

    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      group: 'education',
      description:
        'Optional. Formal education, courses or professional training shown in the portfolio. Drag the items to control their display order.',
      of: [
        defineArrayMember({
          name: 'institution',
          title: 'Education Item',
          type: 'object',

          fields: [
            defineField({
              name: 'academicTitle',
              title: 'Program or Academic Title',
              type: 'string',
              description:
                'Required. Name of the degree, program, course or certification. Example: Technology in Software Analysis and Development.',
              validation: (Rule) =>
                Rule.required()
                  .min(2)
                  .max(150)
                  .error(
                    'Add the program or academic title under 150 characters.',
                  ),
            }),

            defineField({
              name: 'institutionName',
              title: 'Institution Name',
              type: 'string',
              description:
                'Required. Name of the university, institution, academy or learning platform. Example: SENA.',
              validation: (Rule) =>
                Rule.required()
                  .min(2)
                  .max(100)
                  .error('Add the institution name under 100 characters.'),
            }),

            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              description:
                'Required. Date when the program started. Use the first day of the month when only the month and year are relevant.',
              validation: (Rule) =>
                Rule.required().error('Add the education start date.'),
            }),

            defineField({
              name: 'isCurrentlyStudying',
              title: 'Currently Studying',
              type: 'boolean',
              description:
                'Required. Enable this while the program is still in progress. The end date will not be required.',
              initialValue: false,
              validation: (Rule) =>
                Rule.required().error(
                  'Specify whether this education is still in progress.',
                ),
            }),

            defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              description:
                'Required only for completed education. Use the first day of the month when only the month and year are relevant.',
              hidden: ({ parent }) => Boolean(parent?.isCurrentlyStudying),
              validation: (Rule) =>
                Rule.custom((endDate, context) => {
                  const parent = context.parent as {
                    startDate?: string;
                    isCurrentlyStudying?: boolean;
                  };

                  if (parent?.isCurrentlyStudying) {
                    return true;
                  }

                  if (!endDate) {
                    return 'Add an end date or mark this education as currently in progress.';
                  }

                  if (
                    parent?.startDate &&
                    new Date(endDate) < new Date(parent.startDate)
                  ) {
                    return 'The end date cannot be earlier than the start date.';
                  }

                  return true;
                }),
            }),
          ],

          preview: {
            select: {
              academicTitle: 'academicTitle',
              institutionName: 'institutionName',
              isCurrentlyStudying: 'isCurrentlyStudying',
            },
            prepare({ academicTitle, institutionName, isCurrentlyStudying }) {
              const institution = institutionName ?? 'No institution';

              return {
                title: academicTitle ?? 'Untitled education',
                subtitle: isCurrentlyStudying
                  ? `${institution} · In progress`
                  : institution,
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
