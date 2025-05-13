import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/theme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/components/(button|card|chip|tooltip|navbar|breadcrumbs).js',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-gradient)',
      },
      backgroundColor: {
        card: 'rgba(255, 255, 255, 0.03)',
      },
      textColor: {
        title: '#F5F5F6 ',
        subtitle: '#e0e0e0',
        default: '#c7c7c7',
        soft: '#adadad',
      },
      screens: {
        xl1440: { raw: '(min-width: 1280px) and (max-width: 1700px)' },
        '1.5xl': { raw: '(min-width: 1500px)' },
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        'custom-theme': {
          extend: 'dark',
          colors: {
            primary: {
              '50': '#e0f5fa',
              '100': '#b8e6f0',
              '200': '#88d2e3',
              '300': '#57bbd2',
              '400': '#289dbd',
              '500': '#187896',
              '600': '#13607a',
              '700': '#104e65',
              '800': '#0b3c50',
              '900': '#072939',
              DEFAULT: '#187896',
              foreground: '#ffffff',
            },
            secondary: {
              '50': '#d9eee4',
              '100': '#b3dccb',
              '200': '#85c3ab',
              '300': '#5ca58b',
              '400': '#428a71',
              '500': '#336e5b',
              '600': '#2c594c',
              '700': '#27493f',
              '800': '#243d36',
              '900': '#10231e',
              DEFAULT: '#336e5b',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
};

export default config;
