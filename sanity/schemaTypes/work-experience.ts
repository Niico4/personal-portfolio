import { IconBriefcase } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const workExperienceType = defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  icon: IconBriefcase,

  groups: [
    {
      name: 'organization',
      title: 'Organization',
      default: true,
    },
    {
      name: 'positions',
      title: 'Positions',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],

  fields: [
    defineField({
      name: 'organizationName',
      title: 'Organization Name',
      type: 'string',
      group: 'organization',
      description:
        'Company, product or project name shown as the main experience group.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'organizationLogo',
      title: 'Organization Logo',
      type: 'image',
      group: 'organization',
      description:
        'Logo or icon shown next to the organization name in the experience section.',
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
      name: 'positions',
      title: 'Positions',
      type: 'array',
      group: 'positions',
      description:
        'Positions held inside this organization. Use multiple positions when the same organization has more than one role.',
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
                'Role or position title shown in the experience item.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'positionIconKey',
              title: 'Position Icon Key',
              type: 'string',
              description:
                'Optional icon key used by the frontend for this position. If empty or not supported, the default code icon will be used.',
            }),

            defineField({
              name: 'employmentType',
              title: 'Employment Type',
              type: 'string',
              description:
                'Work relationship shown before the dates. Example: Full-time or Part-time.',
              options: {
                list: [
                  { title: 'Full-time', value: 'full-time' },
                  { title: 'Part-time', value: 'part-time' },
                ],
                layout: 'dropdown',
              },
              initialValue: 'full-time',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              description:
                'Date when this position started. Use the first day of the month if only month/year matters.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              description:
                'Date when this position ended. Leave empty only if this position is currently active.',
              validation: (Rule) =>
                Rule.custom((endDate, context) => {
                  const parent = context.parent as {
                    startDate?: string;
                    isCurrentPosition?: boolean;
                  };

                  if (parent?.isCurrentPosition) return true;

                  if (!endDate) {
                    return 'End date is required when the position is not current.';
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
              name: 'isCurrentPosition',
              title: 'Is Current Position?',
              type: 'boolean',
              description:
                'Enable this if this position is currently active. The end date can be empty in that case.',
              initialValue: false,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'highlights',
              title: 'Position Highlights',
              type: 'array',
              description:
                'Main bullets shown under this position. Use this for responsibilities, achievements or important work done.',
              of: [
                defineArrayMember({
                  type: 'text',
                  rows: 2,
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),

            defineField({
              name: 'toolsAndTechnologies',
              title: 'Tools and Technologies',
              type: 'array',
              description:
                'Technologies, tools or skills shown as chips/badges for this position.',
              of: [
                defineArrayMember({
                  type: 'string',
                }),
              ],
              options: {
                layout: 'tags',
              },
              validation: (Rule) => Rule.required().min(1),
            }),
          ],

          preview: {
            select: {
              title: 'positionTitle',
              employmentType: 'employmentType',
              startDate: 'startDate',
              endDate: 'endDate',
              isCurrentPosition: 'isCurrentPosition',
              iconKey: 'positionIconKey',
            },
            prepare({
              title,
              employmentType,
              startDate,
              endDate,
              isCurrentPosition,
              iconKey,
            }) {
              return {
                title,
                subtitle: `${employmentType ?? 'No employment type'} · ${
                  startDate ?? 'No start date'
                } - ${
                  isCurrentPosition ? 'Present' : (endDate ?? 'No end date')
                }${iconKey ? ` · Icon: ${iconKey}` : ''}`,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description:
        'Controls the order of this work experience group in the portfolio. Lower numbers appear first.',
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'organizationName',
      media: 'organizationLogo',
      firstPositionTitle: 'positions.0.positionTitle',
    },
    prepare({ title, media, firstPositionTitle }) {
      return {
        title,
        subtitle: firstPositionTitle
          ? `First position: ${firstPositionTitle}`
          : 'No positions',
        media,
      };
    },
  },
});
