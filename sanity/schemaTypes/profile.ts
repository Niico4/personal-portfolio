import { IconUserCircle } from '@tabler/icons-react';
import { defineField, defineType } from 'sanity';

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
      type: 'richText',
      group: 'identity',
      description:
        'Main introduction shown in the portfolio. Keep it focused on your experience, what you do and how you work.',
      validation: (Rule) =>
        Rule.required().min(1).error('Add your profile introduction.'),
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
            file?: {
              asset?: {
                _ref?: string;
              };
            };
            externalUrl?: string;
          };

          if (!value.file?.asset?._ref && !value.externalUrl) {
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
  ],

  preview: {
    select: {
      professionalTitle: 'professionalTitle',
    },
    prepare({ professionalTitle }) {
      return {
        title: 'Profile',
        subtitle: professionalTitle || 'Profile information',
      };
    },
  },
});
