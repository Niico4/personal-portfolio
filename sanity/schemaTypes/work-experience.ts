import { defineArrayMember, defineField, defineType } from 'sanity';

export const workExperienceType = defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',

  fields: [
    defineField({
      name: 'organizationName',
      title: 'Organization Name',
      type: 'string',
      description:
        'Company, product or project name shown as the main experience group.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'organizationLogo',
      title: 'Organization Logo',
      type: 'image',
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
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description:
        'Controls the order of this work experience group. Lower numbers appear first.',
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'positions',
      title: 'Positions',
      type: 'array',
      description: 'Positions or roles held inside this organization.',
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
                'Role or position title shown in the experience item',
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
              description: 'Work relationship shown before the dates',
              options: {
                list: [
                  { title: 'Tiempo completo', value: 'full-time' },
                  { title: 'Medio tiempo', value: 'part-time' },
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
            },
            prepare({
              title,
              employmentType,
              startDate,
              endDate,
              isCurrentPosition,
            }) {
              return {
                title,
                subtitle: `${employmentType ?? 'No employment type'} · ${
                  startDate ?? 'No start date'
                } - ${isCurrentPosition ? 'Actualidad' : (endDate ?? 'No end date')}`,
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
      title: 'organizationName',
      media: 'organizationLogo',
      firstPositionTitle: 'positions.0.positionTitle',
    },
    prepare({ title, media, firstPositionTitle }) {
      return {
        title,
        subtitle: firstPositionTitle
          ? `Primera posición: ${firstPositionTitle}`
          : 'Sin posiciones',
        media,
      };
    },
  },
});
