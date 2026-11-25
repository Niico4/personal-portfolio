import { IconBriefcase } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const workExperienceType = defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  icon: IconBriefcase,

  groups: [
    {
      name: 'overview',
      title: 'Overview',
      default: true,
    },
    {
      name: 'details',
      title: 'Experience Details',
    },
  ],

  orderings: [
    {
      title: 'End Date',
      name: 'endDateDesc',
      by: [
        {
          field: 'endDate',
          direction: 'desc',
        },
      ],
    },
  ],

  fields: [
    defineField({
      name: 'organizationName',
      title: 'Organization / Project',
      type: 'string',
      group: 'overview',
      description:
        'The company, client or project associated with this experience.',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100)
          .error('Enter a name between 2 and 100 characters.'),
    }),

    defineField({
      name: 'organizationLogo',
      title: 'Organization Logo',
      type: 'image',
      group: 'overview',
      description: 'Upload a square logo or brand symbol of the organization.',
      validation: (Rule) =>
        Rule.required().error('Upload the organization logo.'),
    }),

    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'overview',
      description:
        'The role you had in this experience. Example: Software Developer.',
      validation: (Rule) =>
        Rule.required().error('Enter the role for this experience.'),
    }),

    defineField({
      name: 'isFreelance',
      title: 'Freelance',
      type: 'boolean',
      group: 'overview',
      description:
        'Turn this on if this experience was completed as a freelance engagement.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'overview',
      description:
        'When this experience started. Use the first day of the month if only the month and year matter.',
      validation: (Rule) => Rule.required().error('Enter the start date.'),
    }),

    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      group: 'overview',
      description:
        'When this experience ended. Use the first day of the month if only the month and year matter.',

      hidden: ({ parent }) => parent?.isCurrentPosition === true,

      validation: (Rule) =>
        Rule.custom((endDate, { parent }) => {
          const { startDate, isCurrentPosition } = (parent ?? {}) as {
            startDate?: string;
            isCurrentPosition?: boolean;
          };

          if (isCurrentPosition) {
            return true;
          }

          if (!endDate) {
            return 'Enter an end date or mark this as a current position.';
          }

          if (startDate && endDate < startDate) {
            return 'The end date cannot be earlier than the start date.';
          }

          return true;
        }),
    }),

    defineField({
      name: 'isCurrentPosition',
      title: 'Current Position',
      type: 'boolean',
      group: 'overview',
      description: 'Turn this on if you are still working in this role.',
      initialValue: false,
      validation: (Rule) =>
        Rule.required().error('Choose whether this is a current position.'),
    }),

    defineField({
      name: 'features',
      title: 'Key Highlights',
      type: 'array',
      group: 'details',
      description:
        'Add the most relevant things you worked on, built or improved.',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).max(6).error('Add between 1 and 6 highlights.'),
    }),
  ],

  preview: {
    select: {
      organizationName: 'organizationName',
      organizationLogo: 'organizationLogo',
      role: 'role',
      isFreelance: 'isFreelance',
    },

    prepare({ organizationName, organizationLogo, role, isFreelance }) {
      return {
        title: organizationName ?? 'Unnamed experience',
        subtitle: isFreelance
          ? `${role ?? 'No role'} · Freelance`
          : (role ?? 'No role'),
        media: organizationLogo,
      };
    },
  },
});
