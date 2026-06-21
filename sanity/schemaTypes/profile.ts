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
      name: 'resume',
      title: 'Resume',
    },
    {
      name: 'contact',
      title: 'Contact',
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'stats',
      title: 'Stats',
    },
    {
      name: 'skills',
      title: 'Skills',
    },
  ],

  fields: [
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
      group: 'resume',
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
      name: 'content',
      title: 'Profile Content',
      type: 'object',
      group: 'content',
      description:
        'Main texts used in the home and about sections of the portfolio.',
      fields: [
        defineField({
          name: 'homeIntroduction',
          title: 'Home Introduction',
          type: 'portableText',
          description:
            'Short introduction used in the home page. It should be direct, human and focused on what you build.',
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: 'aboutDescription',
          title: 'About Description',
          type: 'portableText',
          description:
            'Longer description used in the about section. It can explain your focus, stack, product mindset and way of working.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'stats',
      title: 'Profile Stats',
      type: 'array',
      group: 'stats',
      description:
        'Small metrics shown in the profile/about section. Example: +10 Projects completed.',
      of: [
        defineArrayMember({
          name: 'profileStat',
          title: 'Profile Stat',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Text shown below or next to the stat.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
              description: 'Numeric value of the stat.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'prefix',
              title: 'Prefix',
              type: 'string',
              description: 'Optional text before the value. Example: +',
              initialValue: '+',
            }),

            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'Optional text after the value. Example: years.',
            }),
          ],

          preview: {
            select: {
              label: 'label',
              value: 'value',
              prefix: 'prefix',
              suffix: 'suffix',
            },
            prepare({ label, value, prefix, suffix }) {
              return {
                title: `${prefix ?? ''}${value ?? ''}${suffix ?? ''}`,
                subtitle: label,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'skillsAndTechnologies',
      title: 'Skills and Technologies',
      type: 'array',
      group: 'skills',
      description:
        'Skills and technologies shown as chips/badges in the profile/about section.',
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
                Rule.required().regex(/^[a-z0-9]+$/, {
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
