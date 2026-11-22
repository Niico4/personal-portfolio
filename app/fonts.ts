import { Mona_Sans, Syne } from 'next/font/google';

export const monaSans = Mona_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-mona-sans',
});

export const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
  variable: '--font-syne',
});
