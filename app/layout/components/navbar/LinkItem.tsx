import { FC } from 'react';
import { Mogra } from 'next/font/google';
import Link from 'next/link';

const mogra = Mogra({
  subsets: ['latin'],
  weight: '400',
});

interface Props {
  label: string;
  href: string;
  currentPathname: string;
}

const LinkItem: FC<Props> = ({ label, href, currentPathname }) => {
  return (
    <Link
      className={`${mogra.className} text-xl transition-all ${
        currentPathname === href
          ? 'text-primary-300 font-semibold underline underline-offset-4'
          : 'text-subtitle/95 hover:text-subtitle/80'
      }`}
      href={href}
    >
      {label}
    </Link>
  );
};

export default LinkItem;
