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
      name: 'description',
      title: 'Experience Summary',
      type: 'text',
      rows: 3,
      group: 'details',
      description:
        'Briefly explain what you worked on and the context needed to understand your role.',
      validation: (Rule) =>
        Rule.required().error('Add a short summary of this experience.'),
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
      role: 'role',
      isCurrentPosition: 'isCurrentPosition',
      endDate: 'endDate',
    },

    prepare({ organizationName, role }) {
      return {
        title: organizationName ?? 'Unnamed experience',
        subtitle: `${role ?? 'No role'}`,
      };
    },
  },
});
