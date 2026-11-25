import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { NavItem } from './navbar.config';

interface NavbarItemProps {
  item: NavItem;
  isActive: boolean;
}

export const NavbarItem = ({ item, isActive }: NavbarItemProps) => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      aria-label={item.label}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'icon',
        }),
        'relative z-10 size-11 rounded-full hover:bg-transparent',
        'motion-safe:transition-[color,scale]',
        'motion-safe:duration-200 motion-safe:active:scale-94',
        isActive ? 'text-fg-emphasis' : 'text-fg-muted hover:text-fg-emphasis',
      )}
    >
      <Icon aria-hidden="true" stroke={1.4} className="size-5!" />
    </Link>
  );
};
