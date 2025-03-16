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
        subtitle: '#e0e0e0',
        default: '#c7c7c7',
        soft: '#adadad',
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
              50: '#e6f0f8',
              100: '#cce1f0',
              200: '#99c3e1',
              300: '#66a5d3',
              400: '#4e8dc0',
              500: '#467A9F',
              600: '#3b6484',
              700: '#314e69',
              800: '#26394e',
              900: '#1b2534',
              DEFAULT: '#467A9F',
              foreground: '#ffffff',
            },
            secondary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#7D6E94',
              600: '#6b21a8',
              700: '#581c87',
              800: '#3b0764',
              900: '#22053e',
              DEFAULT: '#7D6E94',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
};

export default config;
