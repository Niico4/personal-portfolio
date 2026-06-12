import { DynaPuff, Poetsen_One, Raleway } from 'next/font/google';

export const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const dynaPuff = DynaPuff({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

export const poetsenOne = Poetsen_One({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});
