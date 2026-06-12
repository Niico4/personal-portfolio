import Link from 'next/link';

import { POETSEN_ONE } from '@/layout';

interface Props {
  label: string;
  href: string;
  currentPathname: string;
  onClick?: () => void;
}

const NavigationLink = ({ label, href, currentPathname, onClick }: Props) => {
  const isActiveItem = currentPathname === href;
  return (
    <Link
      onClick={onClick}
      className={`${POETSEN_ONE.className} text-xl transition-all ${
        isActiveItem
          ? 'text-primary-300 underline underline-offset-4'
          : 'text-subtitle/95 hover:text-subtitle/80 hover:scale-105'
      }`}
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavigationLink;
