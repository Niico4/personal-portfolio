import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/theme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#080A0F',

        brand: {
          50: '#EDF4FE',
          100: '#D6E7FD',
          200: '#AFD2FB',
          300: '#7BBBF9',
          400: '#34A6F4',
          500: '#2987C8',
          600: '#1F6DA2',
          700: '#15517B',
          800: '#0B3756',
          900: '#041F33',
          950: '#021220',
        },
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
              50: '#EDF4FE',
              100: '#D6E7FD',
              200: '#AFD2FB',
              300: '#7BBBF9',
              400: '#34A6F4',
              500: '#2987C8',
              600: '#1F6DA2',
              700: '#15517B',
              800: '#0B3756',
              900: '#041F33',
              DEFAULT: '#34A6F4',
              foreground: '#222227',
            },
          },
        },
      },
    }),
  ],
};

export default config;
