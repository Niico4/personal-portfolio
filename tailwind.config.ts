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
        'custom-primary': '#7cc1fd',
        'custom-secondary': '#CD93FF',
        background: 'var(--background-gradient)',
      },
      backgroundColor: {
        card: 'rgba(255, 255, 255, 0.04)',
      },
      textColor: {
        title: '#F5F5F6',
        default: '#E6E6E7',
        soft: 'rgba(230, 230, 231, 0.75)',
        dimmed: 'rgba(230, 230, 231, 0.80)',
        muted: 'rgba(230, 230, 231, 0.85)',
        faint: 'rgba(230, 230, 231, 0.95)',
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
              50: '#dbecfe',
              100: '#bfdffe',
              200: '#7cc1fd',
              300: '#5faffb',
              400: '#3a8ef7',
              500: '#2470ec',
              600: '#1c5ad9',
              700: '#1e49af',
              800: '#1e418a',
              900: '#172954',

              DEFAULT: '#7cc1fd',
              foreground: '#ffffff',
            },
            secondary: {
              50: '#fbf4f8',
              100: '#f9eaf2',
              200: '#f4d6e5',
              300: '#ecb5d0',
              400: '#df87b0',
              500: '#cd5187',
              600: '#be4473',
              700: '#a4325a',
              800: '#882c4c',
              900: '#722942',

              DEFAULT: '#cd5187',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
};

export default config;
