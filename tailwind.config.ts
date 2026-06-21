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

        ink: {
          50: '#EEEEEF',
          100: '#C9C9CC',
          200: '#AFAFB4',
          300: '#8B8B92',
          400: '#75757D',
          500: '#52525C',
          600: '#4B4B54',
          700: '#3A3A41',
          800: '#2D2D33',
          900: '#222227',
        },
        brand: {
          50: '#EBF6FE',
          100: '#C0E3FC',
          200: '#A2D6FA',
          300: '#77C3F8',
          400: '#5DB8F6',
          500: '#34A6F4',
          600: '#2F97DE',
          700: '#2576AD',
          800: '#1D5B86',
          900: '#164666',
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
              50: '#EBF6FE',
              100: '#C0E3FC',
              200: '#A2D6FA',
              300: '#77C3F8',
              400: '#5DB8F6',
              500: '#34A6F4',
              600: '#2F97DE',
              700: '#2576AD',
              800: '#1D5B86',
              900: '#164666',
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
