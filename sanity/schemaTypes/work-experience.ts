import { IconBriefcase } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

const formatPreviewDate = (date?: string) => {
  if (!date) return null;

  const parsedDate = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate);
};

export const workExperienceType = defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  icon: IconBriefcase,

  groups: [
    {
      name: 'organization',
      title: 'Organization / Project',
      default: true,
    },
    {
      name: 'positions',
      title: 'Roles & Positions',
    },
    {
      name: 'settings',
      title: 'Display Settings',
    },
  ],

  fields: [
    defineField({
      name: 'organizationName',
      title: 'Organization or Project Name',
      type: 'string',
      group: 'organization',
      description:
        'Required. Name of the company, client, product or independent project shown as the main experience group.',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100)
          .error(
            'Add an organization or project name between 2 and 100 characters.',
          ),
    }),

    defineField({
      name: 'organizationLogo',
      title: 'Organization Logo',
      type: 'image',
      group: 'organization',
      description:
        'Optional. Logo or visual identifier shown next to the organization name. Leave empty when no suitable logo is available.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description:
            'Optional. Add only when the image communicates information not already provided by the organization name. Otherwise, leave it empty.',
          validation: (Rule) =>
            Rule.max(120).warning(
              'Keep the alternative text under 120 characters.',
            ),
        }),
      ],
    }),

    defineField({
      name: 'positions',
      title: 'Roles and Positions',
      type: 'array',
      group: 'positions',
      description:
        'Required. Add every role held within this organization. Drag the items to control the order in which they appear.',
      of: [
        defineArrayMember({
          name: 'position',
          title: 'Position',
          type: 'object',

          fields: [
            defineField({
              name: 'positionTitle',
              title: 'Position Title',
              type: 'string',
              description:
                'Required. Role or position name shown in the experience section. Example: Software Developer.',
              validation: (Rule) =>
                Rule.required()
                  .min(2)
                  .max(120)
                  .error('Add a position title between 2 and 120 characters.'),
            }),

            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              description:
                'Required. Date when this position started. Use the first day of the month when only the month and year are relevant.',
              validation: (Rule) =>
                Rule.required().error('Add the position start date.'),
            }),

            defineField({
              name: 'isCurrentPosition',
              title: 'Currently Active',
              type: 'boolean',
              description:
                'Required. Enable this when you are still working in this position. The end date will not be required.',
              initialValue: false,
              validation: (Rule) =>
                Rule.required().error(
                  'Specify whether this position is currently active.',
                ),
            }),

            defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              description:
                'Required only for completed positions. Use the first day of the month when only the month and year are relevant.',
              hidden: ({ parent }) => Boolean(parent?.isCurrentPosition),
              validation: (Rule) =>
                Rule.custom((endDate, context) => {
                  const parent = context.parent as {
                    startDate?: string;
                    isCurrentPosition?: boolean;
                  };

                  if (parent?.isCurrentPosition) {
                    return true;
                  }

                  if (!endDate) {
                    return 'Add an end date or mark this position as currently active.';
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

            defineField({
              name: 'highlights',
              title: 'Experience Details',
              type: 'portableText',
              description:
                'Required. Explain your main responsibilities, contributions, achievements and relevant work in this position. Focus on concrete actions and results.',
              validation: (Rule) =>
                Rule.required().error('Add the main details of this position.'),
            }),

            defineField({
              name: 'toolsAndTechnologies',
              title: 'Tools and Technologies',
              type: 'array',
              description:
                'Optional. Technologies, platforms and tools shown as chips for this position. Leave empty when they are not relevant.',
              of: [
                defineArrayMember({
                  type: 'string',
                }),
              ],
              options: {
                layout: 'tags',
              },
              validation: (Rule) =>
                Rule.unique().error(
                  'Each tool or technology should appear only once.',
                ),
            }),
          ],

          preview: {
            select: {
              positionTitle: 'positionTitle',
              employmentType: 'employmentType',
              startDate: 'startDate',
              endDate: 'endDate',
              isCurrentPosition: 'isCurrentPosition',
            },

            prepare({ positionTitle, startDate, endDate, isCurrentPosition }) {
              const formattedStartDate =
                formatPreviewDate(startDate) ?? 'No start date';

              const formattedEndDate = isCurrentPosition
                ? 'Present'
                : (formatPreviewDate(endDate) ?? 'No end date');

              return {
                title: positionTitle ?? 'Untitled position',
                subtitle: `${formattedStartDate} – ${formattedEndDate}`,
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('Add at least one position for this organization.'),
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description:
        'Required. Controls the order of this organization in the portfolio. Lower numbers appear first.',
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
      organizationName: 'organizationName',
      organizationLogo: 'organizationLogo',
      positions: 'positions',
    },

    prepare({ organizationName, organizationLogo, positions }) {
      const positionList = Array.isArray(positions) ? positions : [];

      const positionCount = positionList.length;

      return {
        title: organizationName ?? 'Unnamed organization',
        subtitle:
          positionCount === 1 ? '1 position' : `${positionCount} positions`,
        media: organizationLogo,
      };
    },
  },
});
