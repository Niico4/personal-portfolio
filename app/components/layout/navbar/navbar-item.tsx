import Link, { useLinkStatus } from 'next/link';

import { cn } from '@/lib/utils';

import type { NavItem } from './navbar.config';

interface NavbarItemProps {
  item: NavItem;
  ariaCurrent?: 'page' | 'location';
}

const NavbarItemLabel = ({ label }: { label: NavItem['label'] }) => {
  const { pending } = useLinkStatus();

  return <span aria-busy={pending}>{label}</span>;
};

export const NavbarItem = ({ item, ariaCurrent }: NavbarItemProps) => {
  return (
    <Link
      href={item.href}
      aria-current={ariaCurrent}
      className={cn(
        'relative inline-flex min-h-11 min-w-11 items-center justify-center text-[0.86rem]',
        'text-muted-foreground hover:text-foreground',
        'after:pointer-events-none after:absolute after:inset-x-[0.2rem] after:bottom-[0.42rem] after:h-px after:origin-left after:scale-x-0 after:bg-primary after:content-[""]',
        'hover:after:scale-x-100 active:text-primary active:after:scale-x-100',
        'focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring focus-visible:after:scale-x-100',
        'motion-safe:after:transition-transform motion-safe:after:duration-150 motion-safe:after:ease-out',
        'has-aria-busy:text-foreground has-aria-busy:after:scale-x-100',
        ariaCurrent && 'text-foreground after:scale-x-100',
      )}
    >
      <NavbarItemLabel label={item.label} />
    </Link>
  );
};
