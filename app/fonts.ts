import { DM_Sans, Poetsen_One } from 'next/font/google';

export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const poetsenOne = Poetsen_One({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});
