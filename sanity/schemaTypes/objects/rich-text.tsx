import {
  IconAlignLeft,
  IconBold,
  IconCode,
  IconH2,
  IconH3,
  IconH4,
  IconHighlight,
  IconItalic,
  IconLink,
  IconList,
  IconListNumbers,
  IconQuote,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
  IconUnderline,
} from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const richText = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',

      styles: [
        {
          title: 'Paragraph',
          value: 'normal',
          icon: () => <IconAlignLeft size={16} stroke={1.75} />,
        },
        {
          title: 'Heading 2',
          value: 'h2',
          icon: () => <IconH2 size={16} stroke={1.75} />,
        },
        {
          title: 'Heading 3',
          value: 'h3',
          icon: () => <IconH3 size={16} stroke={1.75} />,
        },
        {
          title: 'Heading 4',
          value: 'h4',
          icon: () => <IconH4 size={16} stroke={1.75} />,
        },
        {
          title: 'Block quote',
          value: 'blockquote',
          icon: () => <IconQuote size={16} stroke={1.75} />,
        },
      ],

      lists: [
        {
          title: 'Bulleted list',
          value: 'bullet',
          icon: () => <IconList size={16} stroke={1.75} />,
        },
        {
          title: 'Numbered list',
          value: 'number',
          icon: () => <IconListNumbers size={16} stroke={1.75} />,
        },
      ],

      marks: {
        decorators: [
          {
            title: 'Bold',
            value: 'strong',
            icon: () => <IconBold size={16} stroke={1.75} />,
          },
          {
            title: 'Italic',
            value: 'em',
            icon: () => <IconItalic size={16} stroke={1.75} />,
          },
          {
            title: 'Underline',
            value: 'underline',
            icon: () => <IconUnderline size={16} stroke={1.75} />,
          },
          {
            title: 'Strikethrough',
            value: 'strike-through',
            icon: () => <IconStrikethrough size={16} stroke={1.75} />,
          },
          {
            title: 'Inline code',
            value: 'code',
            icon: () => <IconCode size={16} stroke={1.75} />,
          },
          {
            title: 'Highlight',
            value: 'highlight',
            icon: () => <IconHighlight size={16} stroke={1.75} />,
            component: ({ children }) => (
              <mark
                style={{
                  backgroundColor: '#fde68a',
                  color: '#171717',
                }}
              >
                {children}
              </mark>
            ),
          },
          {
            title: 'Superscript',
            value: 'sup',
            icon: () => <IconSuperscript size={16} stroke={1.75} />,
            component: ({ children }) => <sup>{children}</sup>,
          },
          {
            title: 'Subscript',
            value: 'sub',
            icon: () => <IconSubscript size={16} stroke={1.75} />,
            component: ({ children }) => <sub>{children}</sub>,
          },
        ],

        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'string',
                description:
                  'https://example.com, /projects, #contact, mailto: or tel:',
                validation: (rule) =>
                  rule.required().custom((value) => {
                    if (typeof value !== 'string') {
                      return 'URL is required';
                    }

                    return /^(https?:\/\/|\/(?!\/)|#|mailto:|tel:)/i.test(
                      value.trim(),
                    )
                      ? true
                      : 'Enter a valid URL or internal path';
                  }),
              },
              {
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
  ],
});
