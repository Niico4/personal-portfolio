import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7cc1fd',
        background: 'var(--background-gradient)',
        IColorPrimary: 'var(--primary-color-text)',
        IColorSecondary: 'var(--secondary-color-text)',
      },
    },
  },
  plugins: [nextui()],
};

export default config;
