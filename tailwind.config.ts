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

        green: {
          50: '#EAFAEE',
          100: '#BFEEC9',
          200: '#A0E6AF',
          300: '#75DB8A',
          400: '#5AD473',
          500: '#31C950',
          600: '#2DB749',
          700: '#238F39',
          800: '#1B6F2C',
          900: '#155422',
        },
        purple: {
          50: '#F7EDFF',
          100: '#E6C6FF',
          200: '#D9AAFF',
          300: '#C883FF',
          400: '#BD6BFF',
          500: '#AD46FF',
          600: '#9D40E8',
          700: '#7B32B5',
          800: '#5F278C',
          900: '#491D6B',
        },
        yellow: {
          50: '#FEF7EB',
          100: '#FAE7C2',
          200: '#F8DBA5',
          300: '#F5CB7C',
          400: '#F3C162',
          500: '#F0B13B',
          600: '#DAA136',
          700: '#AA7E2A',
          800: '#846120',
          900: '#654A19',
        },
      },
      animation: {
        'background-shine': 'background-shine 2s linear infinite',
      },
      keyframes: {
        'background-shine': {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
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
