import { buildTheme } from '@sanity/themer';

import { monaSans } from '@/fonts';

const theme = buildTheme({
  dark: {
    accent: '#329FE5',
    text: '#929BAA',
    background: '#090b11',
    contrast: 85,
  },
});

const fontFamily = monaSans.style.fontFamily;
const { v2 } = theme;

export const studioTheme = v2
  ? {
      ...theme,
      v2: {
        ...v2,
        font: {
          ...v2.font,
          text: { ...v2.font.text, family: fontFamily },
          heading: { ...v2.font.heading, family: fontFamily },
          label: { ...v2.font.label, family: fontFamily },
        },
        color: {
          ...v2.color,
          dark: {
            ...v2.color.dark,
            default: {
              ...v2.color.dark.default,
              bg: '#0C0D14',
              border: '#282C35',
            },
          },
        },
      },
    }
  : theme;
