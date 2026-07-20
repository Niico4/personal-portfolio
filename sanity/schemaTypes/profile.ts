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
      title: 'Identity',
      default: true,
    },
    {
      name: 'contact',
      title: 'Contact',
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
      name: 'aboutMeDescription',
      title: 'About Me Description',
      type: 'portableText',
      group: 'identity',
      description:
        'Longer description used in the hero section. It should be human, focused on your experience and skills, and highlight your personality.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'rightNowIAm',
      title: 'Right Now I Am',
      type: 'portableText',
      group: 'identity',
      description:
        'Short description of what I am encountering or focusing on right now.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isAvailable',
      title: 'Is Available?',
      type: 'boolean',
      group: 'identity',
      description:
        'Deactivate when you are not available for opportunities or jobs',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'professionalTitle',
      title: 'Professional Title',
      type: 'string',
      group: 'identity',
      description: 'Main professional title shown in the portfolio.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'identity',
      description: 'Location shown in the portfolio.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'resume',
      title: 'Resume / CV',
      type: 'object',
      group: 'identity',
      description:
        'Resume reference used by the portfolio download/view button.',
      fields: [
        defineField({
          name: 'file',
          title: 'Resume File',
          type: 'file',
          description:
            'Upload your resume directly to Sanity. Recommended for a PDF controlled from the CMS.',
          options: {
            accept: 'application/pdf',
          },
        }),

        defineField({
          name: 'externalUrl',
          title: 'External Resume URL',
          type: 'url',
          description:
            'External resume URL. Example: Google Drive, Notion, portfolio asset URL, etc.',
        }),
      ],
      validation: (Rule) =>
        Rule.custom((resume) => {
          const value = resume as {
            file?: unknown;
            externalUrl?: string;
          };

          if (!value?.file && !value?.externalUrl) {
            return 'Add either a resume file or an external resume URL.';
          }

          return true;
        }),
    }),

    defineField({
      name: 'contact',
      title: 'Contact and Social Links',
      type: 'object',
      group: 'contact',
      description:
        'Main contact information and social links shown in the portfolio.',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          description:
            'Email shown in the portfolio. The frontend can convert it into a mailto link.',
          validation: (Rule) =>
            Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
              name: 'email',
              invert: false,
            }),
        }),

        defineField({
          name: 'githubUrl',
          title: 'GitHub URL',
          type: 'url',
          description: 'Your GitHub profile URL.',
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: 'linkedinUrl',
          title: 'LinkedIn URL',
          type: 'url',
          description: 'Your LinkedIn profile URL.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'techSkills',
      title: 'Technical Skills',
      type: 'array',
      group: 'techSkills',
      description:
        'Technical skills and technologies shown as chips/badges in the profile/about section.',
      of: [
        defineArrayMember({
          name: 'skill',
          title: 'Skill',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Skill Name',
              type: 'string',
              description: 'Visible name shown in the UI. Example: React.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'iconKey',
              title: 'Icon Key',
              type: 'string',
              description:
                'Internal key used by the frontend to render the correct icon. Use lowercase without spaces, dots or special characters. Example: Next.js → nextjs.',
              validation: (Rule) =>
                Rule.regex(/^[a-z0-9]+$/, {
                  name: 'lowercase key without spaces, dots or special characters',
                  invert: false,
                }),
            }),
          ],

          preview: {
            select: {
              title: 'name',
              iconKey: 'iconKey',
            },
            prepare({ title, iconKey }) {
              return {
                title,
                subtitle: iconKey ? `Icon key: ${iconKey}` : 'No icon key',
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      group: 'education',
      description: 'Education information',
      of: [
        defineArrayMember({
          name: 'institution',
          title: 'Institution',
          type: 'object',
          fields: [
            defineField({
              name: 'institutionName',
              title: 'Institution Name',
              type: 'string',
              description: 'Name of the institution, academy or platform.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'academicTitle',
              title: 'Academic Title',
              type: 'string',
              description: 'Academic title or program name.',
              validation: (Rule) => Rule.required(),
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
              academicTitle: 'academicTitle',
              institutionName: 'institutionName',
            },
            prepare({ academicTitle, institutionName }) {
              return {
                title: academicTitle,
                subtitle: institutionName,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      title: 'professionalTitle',
      location: 'location',
    },
    prepare({ title, location }) {
      return {
        title: 'Profile',
        subtitle: `${title ?? 'No title'} · ${location ?? 'No location'}`,
      };
    },
  },
});
