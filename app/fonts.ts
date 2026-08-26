import { Mona_Sans, Poetsen_One } from 'next/font/google';

export const monaSans = Mona_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const poetsenOne = Poetsen_One({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});
